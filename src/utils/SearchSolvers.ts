import { SimulatorComponent } from 'src/app/simulator/simulator.component';
import { DepthFirstSolver } from './DepthFirstSolver';
import { NodeStateInSearchColorMapper } from './NodeStateInSearchColorMapper';
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material';
import { Utility } from './Utility';

export class SearchSolvers{

  static ValidateGraph(simulatorInstance: SimulatorComponent) : any{
    var result = {
        isValid : false,
        message : ""
    };

    if(Object.keys(simulatorInstance.nodes).length == 0){
        result.isValid = false;
        result.message = "Please add some nodes to the graph";
        return result;
    }

    if(simulatorInstance.startNode != null && simulatorInstance.goalNode != null){
        result.isValid = true;
        result.message = "";
    }else if(simulatorInstance.startNode != null && simulatorInstance.goalNode == null){
        result.isValid = false;
        result.message = "Graph not valid: Goal is not defined.";
    }else if(simulatorInstance.startNode == null && simulatorInstance.goalNode != null){
        result.isValid = false;
        result.message = "Graph not valid: Start node is not defined";
    }else
    {
        result.isValid = false;
        result.message = "Graph not valid: Start, End nodes are not defined";
    }
    return result;
  }

  static SolveByDepthFirst(simulatorInstance: SimulatorComponent) : any{
    SearchSolvers.PrepareForSearch(simulatorInstance);
    var pathNodes = [];
    pathNodes.push(simulatorInstance.startNode);
    var pathEdges = [];
    var result = DepthFirstSolver.Solve(simulatorInstance, simulatorInstance.startNode, pathNodes, pathEdges, 0);
    pathNodes.forEach(node => {
        node.set({
            stroke: "#00FF00",
            dirty: true
        });
    });

    pathEdges.forEach(edge => {
        edge.set({
            stroke : '#00FF00',
            dirty : true
        });
    });

    simulatorInstance.canvas.requestRenderAll();
    return result;
  }

  static PrepareForSearch(simulatorInstance : SimulatorComponent){
    debugger;
    Object.keys(simulatorInstance.nodes).forEach(nodeid => {
        var node = simulatorInstance.nodes[nodeid];
        node.set({
            stroke : NodeStateInSearchColorMapper.GetColorForNotVisitedNode(),
            strokeWidth : 4,
            dirty: true
        });
    });

    simulatorInstance.canvas.requestRenderAll();

  }
  
}

