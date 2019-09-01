import { BestFitSolver } from './BestFitSolver';
import { BreadthFirstSolver } from './BreadthFirstSolver';
import { SimulatorComponent } from 'src/app/simulator/simulator.component';
import { DepthFirstSolver } from './DepthFirstSolver';
import { NodeStateInSearchColorMapper } from './NodeStateInSearchColorMapper';
import { Utility } from './Utility';
import { Solution } from './Solution';
import { UniformCostSolver } from './UniformCostSolver';

export class SearchSolvers {

    static ValidateGraph(simulatorInstance: SimulatorComponent): any {

        let result = {
            isValid : false,
            message : ''
        };
        debugger;
        if (Object.keys(simulatorInstance.nodes).length === 0) {
            result.isValid = false;
            result.message = 'Please add some nodes to the graph';
            return result;
        }

        if (simulatorInstance.startNode != null && Object.keys(simulatorInstance.goalNodes).length !== 0) {
            result.isValid = true;
            result.message = '';
        } else if (simulatorInstance.startNode != null && Object.keys(simulatorInstance.goalNodes).length === 0) {
            result.isValid = false;
            result.message = 'Graph not valid: Graph should have at least one goal node';
        } else if (simulatorInstance.startNode == null && Object.keys(simulatorInstance.goalNodes).length !== 0) {
            result.isValid = false;
            result.message = 'Graph not valid: Start node is not defined';
        } else {
            result.isValid = false;
            result.message = 'Graph not valid: Start, End nodes are not defined';
        }
        return result;
    }

    static SolveByBreadthFirst(simulatorComponent: SimulatorComponent): any {

        SearchSolvers.PrepareForSearch(simulatorComponent);
        let solution: Solution;
        solution = BreadthFirstSolver.Solve(simulatorComponent);
        const solFound = solution.isSolutionFound();
        const result = {
            solutionFound: solFound,
            message: solFound ? 'Solution found with a cost of: ' + solution.cost : 'Could not find the solution'
        };

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
        return result;
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

    static SolveByBestFit(simulatorComponent: SimulatorComponent, isAStarSearch: boolean) {
        SearchSolvers.PrepareForSearch(simulatorComponent);
        let solution: Solution;
        if (isAStarSearch) {
             solution = BestFitSolver.Solve(simulatorComponent, true);
        } else {
            solution = BestFitSolver.Solve(simulatorComponent, false);
        }

        const solFound = solution.isSolutionFound();
        const result = {
            solutionFound: solFound,
            message: solFound ? 'Solution found with a cost of: ' + solution.cost : 'Could not find the solution'
        };

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
        return result;
    }

    static SolveByUniformCostSearch(simulatorComponent: SimulatorComponent): any {
        SearchSolvers.PrepareForSearch(simulatorComponent);
        let solution: Solution;

        solution = UniformCostSolver.Solve(simulatorComponent);

        const solFound = solution.isSolutionFound();
        const result = {
            solutionFound: solFound,
            message: solFound ? 'Solution found with a cost of: ' + solution.cost : 'Could not find the solution'
        };

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
        return result;
    }

    static PrepareForSearch(simulatorInstance: SimulatorComponent) {
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
