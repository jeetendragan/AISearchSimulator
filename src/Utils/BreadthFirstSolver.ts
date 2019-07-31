import { NodeStateInSearch } from './NodeStateInSearch';
import { SimulatorComponent } from 'src/app/simulator/simulator.component';
import { Queue, IQueue } from './Queue';
import { NodeType } from './UIElementNode';
import { NodeStateInSearchColorMapper } from './NodeStateInSearchColorMapper';
import { Solution } from './Solution';
import { PriorityQueue } from './PriorityQueue';
import { Options } from './PriorityQueue';

export class BreadthFirstSolver {

    static Prepare(simulatorInstance: SimulatorComponent) {

        Object.keys(simulatorInstance.nodes).forEach(nodeid => {
            const node = simulatorInstance.nodes[nodeid];

            // initialize the current cost to max(therotically, infinity)
            node.cost = Number.MAX_VALUE;

            // initialize the parent to null
            node.parent = null;

            // Mark if a node is visited
            node.stateInSearch = NodeStateInSearch.NOT_VISITED;

            node.visitOrder = '';
        });

    }

    static Solve(simulatorComponent: SimulatorComponent, uniformCostSearch: boolean): Solution {
        BreadthFirstSolver.Prepare(simulatorComponent);

        let visitOrder = 1;

        simulatorComponent.startNode.cost = 0; // the cost of the start node to itself will be zero
        simulatorComponent.startNode.stateInSearch = NodeStateInSearch.CURRENT; // mark the startNode as current-i.e. it is being visited right now, and
        // that some or all of its children are yet to be expanded
        simulatorComponent.startNode.visitOrder = visitOrder;

        // For visual representation set the color as well
        simulatorComponent.startNode.set({
            stroke: NodeStateInSearchColorMapper.GetColorForCurrentNode(),
            dirty: true
        });

        let queue: IQueue<any>;
        if (uniformCostSearch) {

            const compareNodes = function(nodeA, nodeB) {
                return nodeA.cost - nodeB.cost;
            };

            // use a priority queue if a uniform cost search is being used
            queue = new PriorityQueue({ comparator: compareNodes });
        } else {
            queue = new Queue<any>(); // use a normal queue if normal BFS is to be used
        }

        queue.enqueue(simulatorComponent.startNode);

        while (!queue.isEmpty()) {
            const currentNode = queue.dequeue();
            const nodeType: NodeType = currentNode.nodeType;
            if (nodeType === NodeType.Goal) {
                // create a solution object and tranverse through all the parents of the GOAL NODE
                const sol: Solution = new Solution(currentNode.cost);
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

                    if (uniformCostSearch) {
                        nextNode.cost = currentNode.cost + edge.getCost();
                    } else {
                        // as the nextNode is one step away from the currentNode, just add 1 to the currentNode's path cost from source
                        nextNode.cost = currentNode.cost + 1;
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
