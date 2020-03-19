import { XY } from './XY';
import 'fabric';
declare let fabric;

export let UIElementNode = fabric.util.createClass(fabric.Circle, {

    type: 'UIElementNode',

    initialize(options) {
        options || (options = {});

        this.callSuper('initialize', options);

        // this the node id
        this.set('id', options.id || -1);
        debugger;
        // the type of node - start, goal, intermediate, is of type NodeType
        this.set('nodeType', options.nodeType || NodeType.Intermediate);

        // this will be an array of UIElementEdge objects
        this.set('asSource', options.asSource || {});

        // this will be an array of UIElementEdge objects
        this.set('asDestination', options.asDestination || {});

        // these are the default values
        this.set('radius', options.radius || 50);
        this.set('originX', options.originX || 'center');
        this.set('originY', options.originY || 'center');

        switch (this.nodeType) {
            case NodeType.Goal: {
                const color = NodeColorMapper.GetGoalNodeColor();
                this.set('fill', color);
                break;
            }
            case NodeType.Intermediate: {
                const intermediateNodeColor = NodeColorMapper.GetIntermediateNodeColor();
                this.set('fill', intermediateNodeColor);
                break;
            }
            case NodeType.Start: {
                const startNodeColor = NodeColorMapper.GetStartNodeColor();
                this.set('fill', startNodeColor);
                break;
            }
            default:
            {
                const intermediateNodeColor = NodeColorMapper.GetIntermediateNodeColor();
                this.set('fill', intermediateNodeColor);
                break;
            }
        }

        this.set('shadow', { color: 'rgb(0,0,0)', blur: 3, offsetX: 0, offsetY: 0 });
        // this.set("strokeWidth",2);
        // this.set("stroke", "#FFFFFF");
        this.set('lockRotation', true);
        this.set('lockScalingX', true);
        this.set('lockScalingY', true);
        this.set('hasControls', false);
    },

    toObject() {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            id: this.get('id'),
            nodeName: this.get('nodeName'),
            nodeType: this.get('nodeType'),
            asSource: this.get('asSource'),
            asDestination: this.get('asDestination')
        });
    },

    _render(ctx) {
        this.callSuper('_render', ctx);

        ctx.font = '13px Lato';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('N-' + this.id, -10, 5);
        if (this.visitOrder !== undefined) {
            ctx.fillText('VO: ' + this.visitOrder, -10, 25);
        }
        ctx.save();
        ctx.restore();
    },

    getEdgeConnectingNode(otherNode): any {
        /*
        CASE 1:
        If the otherNode is the destination of the edge connecting this and other node
        i.e. configuration is like - this -> other
        We will surely find as we are iterating over all the asSource edges

        CASE 2:
        If the otherNode is the source in the relationship
        i.e. configuration is like - other -> this
        Will surely find the node as we are iterating over all the asDestination edges
        */

        // CASE 1
        const asSourceEdgeIds = Object.keys(this.asSource);
        for (const edgeId of asSourceEdgeIds) {
            const edge = this.asSource[edgeId];
            const node = edge.destination;
            if (node === otherNode) {
                return edge;
            }
        }

        // CASE 2
        const asDestinationEdgeIds = Object.keys(this.asDestination);
        for (const edgeId of asDestinationEdgeIds) {
            const edge = this.asDestination[edgeId];
            const node = edge.source;
            if (node === otherNode) {
                return edge;
            }
        }

        return null;
    },

    getDistanceTo(otherNode: any): number {
        const thisPos = new XY(this.left, this.top);
        const otherPos = new XY(otherNode.left, otherNode.top);
        return thisPos.distanceTo(otherPos);
    },

    getAllNeighbouringNodes(): any {
        /*
        How are neighbours collected?
        When an edge is directed and the current node is the source, then the destination can be reached
        hence is a valid neighbour.
        When an edge is undirected and the current node is the source, then the destination can 
        still be reached hence is a valid neighbour.
        When an edge is directed and the current node is the destinatio, then the source cannot be reached
        hence the source is not a valid neighbour.
        When an edge is undirected and the current node is the destination, then the source can be 
        reached, hence the source is a valid neighbour.
        */

        let neighbours = []

        // Iterate over all the edges in which the node is a source
        const asSourceEdgeIds = Object.keys(this.asSource);
        for (const edgeId of asSourceEdgeIds) {
            const edge = this.asSource[edgeId];
            const node = edge.destination;
            if(node.id != this.id){
                neighbours.push(node);
            }
        }

        const asDestinationEdgeIds = Object.keys(this.asDestination);
        for (const edgeId of asDestinationEdgeIds) {
            const edge = this.asDestination[edgeId];
            if(edge.isUndirected){
                const node = edge.source;
                if(node.id != this.id){
                    neighbours.push(node);
                }
            }
        }

        return neighbours;
    },

    getAllNeighbouringNodesWithCost(): any{
        let neighbours = []
        let costs = []

        // Iterate over all the edges in which the node is a source
        const asSourceEdgeIds = Object.keys(this.asSource);
        for (const edgeId of asSourceEdgeIds) {
            const edge = this.asSource[edgeId];
            const node = edge.destination;
            neighbours.push(node);
            costs.push(edge.getCost());
        }

        const asDestinationEdgeIds = Object.keys(this.asDestination);
        for (const edgeId of asDestinationEdgeIds) {
            const edge = this.asDestination[edgeId];
            if(edge.isUndirected){
                const node = edge.source;
                neighbours.push(node);
                costs.push(edge.getCost());
            }
        }

        return {'neighbours': neighbours, 'costs': costs};
    },

    getAllNeighbourData(): any{
        let neighbours = []
        let costs = []
        let edges = []

        // Iterate over all the edges in which the node is a source
        const asSourceEdgeIds = Object.keys(this.asSource);
        for (const edgeId of asSourceEdgeIds) {
            const edge = this.asSource[edgeId];
            const node = edge.destination;
            neighbours.push(node);
            costs.push(edge.getCost());
            edges.push(edge);
        }

        const asDestinationEdgeIds = Object.keys(this.asDestination);
        for (const edgeId of asDestinationEdgeIds) {
            const edge = this.asDestination[edgeId];
            if(edge.isUndirected){
                const node = edge.source;
                neighbours.push(node);
                costs.push(edge.getCost());
                edges.push(edge);
            }
        }

        return {'neighbours': neighbours, 'costs': costs, 'edges': edges};
    }
});

export enum NodeType {
    Start= 1,
    Intermediate,
    Goal
}

export class NodeColorMapper {
    private static COLOR_MAP = {
        Start : '#0849A2',
        Goal : '#08A229',
        Intermediate : '#FF5733'
    };

    public static GetIntermediateNodeColor(): string {
        return this.COLOR_MAP.Intermediate;
    }

    public static GetGoalNodeColor(): string {
        return this.COLOR_MAP.Goal;
    }

    public static GetStartNodeColor(): string {
        return this.COLOR_MAP.Start;
    }

}
