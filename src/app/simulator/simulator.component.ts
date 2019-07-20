import 'fabric';
import { Component, OnInit } from '@angular/core';
import { XY } from "../../Utils/XY";
import { UIElementNode, NodeType } from "../../utils/UIElementNode";
import { UIElementEdge } from '../../utils/UIElementEdge';

declare let fabric;

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit {

  private canvas;
  private canvasElement_width : number;
  private canvasElement_height : number;
  private zoom : number;
  private algorithms : String[] = ["Breadth first", "Depth first", "A*"];
  private selectedAlgorithm : String = "";

  constructor() { }

  ngOnInit() {
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
    });

    this.canvas.on('mouse:down',(opt)=>{
      // debugger
      this.canvas.mouseDown = true;
      var evt = opt.e;
      if (evt.altKey === true) {
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
    });

    let node = new UIElementNode({
      id:1,
      nodeType:NodeType.Start,
      left:200,
      top:200
    });
    this.canvas.add(node);

    let nodeInterm = new UIElementNode({
      id:1,
      nodeType:NodeType.Intermediate,
      left:400,
      top:200
    });
    this.canvas.add(nodeInterm);

    let nodeEnd = new UIElementNode({
      id:1,
      nodeType:NodeType.Goal,
      left:300,
      top:200
    });
    this.canvas.add(nodeEnd);

    let edge = new UIElementEdge([10,10, 100, 100],{
      id:2
    });

    this.canvas.add(edge);
    this.canvas.sendToBack(edge);
  }

}
