import 'fabric';
import { XY } from './XY';

declare let fabric;

export let UIElementEdge = fabric.util.createClass(fabric.Line, {

  type: 'UIElementEdge',

  initialize(element, options) {
    options || (options = {});
    this.callSuper('initialize', element, options);

    // this is the Id of the edge
    this.set('id', options.id || -1);

    // this is the source node in the edge
    this.set('source', options.source || null);

    // this is the destination node in the edge
    this.set('destination', options.destination || null);

    // this decides the amount of weight to be given to the edge length
    this.set('edgeWeight', options.edgeWeight || 1);

    // these are the default properties
    this.set('stroke', '#FFF');
    this.set('fill', '#FFF');
    this.set('strokeWidth', 2);
    this.set('selectable', false);
    // this.set("selectable", false);
    this.set('hasControls', false);
    this.set('perPixelTargetFind', true);
    // this.set("strokeLineJoin",'round');
    this.set('hasBorders', false);
  },

  toObject() {
    return fabric.util.object.extend(this.callSuper('toObject'), {
        id: this.get('id'),
        source : this.get('source'),
        destination : this.get('destination')
    });
  },

  _render(ctx) {
    this.callSuper('_render', ctx);

    // do not render if width/height are zeros or object is not visible
    // if (this.width === 0 || this.height === 0 || !this.visible) return;
    ctx.font = '13px Lato';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(this.getCost(), 20, 20);
    ctx.save();

    const xDiff = this.x2 - this.x1;
    const yDiff = this.y2 - this.y1;
    const angle = Math.atan2(yDiff, xDiff);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(-10, 8);
    ctx.lineTo(-10, -8);
    ctx.closePath();
    ctx.fillStyle = this.stroke;
    ctx.fill();
    ctx.restore();
  },

  getCost(): number {
    const edgeStart: XY = new XY(this.x1, this.y1);
    const edgeEnd: XY = new XY(this.x2, this.y2);
    const edgeLength = XY.getDistanceBetween(edgeStart, edgeEnd);
    const cost = edgeLength * this.edgeWeight;
    return Math.floor(cost * 1000) / 1000;
  }

});
