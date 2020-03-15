import { SimulatorComponent } from 'src/app/simulator/simulator.component';
import { BipartiteChecker } from "./BipartiteChecker";

export class GeneralAlgorithms{
    /*
    This function is used to order the graph topologically
    */
    static TopologicalSorting(simulatorInstance: SimulatorComponent) : any{
        
    }
    
    /*
    This function is used to check if a graph is bipartite or not
    */
    static CheckIfBipartite(simulatorInstance: SimulatorComponent) : any{
        return BipartiteChecker.SolveBipartiteProblem(simulatorInstance);
    }   
}