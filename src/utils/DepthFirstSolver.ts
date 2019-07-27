import { SimulatorComponent } from 'src/app/simulator/simulator.component';
import { NodeType } from './UIElementNode';
import { UIElementNode } from "./UIElementNode";
import { NodeStateInSearchColorMapper } from "./NodeStateInSearchColorMapper";
import { Utility } from "./Utility";

export class DepthFirstSolver{
    
    static Solve(simulatorInstance: SimulatorComponent, currentNode : any, nodesInSolution : any[], edgesInSolution : any[], executeAtTime : number): any {
        
        var result = {
            solutionFound : false,
            message : ""
        };

        debugger;

        // nodesInSolution.push(currentNode);
        var currentNodeType : NodeType = currentNode.nodeType;
        if(currentNodeType == NodeType.Goal)
        {
            result.solutionFound = true;
            result.message = "Solution found"; 
            return result;
        }

        // Highlight the current node
        currentNode.set({
            stroke : NodeStateInSearchColorMapper.GetColorForCurrentNode(),
            dirty : true
        });
        simulatorInstance.canvas.requestRenderAll();
        // Utility.Sleep(1000);

        // explore all the nodes that are connected to the currentNode
        
        // var connectedNodes : any[] = simulatorInstance.getDestinationNodesFor(currentNode);
        var edgesAsSource : any[] = currentNode.asSource;
        var edgeIds : any[] = Object.keys(edgesAsSource);
        
        for(var eKey = 0 ; eKey < edgeIds.length; eKey++){
            var edgeId = edgeIds[eKey];
            var nextEdge = simulatorInstance.getEdge(edgeId);
            var nextNode = nextEdge.destination;
            currentNode.set(
                {
                    stroke : NodeStateInSearchColorMapper.GetColorForVisitedNode(),
                    dirty : true
                }
            );
            simulatorInstance.canvas.requestRenderAll();
            
            // Forward track
            nodesInSolution.push(nextNode);
            edgesInSolution.push(nextEdge);
            result = DepthFirstSolver.Solve(simulatorInstance, nextNode, nodesInSolution, edgesInSolution, executeAtTime+1);
            
            if(result.solutionFound){
                return result;
            }

            // Backtrack
            nodesInSolution.pop();
            edgesInSolution.pop();

            // Backtrack
            currentNode.set({
                stroke : NodeStateInSearchColorMapper.GetColorForCurrentNode(),
                dirty : true
            });
            simulatorInstance.canvas.requestRenderAll();
        };
        
        result.solutionFound = false;
        result.message = "Solution not found yet";

        return result;
    }

}