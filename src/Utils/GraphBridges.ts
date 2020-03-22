import { NodeStateInSearch } from './NodeStateInSearch';
import { SimulatorComponent } from 'src/app/simulator/simulator.component';
import { Queue, IQueue } from './Queue';
import { NodeType } from './UIElementNode';
import { NodeStateInSearchColorMapper } from './NodeStateInSearchColorMapper';
import { Solution } from './Solution';
import { PriorityQueue } from './PriorityQueue';
import { Options } from './PriorityQueue';
import { SearchSolvers } from './SearchSolvers';

export class GraphBridges {

    static Prepare(simulatorInstance: SimulatorComponent) {

        Object.keys(simulatorInstance.nodes).forEach(nodeid => {
            const node = simulatorInstance.nodes[nodeid];

            // initialize the parent to null
            node.parent = null;

            // Mark if a node is visited
            node.stateInSearch = NodeStateInSearch.NOT_VISITED;

            node.level = 0;
        });

    }

    static Identify(simulatorComponent: SimulatorComponent): any {
        GraphBridges.Prepare(simulatorComponent);
        SearchSolvers.PrepareForSearch(simulatorComponent);
        let allBridges = []

        let nodeList: any[] = [];
        const nodeIds = Object.keys(simulatorComponent.nodes);
        for (const nodeId of nodeIds) {
            const node = simulatorComponent.nodes[nodeId];
            nodeList.push(node);
        }
        debugger
        nodeList.forEach(node => {
            if(node.stateInSearch == NodeStateInSearch.NOT_VISITED){
                node.level = 0;
                let bridges = []
                GraphBridges.subTreeIdenfity(simulatorComponent, node, bridges);

                bridges.forEach(bridge => {
                    allBridges.push(bridge);
                });
            }
        });
        let result = {}
        if(allBridges.length == 0){
            result['message'] = 'There are no bridges in the graph!'
        }else{
            // mark bridges in the graph

            allBridges.forEach(bridge => {
                bridge.set({
                    stroke: '#00FF00',
                    dirty : true
                });
            });
            simulatorComponent.canvas.requestRenderAll();
            result['message'] = "Bridges have been colored in the graph!"
        }
        return result;
    }

    static subTreeIdenfity(simulatorComponent: SimulatorComponent, node: any, bridges: any[]){
        node.stateInSearch = NodeStateInSearch.VISITED;
        node.H = Number.MAX_VALUE;

        let neighbourData = node.getAllNeighbourData();
        let neighbours = neighbourData['neighbours'];
        let edges = neighbourData['edges']

        for(var i = 0; i < neighbours.length; i++){
            let u = neighbours[i];
            if(u.stateInSearch == NodeStateInSearch.NOT_VISITED){
                u.level = node.level + 1;
                GraphBridges.subTreeIdenfity(simulatorComponent, u, bridges);
                if(u.H >= u.level){
                    bridges.push(edges[i]);
                }

                if(u.H < node.H){
                    node.H = u.H;
                }
            }
            else if(u.level < node.level - 1){
                if(u.level < node.H){
                    node.H = u.level;
                }
            }
        }

    }
}
