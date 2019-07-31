import { NodeStateInSearch } from './NodeStateInSearch';
import { SimulatorComponent } from 'src/app/simulator/simulator.component';
import { Solution } from './Solution';
import { BreadthFirstSolver } from './BreadthFirstSolver';
import { NodeStateInSearchColorMapper } from './NodeStateInSearchColorMapper';
import { PriorityQueue } from './PriorityQueue';
import { IQueue, Queue } from './Queue';
import { NodeType } from './UIElementNode';

export class BestFitSolver {

    static Prepare(simulatorInstance: SimulatorComponent) {
        Object.keys(simulatorInstance.nodes).forEach(nodeid => {
            const node = simulatorInstance.nodes[nodeid];

            // holds only the path cost
            node.pathCost = Number.MAX_VALUE;

            // initialize the current cost to max(therotically, infinity)
            // this value can be the pathCost + heuristic(in case of A*) OR
            // this value can a heurestic only(in greedy-best-fit)
            node.cost = Number.MAX_VALUE;

            // initialize the parent to null
            node.parent = null;

            // Mark if a node is visited
            node.stateInSearch = NodeStateInSearch.NOT_VISITED;

            // visit order
            node.visitOrder = '';
        });
    }

    static Solve(simulatorComponent: SimulatorComponent, weighDistanceToSource: boolean): Solution {
        // if weighDistanceToSource is true, then the algorithm is A*, else it is greedy best-first

        // TODO: Generalize code for this prep step
        BestFitSolver.Prepare(simulatorComponent);

        let visitOrder = 1;

        debugger;
        simulatorComponent.startNode.pathCost = 0; // the cost of the start node to itself will be zero
        simulatorComponent.startNode.cost = simulatorComponent.distanceToNearestGoal(simulatorComponent.startNode);
        simulatorComponent.startNode.stateInSearch = NodeStateInSearch.CURRENT; // mark the startNode as current-i.e. it is being visited right now, and
        simulatorComponent.startNode.visitOrder = visitOrder;
        // that some or all of its children are yet to be expanded

        // For visual representation set the color as well
        simulatorComponent.startNode.set({
            stroke: NodeStateInSearchColorMapper.GetColorForCurrentNode(),
            dirty: true
        });

        let queue: IQueue<any>;

        const compareNodes = function(nodeA, nodeB) {
            return nodeA.cost - nodeB.cost;
        };

        // use a priority queue if a uniform cost search is being used
        queue = new PriorityQueue({ comparator: compareNodes });

        queue.enqueue(simulatorComponent.startNode);

        while (!queue.isEmpty()) {
            const currentNode = queue.dequeue();
            const nodeType: NodeType = currentNode.nodeType;
            if (nodeType === NodeType.Goal) {
                // create a solution object and tranverse through all the parents of the GOAL NODE
                const sol: Solution = new Solution(currentNode.pathCost);
                let tempNode = currentNode;
                while (tempNode != null) {
                    sol.addNodeToPath(tempNode);
                    // find the edge connecting tempNode and tempNode.parent
                    if (tempNode.parent != null) {
                        const edgeConnectingParent = tempNode.getEdgeConnectingNode(tempNode.parent);
                        sol.addEdgeToPath(edgeConnectingParent);
                    }

                    tempNode = tempNode.parent;
                }
                return sol;
            }

            const edges = currentNode.asSource; // Get all the edges in which the node is a source
            const edgeIds = Object.keys(edges);
            for (const edgeId of edgeIds) {
                const edge = edges[edgeId];
                const nextNode = edge.destination;
                if (nextNode.stateInSearch === NodeStateInSearch.NOT_VISITED) {

                    nextNode.pathCost = currentNode.pathCost + edge.getCost();

                    if (weighDistanceToSource) {
                        // for A*, the cost will be the path cost + the heurestic estimate from nextNode to the closest goal
                        nextNode.cost = nextNode.pathCost + simulatorComponent.distanceToNearestGoal(nextNode);
                    } else {
                        // for greedy-best fit, the cost will be the heurestic estimate from the nextNode to the closest goal only
                        nextNode.cost = simulatorComponent.distanceToNearestGoal(nextNode);
                    }

                    // set the parent of the nextNode
                    nextNode.parent = currentNode;

                    // set the state of the nextNode to seen or current
                    nextNode.stateInSearch = NodeStateInSearch.CURRENT;

                    nextNode.set({
                        stroke: NodeStateInSearchColorMapper.GetColorForCurrentNode(),
                        dirty: true
                    });

                    // enque the node for expansion
                    queue.enqueue(nextNode);
                }
            }

            // after all the nodes of the current node are expanded, we set the current state to visited
            currentNode.stateInSearch = NodeStateInSearch.VISITED;
            currentNode.set({
                stroke: NodeStateInSearchColorMapper.GetColorForVisitedNode(),
                dirty: true
            });
            currentNode.visitOrder = visitOrder++;
        }

        // if the queue is empty and a solution is not found till now, then there is no
        // solution to the problem
        return new Solution(Number.MAX_VALUE);
    }
}
