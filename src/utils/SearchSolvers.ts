import { BreadthFirstSolver } from './BreadthFirstSolver';
import { SimulatorComponent } from 'src/app/simulator/simulator.component';
import { DepthFirstSolver } from './DepthFirstSolver';
import { NodeStateInSearchColorMapper } from './NodeStateInSearchColorMapper';
import { Utility } from './Utility';
import { Solution } from './Solution';

export class SearchSolvers {

    static ValidateGraph(simulatorInstance: SimulatorComponent): any {

        let result = {
            isValid : false,
            message : ''
        }

        if (Object.keys(simulatorInstance.nodes).length == 0) {
            result.isValid = false;
            result.message = 'Please add some nodes to the graph';
            return result;
        }

        if (simulatorInstance.startNode != null && simulatorInstance.goalNode != null) {
            result.isValid = true;
            result.message = '';
        } else if (simulatorInstance.startNode != null && simulatorInstance.goalNode == null) {
            result.isValid = false;
            result.message = 'Graph not valid: Goal is not defined.';
        } else if (simulatorInstance.startNode == null && simulatorInstance.goalNode != null) {
            result.isValid = false;
            result.message = 'Graph not valid: Start node is not defined';
        } else {
            result.isValid = false;
            result.message = 'Graph not valid: Start, End nodes are not defined';
        }
        return result;
    }

    static SolveByBreadthFirst(simulatorComponent: SimulatorComponent) {

        SearchSolvers.PrepareForSearch(simulatorComponent);
        const solution: Solution = BreadthFirstSolver.Solve(simulatorComponent);
        const nodeList: any = solution.getNodeListInPath();
        nodeList.forEach(node => {
            node.set({
                stroke: '#00FF00',
                dirty: true
            });
        });

        const edgeList: any = solution.getEdgeListInPath();
        edgeList.forEach(edge => {
            edge.set({
                stroke: '#00FF00',
                dirty: true
            });
        });
        simulatorComponent.canvas.requestRenderAll();
    }

    static SolveByDepthFirst(simulatorInstance: SimulatorComponent, solveOptimally: boolean): any {

        let result = {
            solutionFound : false,
            message : ''
        };

        SearchSolvers.PrepareForSearch(simulatorInstance);

        let currentSolution: Solution = new Solution(0);
        currentSolution.setCurrentNode(simulatorInstance.startNode);
        currentSolution.addNodeToPath(simulatorInstance.startNode);

        let bestSolution: Solution = new Solution(Number.MAX_VALUE);

        DepthFirstSolver.Solve(simulatorInstance, currentSolution, bestSolution, solveOptimally);

        const edges: any[] = bestSolution.getEdgeListInPath();
        const nodes: any[] = bestSolution.getNodeListInPath();

        if (edges.length == 0) {
            result.solutionFound = false;
            result.message = 'Could not find the solution';
            return result;
        }

        result.solutionFound = true;
        result.message = 'Best solution found with path cost: ' + bestSolution.cost;

        nodes.forEach(node => {
            node.set({
                stroke: '#00FF00',
                dirty : true
            });
        });

        edges.forEach(edge => {
            edge.set({
                stroke: '#00FF00',
                dirty : true
            });
        });
        simulatorInstance.canvas.requestRenderAll();
        
        return result;
    }

    static PrepareForSearch(simulatorInstance : SimulatorComponent) {
      let notVisitedNodeColor = NodeStateInSearchColorMapper.GetColorForNotVisitedNode();
      Object.keys(simulatorInstance.nodes).forEach(nodeid => {
          var node = simulatorInstance.nodes[nodeid];
          node.set({
              stroke : notVisitedNodeColor,
              strokeWidth : 4,
              dirty: true
          });
        });

      Object.keys(simulatorInstance.edges).forEach(edgeId => {
          var edge = simulatorInstance.edges[edgeId];
          edge.set({
              stroke: '#FFFFFF',
              dirty: true
          });
      });

      simulatorInstance.canvas.requestRenderAll();

    }

}
