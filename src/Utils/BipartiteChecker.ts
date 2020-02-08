import { SimulatorComponent } from 'src/app/simulator/simulator.component';
import { NodeStateInSearch } from './NodeStateInSearch';
import { Queue, IQueue } from './Queue';
import { NodeStateInSearchColorMapper } from './NodeStateInSearchColorMapper';
import { NodeColorMapper } from './UIElementNode';

export class BipartiteChecker {

    // This function does the following
    // 1) Checks if the graph is bipartite or not
    // 2) Colors the nodes using two colors
    // 3) Arranges the parts by row
    static SolveBipartiteProblem(simulatorInstance: SimulatorComponent) : any{
        let biPartiteState = BipartiteChecker.GetParts(simulatorInstance);
        console.log(biPartiteState);
        if(biPartiteState == null){
            let result = {message: 'The graph is not bipartite'}
            return result;
        }
        else{
            BipartiteChecker.ColorNodesByParts(simulatorInstance, biPartiteState);
            return {message:"The graph is Bipartite. Two parts have been colored."}
        }
    }

    static ColorNodesByParts(simulatorInstance: SimulatorComponent, parts: any) {
        debugger
        let part0 = parts[0]
        let part1 = parts[1]
        
        for (var key in part0) {
            if (part0.hasOwnProperty(key)) {
                part0[key].set({
                    fill: '#008000',
                    dirty: true
                });
            }
        }

        for(var key in part1){
            if(part1.hasOwnProperty(key)){
                part1[key].set({
                    fill: '#808080',
                    dirty: true
                });
            }
        }

        simulatorInstance.canvas.requestRenderAll();
    }
    
    static GetParts(simulatorInstance: SimulatorComponent) {
        Object.keys(simulatorInstance.nodes).forEach(nodeid => {
            const node = simulatorInstance.nodes[nodeid];
            // Mark the node as unvisited
            node.stateInSearch = NodeStateInSearch.NOT_VISITED;
            
            node.set({
                fill: NodeColorMapper.GetIntermediateNodeColor(),
                dirty: true
            });
            
        });

        simulatorInstance.canvas.requestRenderAll();

        let queue: IQueue<any>;
        queue = new Queue<any>();
        let part0 = {};
        let part1 = {};

        let nodes = simulatorInstance.nodes
        const nodeIds = Object.keys(nodes);

        // Add any node to the queue
        queue.enqueue(nodes[nodeIds[0]]);

        // Assign this node to part0
        part0[nodeIds[0]] = nodes[nodeIds[0]]
        var colorForNeighbours: number = 0;

        while(!queue.isEmpty()){
            // pop the topNode
            debugger;
            let topNode = queue.dequeue();
            var isInPart0: boolean = topNode['id'] in part0;
            var isInPart1: boolean = topNode['id'] in part1;
            if(isInPart0){
                colorForNeighbours = 1;
            }else{
                // has to be in part1, i.e has to be in either of the two
                colorForNeighbours = 0;
            }

            var neighbouringNodes = simulatorInstance.getAllNeighbouringNodes(topNode);
            
            for(let i = 0; i < neighbouringNodes.length; i++){
                let adjNode = neighbouringNodes[i];
                
                // Check if the adjNode is visited
                var isAdjInPart0 = adjNode['id'] in part0;
                var isAdjInPart1 = adjNode['id'] in part1;

                if(!isAdjInPart0 && !isAdjInPart1){
                    // adjNode has not been seen as yet
                    if(colorForNeighbours == 0){
                        part0[adjNode.id] = adjNode;
                    }else{
                        part1[adjNode.id] = adjNode;
                    }
                    queue.enqueue(adjNode);
                }else if(adjNode['id'] in part0){
                    
                    if(colorForNeighbours == 0){
                        continue;
                    }else{
                        return null;
                    }
                    
                }else if(adjNode['id'] in part1){

                    if(colorForNeighbours == 1){
                        continue;
                    }else{
                        return null;
                    }

                }else{
                    // this will never happen
                    // a node will either be in part0 or part1
                }

            }
        }

        let result = []
        result.push(part0)
        result.push(part1)
        console.log("Part 0:");
        console.log(part0);
        console.log("Part 1");
        console.log(part1);
        debugger;
        return result;
    }
}