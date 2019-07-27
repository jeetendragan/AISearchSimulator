import 'fabric';
import { Component, OnInit } from '@angular/core';
import { XY } from "../../Utils/XY";
import { UIElementNode, NodeType, NodeColorMapper } from "../../Utils/UIElementNode";
import { UIElementEdge } from '../../Utils/UIElementEdge';
import { Utility } from 'src/Utils/Utility';
import { IdGenerator } from 'src/Utils/IdGenerator';
import { SearchSolvers } from 'src/Utils/SearchSolvers';
import { MatSnackBar } from '@angular/material';

declare let fabric;

export enum CanvasState{
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
  public canvasElement_width : number;
  public canvasElement_height : number;
  public zoom : number;
  public algorithms : String[] = ["Breadth first", "Depth first", "A*"];
  public selectedAlgorithm : String = "";
  public nodes : any = {};
  public edges : any = {};
  public isLinkingEnabled : boolean = false;
  public isDragButtonEnabled : boolean = false;
  public activeObject : any = null;
  public tempEdge : any = null; 
  public idGenerator : IdGenerator = new IdGenerator(Number.MAX_SAFE_INTEGER);
  public startNode : any = null;
  public goalNode : any = null;
  public numbers : number[] = [];

  constructor(private snackBar: MatSnackBar) { }

  getSentence(offset, callback){
    
    this.getSentenceFragment(offset, (fragment) => {
      
      if(fragment.nextPage){
        this.getSentence(fragment.nextPage, (nextFragment) => {
          callback(fragment.data.concat(nextFragment.data));
        });
      }else{
        callback(fragment.data);
      }

    });

  }

  getSentenceFragment = (offset, callback) => {

    const pageSize = 3;
    const sentence = [...'hello world'];
    setTimeout(() => callback({
      data: sentence.slice(offset, offset + pageSize),
      nextPage: offset +
          pageSize < sentence.length ? offset + pageSize : undefined
    }), 2000);

  };

  ngOnInit() {
    this.getSentence(0, (data) => console.log(data));
  }

  ngAfterViewInit() {
    var canvasContainerElement = document.getElementById('contentMain');    
    this.canvasElement_width = canvasContainerElement.offsetWidth;
    this.canvasElement_height = canvasContainerElement.offsetHeight;

    this.canvas = new fabric.Canvas("canvasElement", {
      backgroundColor: "#566573",
      width: this.canvasElement_width,
      height: this.canvasElement_height,
      preserveObjectStacking: true
    });

    // initialize the drag to false
    this.canvas.isDragging = false;

    this.canvas.on('mouse:wheel', (opt) => {
      console.log("Wheel");
      var viewportTransform = this.canvas.viewportTransform;
      console.log("Viewport trnasform: " + viewportTransform);
      var delta = opt.e.deltaY;
      var zoom = this.canvas.getZoom();
      this.zoom = Math.round(zoom * 5) / 5;
      console.log("Zoom: " + zoom);
      zoom = zoom - delta / 2000;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      //fabricCanvas.setZoom(zoom);
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
      var oldSelection = this.activeObject;
      // Get the current selection
      this.activeObject = this.canvas.getActiveObject();

      if (this.isLinkingEnabled) {

        if (oldSelection != null && this.activeObject != null) {

          if (this.isEdge(oldSelection) || this.isEdge(this.activeObject)) {
            // if either of the objects are Edges, then we do not proceed
            this.canvas.remove(this.tempEdge);
            return;
          }

          if (oldSelection != this.activeObject) {
            console.log("Different selection");

            // remove the temporary edge
            this.canvas.remove(this.tempEdge);
            let rid = this.idGenerator.generateNew();
            
            // draw a line from the current selection to the new selection
            let edge = new UIElementEdge([oldSelection.left, oldSelection.top, this.activeObject.left, this.activeObject.top],
              {
                id: rid,
                source: oldSelection,
                destination: this.activeObject
              }
            );

            this.registerNodeInEdge(edge, oldSelection, this.activeObject);

          } else {
            console.log("Same selection");
            this.canvas.remove(this.tempEdge);
          }
        } else if (oldSelection != null && this.activeObject == null) {
          console.log("An edge was selected before, but nothing has been selected in this click");
          // remove the temp edge
          this.canvas.remove(this.tempEdge);
        }
      }


    });

    this.canvas.on('mouse:down',(opt)=>{
      // debugger
      this.canvas.mouseDown = true;
      var evt = opt.e;
      if (evt.altKey === true || this.isDragButtonEnabled) {
        console.log("Alt and down");
        this.canvas.isDragging = true;
        this.canvas.selection = false;
        this.canvas.lastPosX = evt.clientX;
        this.canvas.lastPosY = evt.clientY;
      }
    });

    this.canvas.on("mouse:move", (opt)=>{
      // debugger;
      var point = new XY(opt.e.layerX, opt.e.layerY);
      var viewportTransform = this.canvas.viewportTransform;
      // for (var i = 0; i < viewportTransform.length; i++) {
      //   viewportTransform[i] = Math.round(viewportTransform[i] * 100) / 100;
      // }
      var xDelta = this.canvas.viewportTransform[4] * -1;
      var yDelta = this.canvas.viewportTransform[5] * -1;

      point.X = (1 / viewportTransform[0]) * (point.X + xDelta);
      point.Y = (1 / viewportTransform[3]) * (point.Y + yDelta);

      if (this.canvas.isDragging) {
        var e = opt.e;
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
      let currentSelection = this.canvas.getActiveObject();
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
      var selectedElement = this.canvas.getActiveObject();
      console.log("Double click");
      if (selectedElement != null)
        return;
      
      // create a new node with default values at the location of double click
      var point = new XY(opt.e.layerX, opt.e.layerY);
      var viewportTransform = this.canvas.viewportTransform;
      var xDelta = this.canvas.viewportTransform[4] * -1;
      var yDelta = this.canvas.viewportTransform[5] * -1;

      point.X = (1 / viewportTransform[0]) * (point.X + xDelta);
      point.Y = (1 / viewportTransform[3]) * (point.Y + yDelta);

      this.createNewNodeAt(point);
    });

    document.addEventListener('keydown', (event) => {
      console.log(event.key);
      if (event.key == "Delete") {
        // Implement code to delete an edge or a node
      }

      if (event.key == "Escape" && this.isLinkingEnabled) {
        // if esacpe has been clicked and we are in the linking state
        // deactivate an object that may have been active
        this.canvas.discardActiveObject();
        this.canvas.requestRenderAll();
        this.activeObject = null;
        //remove the temp edge if there exists one
        if (this.tempEdge != null) {
          this.canvas.remove(this.tempEdge);
        }
      }
      
    });

  }

  runSimulator(){
    switch(this.selectedAlgorithm)
    {
      case this.algorithms[0]:
      {

      }
      case this.algorithms[1]:
      {
        var result = SearchSolvers.ValidateGraph(this);
        if(result.isValid){
          var res = SearchSolvers.SolveByDepthFirst(this);
          this.snackBar.open(res.message, "Okay!");
        }
        else{
          this.snackBar.open(result.message, "Got it!");
        }
      }
      case this.algorithms[2]:
      {

      }
    }
  }

  registerNodeInEdge(edge: any, oldSelection: any, currentSelection: any) {
    this.canvas.add(edge);
    this.edges[edge.id] = edge;
    //add the edge in the asSource and asDestination members of the source and destination node
    oldSelection.asSource[edge.id] = edge;
    currentSelection.asDestination[edge.id] = edge;
    this.canvas.sendToBack(edge);
  }

  isEdge(obj: any): boolean {
    if(obj == null)
      return false;

    return obj.type == "UIElementEdge";

  }

  objectKeys(object) {
    return Object.keys(object);
  }

  AddNode(){
    // Get the center of the screen (in screen coordinates)
    var screenCenter : XY = this.getScreenCenter();
    var screenCenterInCanvasSystem : XY = this.transformScreenToCanvas(screenCenter);
    // debugger;
    var boxMin = screenCenterInCanvasSystem.add(XY.BasisXY.multiply(-1*100));
    var boxMax = screenCenterInCanvasSystem.add(XY.BasisXY.multiply(100));

    // generate a random point within a box in the centre of the screen
    var newNodePos : XY = Utility.GenerateRandomPointInBox(boxMin, boxMax);
    this.createNewNodeAt(newNodePos);
  }

  transformScreenToCanvas(pointInScreenSystem: XY): XY {
    var pointInCanvasSystem : XY;

    // get transform from screen system to canvas system
    var viewportTransform = this.canvas.viewportTransform;
    var xDelta = this.canvas.viewportTransform[4] * -1;
    var yDelta = this.canvas.viewportTransform[5] * -1;

    var X = (1 / viewportTransform[0]) * (pointInScreenSystem.X + xDelta);
    var Y = (1 / viewportTransform[3]) * (pointInScreenSystem.Y + yDelta);

    pointInCanvasSystem = new XY(X, Y);

    return pointInCanvasSystem;
  }

  getScreenCenter(): XY {
    return new XY(this.canvasElement_width/2, this.canvasElement_height/2);
  }

  createNewNodeAt(point: XY) {
    let id = Object.keys(this.nodes).length+1;
    let node = new UIElementNode({
      id: id,
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

  toggleEdgeState(){
    this.isLinkingEnabled = !this.isLinkingEnabled;
  }

  togglePan(){
    // debugger;
    this.isDragButtonEnabled = !this.isDragButtonEnabled;
  }

  getNodeTypeAsString(node: any) : string{
    if(this.isNode(node)){
      var nodeType : NodeType = node.nodeType;
      switch(nodeType){
        case NodeType.Intermediate:
        {
          return "Intermediate";
        }
        case NodeType.Goal:{
          return "Goal";
        }
        case NodeType.Start:{
          return "Start";
        }
      }
    }else{
      return "OOPs, something went wrong!";
    }
  }

  isNode(node: any) {
    if(node == null)
      return false;
    
    return node.type == "UIElementNode";
  }

  isStartNode(node: any) : boolean{
    return false;
    if(!this.isNode(node))
      throw new DOMException("The object is not UIElementNode type");
    var nodeType : NodeType = node.nodeType;
    return (nodeType == NodeType.Start);
  }

  isGoalNode(node : any ) : boolean{
    if(!this.isNode(node))
      throw new DOMException("The object is not UIElementNode type");
    var nodeType : NodeType = node.nodeType;
    return (nodeType == NodeType.Goal);
  }

  isIntermediateNode(node: any) : boolean{
    if(!this.isNode(node))
      throw new DOMException("The object is not UIElementNode type");
    var nodeType : NodeType = node.nodeType;
    return (nodeType == NodeType.Intermediate);
  }

  makeStartNode(node : any){
    debugger;
    if(this.startNode != null){
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

  makeGoalNode(node : any){
    if(this.goalNode != null){
      
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

  makeIntermediateNode(node : any){
    if(this.goalNode == node){
      this.goalNode.set({
        fill : NodeColorMapper.GetIntermediateNodeColor(),
        dirty : true,
        nodeType : NodeType.Intermediate
      });
      this.goalNode = null;
    }

    if(this.startNode == node){
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
    var destinationNodes = [];
    Object.keys(currentNode.asSource).forEach(edgeId => {
      var edge = this.getEdge(edgeId);
      destinationNodes.push(edge.destination);
    });
    return destinationNodes;
  }

  getEdge(edgeId: string) {
    return this.edges[edgeId];
  }

}
