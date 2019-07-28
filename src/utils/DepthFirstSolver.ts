import { SimulatorComponent } from 'src/app/simulator/simulator.component';
import { NodeType } from './UIElementNode';
import { UIElementNode } from './UIElementNode';
import { NodeStateInSearchColorMapper } from './NodeStateInSearchColorMapper';
import { Utility } from './Utility';
import { Solution } from './Solution';
import { XY } from './XY';

export class DepthFirstSolver {

    static Solve(simulatorInstance: SimulatorComponent, currentNode: any, nodesInSolution: any[], edgesInSolution: any[], executeAtTime: number): any {

        let result = {
            solutionFound : false,
            message : ''
        };

        // nodesInSolution.push(currentNode);
        const currentNodeType: NodeType = currentNode.nodeType;
        if(currentNodeType === NodeType.Goal)
        {
            result.solutionFound = true;
            result.message = 'Solution found';
            return result;
        }

        // explore all the nodes that are connected to the currentNode

        const edgesAsSource: any[] = currentNode.asSource;
        const edgeIds: any[] = Object.keys(edgesAsSource);

        for(var eKey = 0 ; eKey < edgeIds.length; eKey++){
            var edgeId = edgeIds[eKey];
            var nextEdge = simulatorInstance.getEdge(edgeId);
            var nextNode = nextEdge.destination;

            // Forward track
            nodesInSolution.push(nextNode);
            edgesInSolution.push(nextEdge);
            result = DepthFirstSolver.Solve(simulatorInstance, nextNode, nodesInSolution, edgesInSolution, executeAtTime+1);

            if (result.solutionFound) {
                return result;
            }

            // Backtrack
            nodesInSolution.pop();
            edgesInSolution.pop();
        }

        result.solutionFound = false;
        result.message = 'Solution not found yet';

        // mark the current node as visited
        currentNode.set(
            {
                stroke : NodeStateInSearchColorMapper.GetColorForVisitedNode(),
                dirty : true
            }
        );
        simulatorInstance.canvas.requestRenderAll();

        return result;
    }

    static SolveOptimally(simulatorInstance: SimulatorComponent, currentState: Solution, bestState: Solution) {
        debugger;
        if (currentState.reachedGoalState()) {
            if (currentState.cost < bestState.cost) {
                bestState.applyState(currentState);
                return;
            }
        }

        const currentNode = currentState.currentNode;
        const connectedEdges = currentState.getNextEdges();
        const connectedEdgeIds = Object.keys(connectedEdges);
        for (const edgeId of connectedEdgeIds) {
            const nextEdge = connectedEdges[edgeId];
            const nextNode = nextEdge.destination;

            if (currentState.isNodeConsideredInPath(nextNode)) {
                continue; // do not consider a node that has already been considered to avoid
                // infinite loops
            }

            const edgeStart: XY = new XY(nextEdge.x1, nextEdge.y1);
            const edgeEnd: XY = new XY(nextEdge.x2, nextEdge.y2);
            const edgeLength: number = XY.getDistanceBetween(edgeStart, edgeEnd);

            // forward track
            currentState.setCurrentNode(nextNode);
            currentState.addNodeToPath(nextNode);
            currentState.addEdgeToPath(nextEdge);
            currentState.addCost(edgeLength);

            this.SolveOptimally(simulatorInstance, currentState, bestState);

            // backtrack
            currentState.setCurrentNode(currentNode);
            currentState.removeNodeFromPath(nextNode);
            currentState.removeEdgeFromPath(nextEdge);
            currentState.deductCost(edgeLength);
        }

        // mark the current node as visited
        currentNode.set(
            {
                stroke : NodeStateInSearchColorMapper.GetColorForVisitedNode(),
                dirty : true
            }
        );
        simulatorInstance.canvas.requestRenderAll();
    }
}
