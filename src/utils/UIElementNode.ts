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
        ctx.save();
        ctx.restore();

        // var nodeState : NodeStateInSearch = this.nodeStateInSearch;
        // switch(nodeState)
        // {
        //     case NodeStateInSearch.UNDEFINED:
        //     {
        //         this.set({
        //             strokeWidth: 0,
        //             dirty : true
        //         });
        //         break;
        //     }
        //     case NodeStateInSearch.CURRENT:
        //     {
        //         this.set({
        //                 strokeWidth: 2,
        //                 stroke : "#000000",
        //                 dirty: true
        //         });
        //         break;
        //     }
        //     case NodeStateInSearch.NOT_VISITED:
        //     {
        //         this.set({
        //             strokeWidth: 2,
        //             stroke: '#696969',
        //             dirty: true
        //         });
        //         break;
        //     }
        //     case NodeStateInSearch.NOT_VISITED:
        //     {
        //         this.set({
        //             strokeWidth : 2,
        //             stroke : "#FFFFFF",
        //             dirty : true
        //         });
        //         break;
        //     }
        //     default:{
        //         this.set({
        //             strokeWidth : 2,
        //             stroke : "#FFFFFF",
        //             dirty : true
        //         });
        //         break;
        //     }
        // }

    },

    getEdgeConnectingNode(otherNode): any {
        debugger;
        // check if the otherNode is present in the as source and as destination of this node
        const asSourceEdgeIds = Object.keys(this.asSource);
        for (const edgeId of asSourceEdgeIds) {
            const edge = this.asSource[edgeId];
            const node = edge.destination;
            if (node === otherNode) {
                return edge;
            }
        }

        const asDestinationEdgeIds = Object.keys(this.asDestination);
        for (const edgeId of asDestinationEdgeIds) {
            const edge = this.asDestination[edgeId];
            const node = edge.source;
            if (node === otherNode) {
                return edge;
            }
        }

        return null;
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
