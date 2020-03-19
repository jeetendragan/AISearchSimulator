import { NodeType } from './UIElementNode';
import { PriorityQueue } from './PriorityQueue';
import { IQueue } from './Queue';
import { NodeStateInSearch } from './NodeStateInSearch';
import { SimulatorComponent } from 'src/app/simulator/simulator.component';
import { Solution } from './Solution';
import { NodeStateInSearchColorMapper } from './NodeStateInSearchColorMapper';

export class UniformCostSolver {
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

    static Solve(simulatorComponent: SimulatorComponent): Solution {
        UniformCostSolver.Prepare(simulatorComponent);

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

        let queue: PriorityQueue<any>;

        const compareNodes = function(nodeA, nodeB) {
            return nodeA.cost - nodeB.cost;
        };

        // use a priority queue for uniform cost search
        queue = new PriorityQueue({ comparator: compareNodes });

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

            // Get all the neighbouring nodes
            let neighbourData = currentNode.getAllNeighbouringNodesWithCost();
            let neighbours = neighbourData['neighbours'];
            let costs = neighbourData['costs'];
            //const edges = currentNode.asSource; // Get all the edges in which the node is a source
            //const edgeIds = Object.keys(edges);
            for (var i = 0; i < neighbours.length; i++) {
                //const edge = edges[edgeId];
                const nextNode = neighbours[i];
                const cost = costs[i];

                if (nextNode.stateInSearch === NodeStateInSearch.NOT_VISITED) {
                    // the nextNode is being seen for the 1st time
                    nextNode.cost = currentNode.cost + cost;

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
                } else if (nextNode.stateInSearch === NodeStateInSearch.CURRENT) {
                    // the nextNode has been seen before

                    const newCost = currentNode.cost + cost;

                    if (newCost < nextNode.cost) {
                        // a better way to reach newNode has been seen
                        nextNode.cost = newCost;

                        nextNode.parent = currentNode;

                        queue.heapify(); // refresh the queue order
                    }

                } // else if nextNode.stateInSearch === NodeStateInSearch.VISITED, it has been explored completely
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