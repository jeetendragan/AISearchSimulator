import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { XY } from '../../Utils/XY';
import { UIElementNode, NodeType, NodeColorMapper } from '../../Utils/UIElementNode';
import { UIElementEdge } from '../../Utils/UIElementEdge';
import { Utility } from 'src/Utils/Utility';
import { IdGenerator } from 'src/Utils/IdGenerator';
import { SearchSolvers } from 'src/Utils/SearchSolvers';
import { MatSnackBar } from '@angular/material';
import { MatDialog} from '@angular/material/dialog';

import 'fabric';
import { GeneralAlgorithms } from 'src/Utils/GeneralAlgorithms';
import { TopologicalSorting } from 'src/Utils/TopologicalSorting';
import { GraphBridges } from 'src/Utils/GraphBridges';
import { ConvexHull } from 'src/Utils/ConvexHull';
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
  public algorithms: string[] = ['Breadth first search', 'Uniform cost search', 'Depth first search', 'Depth first (Optimal)', 'Best-Fit (Greedy)', 'Best-Fit (A*)', 'Check Bipartiteness', 'Topological Ordering', 'Find Bridges(Undirected graph)', 'Convex Hull'];
  public selectedAlgorithm: string;
  public nodes: any = {};
  public edges: any = {};
  public isLinkingEnabled = false;
  public isLinkingBidirectional = false;
  public isDragButtonEnabled = false;
  public activeObject: any = null;
  public tempEdge: any = null;
  public idGenerator: IdGenerator = new IdGenerator(Number.MAX_SAFE_INTEGER);
  public startNode: any = null;
  public goalNodes: any = {};
  public numbers: number[] = [];

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
  }

  clearAll() {
    this.deleteAllNodes();
    this.deleteAllEdges();
    this.activeObject = null;
    this.startNode = null;
    this.goalNodes = {};
    this.numbers = [];
    this.idGenerator = new IdGenerator(Number.MAX_SAFE_INTEGER);
  }

  deleteAllNodes(){
    let nodeIds = Object.keys(this.nodes);
    for(var i = 0; i < nodeIds.length; i++){
      this.canvas.remove(this.nodes[nodeIds[i]]);
    }
    this.nodes = {}
  }

  deleteAllEdges() {
    let edgeIds = Object.keys(this.edges);
    for(var i = 0; i < edgeIds.length; i++){
      this.canvas.remove(this.edges[edgeIds[i]]);
    }
    this.edges = {}
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

      debugger;
      // Get the old selection
      const oldSelection = this.activeObject;
      console.log(oldSelection);

      // Get the current selection
      this.activeObject = this.canvas.getActiveObject();
      console.log(this.activeObject);

      if (this.isLinkingEnabled || this.isLinkingBidirectional) {

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
                destination: this.activeObject,
                isUndirected: this.isLinkingBidirectional
              }
            );

            this.registerNodeInEdge(edge, oldSelection, this.activeObject, this.isLinkingBidirectional);
            // this.registerNodeInEdge(edge, oldSelection, this.activeObject);

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
      if ((this.isLinkingEnabled || this.isLinkingBidirectional )&& this.activeObject != null) {

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
              selectable: false,
              isUndirected: this.isLinkingBidirectional
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
          // When a user draws an arrow, even though the edge is undirected, we 
          // store the source and destination. Which will help us set the coordinates
          // of the edge correctly depending on the node(source/destination) being moved
          if(edge.source.id == currentSelection.id){
            edge.set({
              x1: currentSelection.left,
              y1: currentSelection.top,
              dirty: true
            });
          }
        });

        // iterate over all the asDestination edges
        this.objectKeys(currentSelection.asDestination).forEach(edgeKey => {
          edge = currentSelection.asDestination[edgeKey];
          if(edge.destination.id == currentSelection.id){
            edge.set({
              x2: currentSelection.left,
              y2: currentSelection.top,
              dirty: true
            });
          }
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

      if (event.key === 'Escape' && (this.isLinkingEnabled || this.isLinkingBidirectional)) {
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(event.target.innerWidth);
    this.canvasElementWidth = event.target.innerWidth;
    console.log(event.target.innerHeight);
    this.canvasElementHeight = event.target.innerHeight;
    this.canvas.set({
      width : this.canvasElementWidth,
      height : this.canvasElementHeight
    });
    this.groupFocus();
  }

  runSimulator() {

    switch (this.selectedAlgorithm) {
      case this.algorithms[0]: {
        // breadth first

        const result = SearchSolvers.ValidateGraph(this);
        if (!result.isValid) {
          this.snackBar.open(result.message, 'Got it!');
          return;
        }

        const res = SearchSolvers.SolveByBreadthFirst(this);
        this.snackBar.open(res.message, 'Okay!');
        return;
      }
      case this.algorithms[1]: {
        // Uniform cost search

        const result = SearchSolvers.ValidateGraph(this);
        if (!result.isValid) {
          this.snackBar.open(result.message, 'Got it!');
          return;
        }

        const res = SearchSolvers.SolveByUniformCostSearch(this);
        this.snackBar.open(res.message, 'Okay!');
        return;
      }
      case this.algorithms[2]: {
        // depth first

        const result = SearchSolvers.ValidateGraph(this);
        if (!result.isValid) {
          this.snackBar.open(result.message, 'Got it!');
          return;
        }

        const res = SearchSolvers.SolveByDepthFirst(this, false);
        this.snackBar.open(res.message, 'Okay!');
        return;
      }
      case this.algorithms[3]: {
        // depth-first(optimal)

        const result = SearchSolvers.ValidateGraph(this);
        if (!result.isValid) {
          this.snackBar.open(result.message, 'Got it!');
          return;
        }

        const res = SearchSolvers.SolveByDepthFirst(this, true);
        this.snackBar.open(res.message, 'Okay!');
        return;
      }
      case this.algorithms[4]: {
        // greedy best fit

        const result = SearchSolvers.ValidateGraph(this);
        if (!result.isValid) {
          this.snackBar.open(result.message, 'Got it!');
          return;
        }
        const res = SearchSolvers.SolveByBestFit(this, false);
        this.snackBar.open(res.message, 'Okay!');
        return;
      }
      case this.algorithms[5]: {
        // A* search
        const result = SearchSolvers.ValidateGraph(this);
        if (!result.isValid) {
          this.snackBar.open(result.message, 'Got it!');
          return;
        }
        const res = SearchSolvers.SolveByBestFit(this, true);
        this.snackBar.open(res.message, 'Okay!');
        return;
      }
      case this.algorithms[6]:{
        // Check if bipartite
        const res = GeneralAlgorithms.CheckIfBipartite(this);
        this.snackBar.open(res.message, "Okay");
        return;
      }
      case this.algorithms[7]: {
        // Topological ordering
        const res = TopologicalSorting.Sort(this);
        this.snackBar.open(res.message, "Okay!");
        return;
      }
      case this.algorithms[8]:{
        // Find Bridges(Undirected graph)
        const res = GraphBridges.Identify(this);
        this.snackBar.open(res.message, "Okay!");
        return;
      }
      case this.algorithms[9]:{
        // convex hull
        const res = ConvexHull.Find(this);
        this.snackBar.open(res.message, "Okay");
        return;
      }
    }
  }

  registerNodeInEdge(edge: any, oldSelection: any, currentSelection: any, 
    isLinkingBidirectional: boolean) {
    //isLinkingBidirectional: boolean
    
    this.canvas.add(edge);
    this.edges[edge.id] = edge;
    // add the edge in the asSource and asDestination members of the source and destination node
    oldSelection.asSource[edge.id] = edge;
    currentSelection.asDestination[edge.id] = edge;
    
    if(isLinkingBidirectional){
      currentSelection.asSource[edge.id] = edge;
      oldSelection.asDestination[edge.id] = edge;
    }
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

  AddNodeInBox(boxMin, boxMax){
    // generate a random point within a box in the centre of the screen
    const newNodePos: XY = Utility.GenerateRandomPointInBox(boxMin, boxMax);
    this.createNewNodeAt(newNodePos);
  }

  AddRandomNodes(){

    let nodeCount = Utility.GenerateRandomNumberBetween(3, 8);

    // Get the center of the screen (in screen coordinates)
    const screenCenter: XY = this.getScreenCenter();
    const screenCenterInCanvasSystem: XY = this.transformScreenToCanvas(screenCenter);
    // debugger;
    const boxMin = screenCenterInCanvasSystem.add(XY.BasisXY.multiply(-1 * 250));
    const boxMax = screenCenterInCanvasSystem.add(XY.BasisXY.multiply(250));

    for(var i = 1; i <= nodeCount; i++){
      this.AddNodeInBox(boxMin, boxMax);
    }

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
    this.isLinkingBidirectional = false;
    // this.isLinkingEnabled = !this.isLinkingEnabled;
    /*if(this.isLinkingEnabled){
      if(this.isLinkingBidirectional){
        this.isLinkingBidirectional = false;
      }else{
        this.isLinkingEnabled = false;
      }
    }else{
        this.isLinkingBidirectional = false;
        this.isLinkingEnabled = true;
    }*/
  }

  toggleUndirectedEdgeState() {
    this.isLinkingBidirectional = !this.isLinkingBidirectional;
    this.isLinkingEnabled = false;
    /*if(this.isLinkingEnabled){
      if(this.isLinkingBidirectional){
        this.isLinkingEnabled = false;
        this.isLinkingBidirectional = false;
      }else{
        this.isLinkingBidirectional = true;
      }
    }else{
      this.isLinkingEnabled = true;
      this.isLinkingBidirectional = true;
    }*/
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

    if (this.isGoalNode(node)) {
      delete this.nodes[node.id];
    }

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
    debugger;
    if (this.goalNodes[node.id] !== undefined) {
      return; // the node is already a goal node
    }
    this.goalNodes[node.id] = node;
    node.set({
      fill : NodeColorMapper.GetGoalNodeColor(),
      dirty : true,
      nodeType : NodeType.Goal
    });
    this.canvas.requestRenderAll();
  }

  makeIntermediateNode(node: any) {
    if (this.isGoalNode(node)) {
      node.set({
        fill : NodeColorMapper.GetIntermediateNodeColor(),
        dirty : true,
        nodeType : NodeType.Intermediate
      });
      delete this.goalNodes[node.id];
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

  zoomIn() {
    let zoom = this.canvas.getZoom();
    this.zoom = Math.round(zoom * 5) / 5;
    console.log('Zoom: ' + zoom);
    zoom = zoom + 0.01;

    if (zoom > 20) { zoom = 20; }
    if (zoom < 0.01) { zoom = 0.01; }

    // get the centre of the screen
    const screenCenter: XY = this.getScreenCenter();
    this.canvas.zoomToPoint({ x: screenCenter.X, y: screenCenter.Y }, zoom); // point, zoom amount
  }

  zoomOut() {
    let zoom = this.canvas.getZoom();
    this.zoom = Math.round(zoom * 5) / 5;
    console.log('Zoom: ' + zoom);
    zoom = zoom - 0.01;

    if (zoom > 20) { zoom = 20; }
    if (zoom < 0.01) { zoom = 0.01; }

    // get the centre of the screen
    const screenCenter: XY = this.getScreenCenter();
    this.canvas.zoomToPoint({ x: screenCenter.X, y: screenCenter.Y }, zoom); // point, zoom amount
  }

  zoomOutBy(zoomAmount){
    let zoom = this.canvas.getZoom();
    this.zoom = Math.round(zoom * 5) / 5;
    console.log('Zoom: ' + zoom);
    zoom = zoom - zoomAmount;

    if (zoom > 20) { zoom = 20; }
    if (zoom < 0.01) { zoom = 0.01; }

    // get the centre of the screen
    const screenCenter: XY = this.getScreenCenter();
    this.canvas.zoomToPoint({ x: screenCenter.X, y: screenCenter.Y }, zoom); // point, zoom amount
  }

  groupFocus() {
    const nodeIds = this.objectKeys(this.nodes);
    let node = this.nodes[nodeIds[0]];

    const nodeRadius = node.radius;

    let leftMost = node.left - nodeRadius;
    let rightMost = node.left + nodeRadius;
    let topMost = node.top - nodeRadius;
    let bottomMost = node.top + nodeRadius;
    let currentFileLeftMost, currentFileRightMost, currentFileBottomMost, currentFileTopMost;
    // get the bounding left, right, top and bottom coordinates
    nodeIds.forEach(nodeId => {
      node = this.nodes[nodeId];
      currentFileLeftMost = node.left - nodeRadius;
      currentFileRightMost = node.left + nodeRadius;
      currentFileBottomMost = node.top + nodeRadius;
      currentFileTopMost = node.top - nodeRadius;

      if (currentFileLeftMost < leftMost) {
        leftMost = currentFileLeftMost;
      }
      if (currentFileRightMost > rightMost) {
        rightMost = currentFileRightMost;
      }

      if (currentFileBottomMost > bottomMost) {
        bottomMost = currentFileBottomMost;
      }
      if (currentFileTopMost < topMost) {
        topMost = currentFileTopMost;
      }
    });

    // find the zoom level such that the focus area will fit
    const focusWidth = Math.abs(rightMost - leftMost);
    const focusHeight = Math.abs(topMost - bottomMost);

    const widthMargin = this.canvasElementWidth * 5 / 100;
    const heightMargin = this.canvasElementHeight * 5 / 100;

    const widthZoom = (this.canvasElementWidth - widthMargin) / focusWidth;
    const heightZoom = (this.canvasElementHeight - heightMargin) / focusHeight;
    let zoom;

    const heightAfterWidthZoom = focusHeight * widthZoom;
    const widthAfterHeightZoom = focusWidth * heightZoom;

    let widthZoomBool = false;
    let heightZoomBool = false;
    let noZoom = false;

    if (heightAfterWidthZoom <= this.canvasElementHeight) {
      zoom = widthZoom;
      widthZoomBool = true;
    } else {
      if (widthAfterHeightZoom <= this.canvasElementWidth) {
        zoom = heightZoom;
        heightZoomBool = true;
      } else {
        noZoom = true;
      }
    }
    if (noZoom === true) {
      return;
    }

    // set the focus area
    this.canvas.setZoom(zoom);
    this.canvas.requestRenderAll();

    // translate the canvas so that the focus area is the center of the screen
    const viewPortTra = this.canvas.viewportTransform;

    // // object center is in world coordinates
    const focusCenterX = leftMost + focusWidth / 2;
    const focusCenterY = topMost + focusHeight / 2;

    // screen center, represents the screen coordinates on the screen, i.e. the center of the screen
    const screenCenterX = this.canvasElementWidth / 2;
    const screenCenterY = this.canvasElementHeight / 2;

    // represents the real world coordinates
    const screenCenterAsWorldUnitsX = (screenCenterX - viewPortTra[4]) * (1 / zoom);
    const screenCenterAsWorldUnitsY = (screenCenterY - viewPortTra[5]) * (1 / zoom);

    // // diff in screen and object centers
    const xDiff = (focusCenterX - screenCenterAsWorldUnitsX);
    const yDiff = (focusCenterY - screenCenterAsWorldUnitsY);

    const translationXasScreenCoordinates = xDiff * (zoom);
    const translationYasScreenCoordinates = yDiff * (zoom);

    // translate the canvas
    this.canvas.viewportTransform[4] = viewPortTra[4] - translationXasScreenCoordinates;
    this.canvas.viewportTransform[5] = viewPortTra[5] - translationYasScreenCoordinates;
    this.canvas.requestRenderAll();
  }

  showHelp() {
    this.dialog.open(HelpDialogComponent);
  }

  getDestinationNodesFor(currentNode: any): any[] {
    const destinationNodes = [];
    Object.keys(currentNode.asSource).forEach(edgeId => {
      const edge = this.getEdge(edgeId);
      destinationNodes.push(edge.destination);
    });
    return destinationNodes;
  }

  getSourceNodesFor(currentNode: any): any[] {
    const sourceNodes = [];
    Object.keys(currentNode.asDestination).forEach(edgeId => {
      const edge = this.getEdge(edgeId);
      sourceNodes.push(edge.source);
    });
    return sourceNodes;
  }

  getAllNeighbouringNodes(currentNode: any): any[] {
    let sourceNodes = this.getSourceNodesFor(currentNode);
    let destinationNodes = this.getDestinationNodesFor(currentNode);
    let allNodes = []
    
    sourceNodes.forEach(element => {
      allNodes.push(element);
    });

    destinationNodes.forEach(element => {
      allNodes.push(element);
    });

    return allNodes;
  }

  getEdge(edgeId: string) {
    return this.edges[edgeId];
  }

  distanceToNearestGoal(queryNode: any): number {
    // iterate over all the goal nodes and return the distance that is closest to the queryNode
    let closestDistance = Number.MAX_VALUE;
    Object.keys(this.goalNodes).forEach(goalNodeId => {
        const goalNode = this.goalNodes[goalNodeId];
        const dist = goalNode.getDistanceTo(queryNode);
        if (dist < closestDistance) {
          closestDistance = dist;
        }
    });

    return closestDistance;
  }

}

@Component({
  selector: 'app-help-dialog',
  templateUrl: 'help-dialog.html'
})
export class HelpDialogComponent {
  constructor() {}
}


