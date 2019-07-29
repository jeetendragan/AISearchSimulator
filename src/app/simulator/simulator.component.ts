import 'fabric';
import { Component, OnInit } from '@angular/core';
import { XY } from '../../Utils/XY';
import { UIElementNode, NodeType, NodeColorMapper } from '../../Utils/UIElementNode';
import { UIElementEdge } from '../../Utils/UIElementEdge';
import { Utility } from 'src/Utils/Utility';
import { IdGenerator } from 'src/Utils/IdGenerator';
import { SearchSolvers } from 'src/Utils/SearchSolvers';
import { MatSnackBar } from '@angular/material';

declare let fabric;

export enum CanvasState {
  Normal = 1,
  DrawingEdge
}

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit {

  public canvas;
  public canvasElementWidth: number;
  public canvasElementHeight: number;
  public zoom: number;
  public algorithms: string[] = ['Breadth first', 'Depth first', 'Depth first(Optimal)', 'A*'];
  public selectedAlgorithm: string;
  public nodes: any = {};
  public edges: any = {};
  public isLinkingEnabled = false;
  public isDragButtonEnabled = false;
  public activeObject: any = null;
  public tempEdge: any = null;
  public idGenerator: IdGenerator = new IdGenerator(Number.MAX_SAFE_INTEGER);
  public startNode: any = null;
  public goalNode: any = null;
  public numbers: number[] = [];

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const canvasContainerElement = document.getElementById('contentMain');
    this.canvasElementWidth = canvasContainerElement.offsetWidth;
    this.canvasElementHeight = canvasContainerElement.offsetHeight;

    this.canvas = new fabric.Canvas('canvasElement', {
      backgroundColor: '#566573',
      width: this.canvasElementWidth,
      height: this.canvasElementHeight,
      preserveObjectStacking: true
    });

    // initialize the drag to false
    this.canvas.isDragging = false;

    this.canvas.on('mouse:wheel', (opt) => {
      console.log('Wheel');
      const viewportTransform = this.canvas.viewportTransform;
      console.log('Viewport trnasform: ' + viewportTransform);
      const delta = opt.e.deltaY;
      let zoom = this.canvas.getZoom();
      this.zoom = Math.round(zoom * 5) / 5;
      console.log('Zoom: ' + zoom);
      zoom = zoom - delta / 2000;
      if (zoom > 20) { zoom = 20; }
      if (zoom < 0.01) { zoom = 0.01; }
      // fabricCanvas.setZoom(zoom);
      this.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom); // point, zoom amount
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    this.canvas.on('mouse:up', (opt) => {
      // debugger;
      this.canvas.isDragging = false;
      this.canvas.selection = true;
      this.canvas.mouseDown = false;

      // Get the old selection
      const oldSelection = this.activeObject;
      // Get the current selection
      this.activeObject = this.canvas.getActiveObject();

      if (this.isLinkingEnabled) {

        if (oldSelection != null && this.activeObject != null) {

          if (this.isEdge(oldSelection) || this.isEdge(this.activeObject)) {
            // if either of the objects are Edges, then we do not proceed
            this.canvas.remove(this.tempEdge);
            return;
          }

          if (oldSelection !== this.activeObject) {
            console.log('Different selection');

            // remove the temporary edge
            this.canvas.remove(this.tempEdge);
            const rid = this.idGenerator.generateNew();

            // draw a line from the current selection to the new selection
            const edge = new UIElementEdge([oldSelection.left, oldSelection.top, this.activeObject.left, this.activeObject.top],
              {
                id: rid,
                source: oldSelection,
                destination: this.activeObject
              }
            );

            this.registerNodeInEdge(edge, oldSelection, this.activeObject);

          } else {
            console.log('Same selection');
            this.canvas.remove(this.tempEdge);
          }
        } else if (oldSelection != null && this.activeObject == null) {
          console.log('An edge was selected before, but nothing has been selected in this click');
          // remove the temp edge
          this.canvas.remove(this.tempEdge);
        }
      }


    });

    this.canvas.on('mouse:down', (opt) => {
      // debugger
      this.canvas.mouseDown = true;
      const evt = opt.e;
      if (evt.altKey === true || this.isDragButtonEnabled) {
        console.log('Alt and down');
        this.canvas.isDragging = true;
        this.canvas.selection = false;
        this.canvas.lastPosX = evt.clientX;
        this.canvas.lastPosY = evt.clientY;
      }
    });

    this.canvas.on('mouse:move', (opt) => {
      // debugger;
      const point = new XY(opt.e.layerX, opt.e.layerY);
      const viewportTransform = this.canvas.viewportTransform;
      // for (var i = 0; i < viewportTransform.length; i++) {
      //   viewportTransform[i] = Math.round(viewportTransform[i] * 100) / 100;
      // }
      const xDelta = this.canvas.viewportTransform[4] * -1;
      const yDelta = this.canvas.viewportTransform[5] * -1;

      point.X = (1 / viewportTransform[0]) * (point.X + xDelta);
      point.Y = (1 / viewportTransform[3]) * (point.Y + yDelta);

      if (this.canvas.isDragging) {
        const e = opt.e;
        this.canvas.viewportTransform[4] += e.clientX - this.canvas.lastPosX;
        this.canvas.viewportTransform[5] += e.clientY - this.canvas.lastPosY;
        this.canvas.requestRenderAll();
        this.canvas.lastPosX = e.clientX;
        this.canvas.lastPosY = e.clientY;
      }

      // **START** draw a temporary arrow (rep. an edge) for visual feedback******//
      if (this.isLinkingEnabled && this.activeObject != null) {

        // draw an edge from the selected item to the current mouse location

        if (this.tempEdge != null) {
          this.canvas.remove(this.tempEdge);
        }

        this.tempEdge =
          new UIElementEdge(
            [this.activeObject.left, this.activeObject.top, point.X, point.Y], {
              id: -1,
              fill: '#959494',
              stroke: '#959494',
              strokeWidth: 2,
              selectable: false
            }
          );

        this.canvas.add(this.tempEdge);
        this.canvas.sendToBack(this.tempEdge);
        this.canvas.requestRenderAll();
      }
      // **END** draw a temporary arrow for visual feedback ends here ******//


      // **START**if the node is being moved, move the associated edges with a node***//
      const currentSelection = this.canvas.getActiveObject();
      if (this.isNode(currentSelection)) {
        // debugger;
        // iterate over all the asSource edges
        let edge;

        // iterate over all the asSource edges
        this.objectKeys(currentSelection.asSource).forEach(edgeKey => {
          edge = currentSelection.asSource[edgeKey];
          edge.set({
            x1: currentSelection.left,
            y1: currentSelection.top,
            dirty: true
          });
        });

        // iterate over all the asDestination edges
        this.objectKeys(currentSelection.asDestination).forEach(edgeKey => {
          edge = currentSelection.asDestination[edgeKey];
          edge.set({
            x2: currentSelection.left,
            y2: currentSelection.top,
            dirty: true
          });
        });

        // render dirty members on the canavs
        this.canvas.requestRenderAll();

      }
      // **END**if the node is being moved, move the associated edges with a node, if

    });

    this.canvas.on('mouse:dblclick', (opt) => {
      const selectedElement = this.canvas.getActiveObject();
      console.log('Double click');
      if (selectedElement != null) {
        return;
      }

      // create a new node with default values at the location of double click
      const point = new XY(opt.e.layerX, opt.e.layerY);
      const viewportTransform = this.canvas.viewportTransform;
      const xDelta = this.canvas.viewportTransform[4] * -1;
      const yDelta = this.canvas.viewportTransform[5] * -1;

      point.X = (1 / viewportTransform[0]) * (point.X + xDelta);
      point.Y = (1 / viewportTransform[3]) * (point.Y + yDelta);

      this.createNewNodeAt(point);
    });

    document.addEventListener('keydown', (event) => {
      console.log(event.key);
      if (event.key === 'Delete') {
        // Implement code to delete an edge or a node
      }

      if (event.key === 'Escape' && this.isLinkingEnabled) {
        // if esacpe has been clicked and we are in the linking state
        // deactivate an object that may have been active
        this.canvas.discardActiveObject();
        this.canvas.requestRenderAll();
        this.activeObject = null;
        // remove the temp edge if there exists one
        if (this.tempEdge != null) {
          this.canvas.remove(this.tempEdge);
        }
      }

    });

  }

  runSimulator() {
    const result = SearchSolvers.ValidateGraph(this);
    if (!result.isValid) {
      this.snackBar.open(result.message, 'Got it!');
      return;
    }

    switch (this.selectedAlgorithm) {
      case this.algorithms[0]: {
        // breadth first
        const res = SearchSolvers.SolveByBreadthFirst(this);
        // this.snackBar.open(res.message, 'Okay!');
        return;
      }
      case this.algorithms[1]: {
        // depth first
        const res = SearchSolvers.SolveByDepthFirst(this, false);
        this.snackBar.open(res.message, 'Okay!');
        return;
      }
      case this.algorithms[2]: {
        // depth-first(optimal)
        const res = SearchSolvers.SolveByDepthFirst(this, true);
        this.snackBar.open(res.message, 'Okay!');
        return;
      }
      case this.algorithms[3]: {
        // A* search
        return;
      }
    }
  }

  registerNodeInEdge(edge: any, oldSelection: any, currentSelection: any) {
    this.canvas.add(edge);
    this.edges[edge.id] = edge;
    // add the edge in the asSource and asDestination members of the source and destination node
    oldSelection.asSource[edge.id] = edge;
    currentSelection.asDestination[edge.id] = edge;
    this.canvas.sendToBack(edge);
  }

  isEdge(obj: any): boolean {
    if (obj == null) {
      return false;
    }

    return obj.type === 'UIElementEdge';

  }

  objectKeys(object) {
    return Object.keys(object);
  }

  AddNode() {
    // Get the center of the screen (in screen coordinates)
    const screenCenter: XY = this.getScreenCenter();
    const screenCenterInCanvasSystem: XY = this.transformScreenToCanvas(screenCenter);
    // debugger;
    const boxMin = screenCenterInCanvasSystem.add(XY.BasisXY.multiply(-1 * 100));
    const boxMax = screenCenterInCanvasSystem.add(XY.BasisXY.multiply(100));

    // generate a random point within a box in the centre of the screen
    const newNodePos: XY = Utility.GenerateRandomPointInBox(boxMin, boxMax);
    this.createNewNodeAt(newNodePos);
  }

  transformScreenToCanvas(pointInScreenSystem: XY): XY {
    let pointInCanvasSystem: XY;

    // get transform from screen system to canvas system
    const viewportTransform = this.canvas.viewportTransform;
    const xDelta = this.canvas.viewportTransform[4] * -1;
    const yDelta = this.canvas.viewportTransform[5] * -1;

    const X = (1 / viewportTransform[0]) * (pointInScreenSystem.X + xDelta);
    const Y = (1 / viewportTransform[3]) * (pointInScreenSystem.Y + yDelta);

    pointInCanvasSystem = new XY(X, Y);

    return pointInCanvasSystem;
  }

  getScreenCenter(): XY {
    return new XY(this.canvasElementWidth / 2, this.canvasElementHeight / 2);
  }

  createNewNodeAt(point: XY) {
    const id = Object.keys(this.nodes).length + 1;
    const node = new UIElementNode({
      id,
      left: point.X,
      top: point.Y
    });
    this.registerNodeInGraph(node);
    this.canvas.setActiveObject(node);
    this.activeObject = node;
    this.canvas.requestRenderAll();
  }

  registerNodeInGraph(node: any) {
    this.canvas.add(node);
    this.nodes[node.id] = node;
  }

  toggleEdgeState() {
    this.isLinkingEnabled = !this.isLinkingEnabled;
  }

  togglePan() {
    // debugger;
    this.isDragButtonEnabled = !this.isDragButtonEnabled;
  }

  getNodeTypeAsString(node: any): string {
    if (this.isNode(node)) {
      const nodeType: NodeType = node.nodeType;
      switch (nodeType) {
        case NodeType.Intermediate: {
          return 'Intermediate';
        }
        case NodeType.Goal: {
          return 'Goal';
        }
        case NodeType.Start: {
          return 'Start';
        }
      }
    } else {
      return 'OOPs, something went wrong!';
    }
  }

  isNode(node: any) {
    if (node == null) {
      return false;
    }

    return node.type === 'UIElementNode';
  }

  isStartNode(node: any): boolean {
    if (!this.isNode(node)) {
      throw new DOMException('The object is not UIElementNode type');
    }
    const nodeType: NodeType = node.nodeType;
    return (nodeType === NodeType.Start);
  }

  isGoalNode(node: any ): boolean {
    if (!this.isNode(node)) {
      throw new DOMException('The object is not UIElementNode type');
    }
    const nodeType: NodeType = node.nodeType;
    return (nodeType === NodeType.Goal);
  }

  isIntermediateNode(node: any): boolean {
    if (!this.isNode(node)) {
      throw new DOMException('The object is not UIElementNode type');
    }
    const nodeType: NodeType = node.nodeType;
    return (nodeType === NodeType.Intermediate);
  }

  makeStartNode(node: any) {
    if (this.startNode != null) {
      this.startNode.set({
        fill : NodeColorMapper.GetIntermediateNodeColor(),
        dirty : true,
        nodeType : NodeType.Intermediate
      });
    }

    this.activeObject.set({
      fill : NodeColorMapper.GetStartNodeColor(),
      dirty : true,
      nodeType : NodeType.Start
    });

    this.startNode = this.activeObject;

    this.canvas.requestRenderAll();
  }

  makeGoalNode(node: any) {
    if (this.goalNode != null) {

      this.goalNode.set({
        fill : NodeColorMapper.GetIntermediateNodeColor(),
        dirty : true,
        nodeType : NodeType.Intermediate
      });

    }

    this.activeObject.set({
      fill : NodeColorMapper.GetGoalNodeColor(),
      dirty : true,
      nodeType : NodeType.Goal
    });

    this.goalNode = this.activeObject;

    this.canvas.requestRenderAll();

  }

  makeIntermediateNode(node: any) {
    if (this.goalNode === node) {
      this.goalNode.set({
        fill : NodeColorMapper.GetIntermediateNodeColor(),
        dirty : true,
        nodeType : NodeType.Intermediate
      });
      this.goalNode = null;
    }

    if (this.startNode === node) {
      this.startNode.set({
        fill : NodeColorMapper.GetIntermediateNodeColor(),
        dirty : true,
        nodeType : NodeType.Intermediate
      });
      this.startNode = null;
    }

    this.canvas.requestRenderAll();

  }

  getDestinationNodesFor(currentNode: any): any[] {
    const destinationNodes = [];
    Object.keys(currentNode.asSource).forEach(edgeId => {
      const edge = this.getEdge(edgeId);
      destinationNodes.push(edge.destination);
    });
    return destinationNodes;
  }

  getEdge(edgeId: string) {
    return this.edges[edgeId];
  }

}
