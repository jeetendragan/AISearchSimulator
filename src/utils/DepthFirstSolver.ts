import { SimulatorComponent } from './../app/simulator/simulator.component';
import { NodeStateInSearchColorMapper } from './NodeStateInSearchColorMapper';
import { Solution } from './Solution';
import { XY } from './XY';

export class DepthFirstSolver {

    static Solve(simulatorInstance: SimulatorComponent, currentState: Solution, bestState: Solution, solveOptimally: boolean): any {
        debugger;

        const currentNode = currentState.currentNode;
        // mark the current node as visited
        currentNode.set(
            {
                stroke : NodeStateInSearchColorMapper.GetColorForVisitedNode(),
                dirty : true
            }
        );
        simulatorInstance.canvas.requestRenderAll();

        if (currentState.reachedGoalState()) {
            if (solveOptimally) {
                if (currentState.cost < bestState.cost) {
                    bestState.applyState(currentState);
                    return {
                        continueSearch: true,
                        solutionFound: true,
                        message: 'Solution found with a path cost of :' + currentState.cost
                    };
                } else {
                    return {
                        continueSearch: true,
                        solutionFound: true,
                        message: 'Better solution exists with a path cost of :' + bestState.cost
                    };
                }
            } else {
                bestState.applyState(currentState);
                return {
                    continueSearch: false,
                    solutionFound: true,
                    message: 'Solution found with a path cost of :' + currentState.cost
                };
            }
        }

        const connectedEdges = currentState.getNextEdges();
        const connectedEdgeIds = Object.keys(connectedEdges);

        for (const edgeId of connectedEdgeIds) {
            const nextEdge = connectedEdges[edgeId];
            const nextNode = nextEdge.destination;

            if (currentState.isNodeConsideredInPath(nextNode)) {
                continue; // do not consider a node that has already been considered to avoid infinite loops
            }

            const edgeStart: XY = new XY(nextEdge.x1, nextEdge.y1);
            const edgeEnd: XY = new XY(nextEdge.x2, nextEdge.y2);
            const edgeLength: number = XY.getDistanceBetween(edgeStart, edgeEnd);

            // forward track
            currentState.setCurrentNode(nextNode);
            currentState.addNodeToPath(nextNode);
            currentState.addEdgeToPath(nextEdge);
            currentState.addCost(edgeLength);

            const result = this.Solve(simulatorInstance, currentState, bestState, solveOptimally);

            // backtrack
            currentState.setCurrentNode(currentNode);
            currentState.removeNodeFromPath(nextNode);
            currentState.removeEdgeFromPath(nextEdge);
            currentState.deductCost(edgeLength);

            if (!result.continueSearch) {
                // if in any one of the child node expansion, continueSearch is set to false, further child exploration should be stopped.
                return result;
            }

        }

        // executed when all the children have been expanded.
        // if a solution has been found till now, then information related to that will be returned.
        // we need to always set continueSearch to true because the execution will come here only when we are running in 
        // optimal = true setting and in that case we need to continue search even we have found a solution
        return {
            continueSearch: true,
            solutionFound: bestState.isSolutionFound(),
            message: bestState.isSolutionFound() ? 'Best solution till now found with a cost of '+bestState.cost:'Best solution not found till now'
        };
    }
}
