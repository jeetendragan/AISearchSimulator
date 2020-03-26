import { NodeStateInSearch } from './NodeStateInSearch';
import { SimulatorComponent } from 'src/app/simulator/simulator.component';
import { Queue, IQueue } from './Queue';
import { NodeType } from './UIElementNode';
import { NodeStateInSearchColorMapper } from './NodeStateInSearchColorMapper';
import { Solution } from './Solution';
import { PriorityQueue } from './PriorityQueue';
import { Options } from './PriorityQueue';
import { XY } from './XY';
import { UIElementEdge } from './UIElementEdge';

export class ConvexHull {
    
    static Find(simulatorInstance: SimulatorComponent): any{
        
        debugger;

        let nodeIds = Object.keys(simulatorInstance.nodes)
        let nodes = []
        let leftMostPoint = null
        let leftX = Number.MAX_VALUE;
        // find the left-most point
        for(var i = 0; i < nodeIds.length; i++){
            nodes.push(simulatorInstance.nodes[nodeIds[i]])
            if(nodes[i].left < leftX){
                leftMostPoint = nodes[i]
                leftX = nodes[i].left;
            }
        }

        if(leftMostPoint == null){
            return {'message': 'Something went wrong!'}
        }
        let hull = []
        let start = leftMostPoint;
        hull.push(start);
        let current = start;
        let nextPoint = null
        do{
            nextPoint = this.getNextPoint(current, simulatorInstance.nodes);
            hull.push(nextPoint);
            current = nextPoint;
        }while(nextPoint.id != start.id);
        
        hull.push(start)
        for(var i = 0; i < hull.length-1; i++){
            const edge = new UIElementEdge([hull[i].left, hull[i].top, hull[i+1].left, hull[i+1].top],
                {
                  id: simulatorInstance.idGenerator.generateNew(),
                  source: hull[i],
                  destination: hull[i+1],
                  isUndirected: true
                }
              );
              simulatorInstance.registerNodeInEdge(edge, hull[i], hull[i+1], true);
        }

        simulatorInstance.canvas.requestRenderAll();

        return {
            'message': 'Cross-prod found'
        }
    }

    static getNextPoint(current, nodesSet){
        delete nodesSet[current.id]
        let nodeIds = Object.keys(nodesSet)
        let nextNode = nodesSet[nodeIds[0]]
        let currVect = new XY(nextNode.left - current.left, nextNode.top - current.top)
        for(var i = 1; i < nodeIds.length; i++){
            let newCand = nodesSet[nodeIds[i]]
            let newVect = new XY(newCand.left - current.left, newCand.top - current.top)
            let cp = currVect.crossProduct(newVect)
            if(cp > 0){
                nextNode = newCand;
                currVect = newVect;
            }
        }
        nodesSet[current.id] = current;
        return nextNode;
    }

}
