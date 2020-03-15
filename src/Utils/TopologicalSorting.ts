import { SimulatorComponent } from 'src/app/simulator/simulator.component';
import { NodeStateInSearch } from './NodeStateInSearch';
import { Queue, IQueue } from './Queue';
import { NodeStateInSearchColorMapper } from './NodeStateInSearchColorMapper';
import { NodeColorMapper } from './UIElementNode';

export class TopologicalSorting{

    static Sort(simulatorInstance: SimulatorComponent) : any{
        let incomingEdges = {};
        let nodeIds = Object.keys(simulatorInstance.nodes);
        let queue: IQueue<any>;
        queue = new Queue<any>();
        debugger;
        for(let i = 0; i < nodeIds.length; i++)
        {
            let nodeId = nodeIds[i];
            let node = simulatorInstance.nodes[nodeId];
            let parentNodes = simulatorInstance.getSourceNodesFor(node);
            incomingEdges[nodeId] = parentNodes.length;
            if(parentNodes.length == 0){
                queue.enqueue(node);
            }
        }

        let orderQueue: IQueue<any>;
        orderQueue = new Queue<any>();

        let inOrder = 0;
        while(!queue.isEmpty()){
            let node = queue.dequeue();
            orderQueue.enqueue(node);
            let destinations = simulatorInstance.getDestinationNodesFor(node);
            inOrder++;

            for(let i = 0; i < destinations.length; i++){
                let destinationNodeId = destinations[i].id;
                incomingEdges[destinationNodeId] = incomingEdges[destinationNodeId] - 1;
                if(incomingEdges[destinationNodeId] == 0){
                    queue.enqueue(destinations[i]);
                }
            }
        }

        if(inOrder == nodeIds.length){
            // order nodes in topological order
            let x = 0;
            while(!orderQueue.isEmpty())
            {
                let node = orderQueue.dequeue();
                node.set({
                    left: x,
                    top: Math.random() * 120,
                    dirty: true
                });
                x+= 300;

                // iterate over all the asSource edges
                simulatorInstance.objectKeys(node.asSource).forEach(edgeKey => {
                    let edge = node.asSource[edgeKey];
                    edge.set({
                    x1: node.left,
                    y1: node.top,
                    dirty: true
                    });
                });
        
                // iterate over all the asDestination edges
                simulatorInstance.objectKeys(node.asDestination).forEach(edgeKey => {
                    let edge = node.asDestination[edgeKey];
                    edge.set({
                    x2: node.left,
                    y2: node.top,
                    dirty: true
                    });
                });
                
            }
            simulatorInstance.groupFocus();
            simulatorInstance.canvas.requestRenderAll();
            simulatorInstance.zoomOutBy(0.1);
        }

        let result = {};
        if(inOrder < nodeIds.length){
            result['message'] = 'Topological ordering is not valid for the graph.'
        }else{
            result['message'] = 'Nodes have been sorted topologically from left ro right.'
            result['message'] += ' They have been staggered for better edge visibility.'
        }

        console.log(incomingEdges);
        return result;
    }
}