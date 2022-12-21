(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/simulator/help-dialog.html":
/*!**********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/simulator/help-dialog.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Help Dialog</h1>\n<div mat-dialog-content>\n    <hr>\n    <span>&#10003;</span> Create nodes by double clicking or by clicking the <mat-icon>scatter_plot</mat-icon> button.<br>\n    <span>&#10003;</span> Create edge by selecting the <mat-icon>call_made</mat-icon> button, and then selecting the nodes.\n    To unselect the start node, press ESC or click in empty space.<br>\n    <span>&#10003;</span> Define a start node and a goal node by selecting a node and choosing the option on the right.<br>\n    <span>&#10003;</span> Select an algorithm and start the simulator.<br>\n    <span>&#10003;</span> Zoom in by clicking on the <mat-icon>zoom_in</mat-icon> button or scroll down.<br>\n    <span>&#10003;</span> Zoom out by clicking on the <mat-icon>zoom_out</mat-icon> button or scroll up.<br>\n    <span>&#10003;</span> Go into the pan state by clicking <mat-icon>pan_tool</mat-icon> button and then drag the canvas OR Drag the canvas by pressing ALT key.<br>\n    <br>\n    <hr>\n\n    Note\n    <ul>\n        <li>Nodes with a white border are unvisited.</li>\n        <li>Nodes with a black border are currently in the fringe.</li>\n        <li>Nodes with a yellow border have been visited.</li>\n    </ul>\n    \n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/simulator/simulator.component.html":
/*!******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/simulator/simulator.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" class=\"contentMain\" id=\"contentMain\">\n    <div class=\"canvasWrapper\" id=\"canvasWrapper\">\n        <canvas class=\"canvasElement\" id=\"canvasElement\"></canvas>\n        <div class=\"floatingMainMenu\" fxLayout=\"column\" *ngIf=\"activeObject == null\">\n            <div fxLayout=\"row\">\n                <button mat-icon-button class=\"optionsButton\" matTooltip=\"Add node\" matTooltipPosition=\"below\" (click)=\"AddNode()\">\n                    <mat-icon>fiber_manual_record</mat-icon>\n                </button>\n                <button mat-icon-button class=\"optionsButton\" matTooltip=\"Add nodes randomly\" matTooltipPosition=\"below\" (click)=\"AddRandomNodes()\">\n                    <mat-icon>scatter_plot</mat-icon>\n                </button>\n                <button mat-icon-button (click)=\"toggleEdgeState()\" class=\"optionsButton\" matTooltip=\"Add Directed Edge\" matTooltipPosition=\"below\"\n                    [style.color]=\"isLinkingEnabled ? '#FFFFFF':'#000000'\" [style.backgroundColor]=\"isLinkingEnabled ? '#008000':'#FFFFFF'\">\n                    <mat-icon>call_made</mat-icon>\n                </button>\n                <button mat-icon-button (click)=\"toggleUndirectedEdgeState()\" class=\"optionsButton\" matTooltip=\"Add Undirected Edge\" matTooltipPosition=\"below\"\n                    [style.color]=\"isLinkingBidirectional ? '#FFFFFF':'#000000'\" [style.backgroundColor]=\"isLinkingBidirectional ? '#008000':'#FFFFFF'\">\n                    <mat-icon>sync_alt</mat-icon>\n                </button>\n                <button mat-icon-button class=\"optionsButton\" matTooltip=\"How to use the simulator?\" matTooltipPosition=\"below\"\n                    (click)=\"showHelp()\">\n                    <mat-icon>help</mat-icon>\n                </button>\n            </div>\n            <div>\n                <mat-form-field>\n                    <mat-label>Algorithm</mat-label>\n                    <mat-select [(ngModel)]=\"selectedAlgorithm\" name=\"food\">\n                        <mat-option *ngFor=\"let algorithm of algorithms\" [value]=\"algorithm\">\n                            {{algorithm}}\n                        </mat-option>\n                    </mat-select>\n                </mat-form-field>\n            </div>\n            <div>\n                <button mat-raised-button (click)=\"runSimulator()\">\n                    Run algorithm\n                    <mat-icon>play_arrow</mat-icon>\n                </button>\n            </div>\n            <div>\n                <div *ngFor=\"let n of numbers\">{{n}},</div>\n            </div>\n            <div style=\"margin-top: 35px; border-top: 1px solid grey; padding-top: 10px; color: rgb(163, 16, 16); \">\n                Made by <a href=\"http://www.the-algoschool.com\" target=\"_blank\" style=\"color:#000; text-decoration: underline;\">The AlgoSchool</a><br>\n                Like the project? Contribute on <a href=\"https://github.com/jeetendragan/AISearchSimulator\" target=\"_blank\" style=\"color:#000; text-decoration:underline;\">GitHub.</a>\n            </div>\n        </div>\n        <div class=\"floatingMainMenu\" fxLayout=\"column\" *ngIf=\"activeObject != null && activeObject.type=='UIElementNode'\">\n            <div style=\"margin-bottom: 5px;\">Node type: {{getNodeTypeAsString(activeObject)}} </div>\n            <div style=\"margin-bottom: 5px;\">\n                <button\n                    mat-raised-button \n                    style=\"background-color: #0849A2; color: white;\"\n                    (click)=\"makeStartNode(activeObject)\">\n                    Make start state\n                </button>\n            </div>\n            <div style=\"margin-bottom: 5px;\">\n                <button \n                    (click)=\"makeGoalNode(activeObject)\"\n                    mat-raised-button style=\"background-color: #08A229; color: white;\">\n                    Make goal state\n                </button>\n            </div>\n            <div style=\"margin-bottom: 5px;\">\n                <button\n                    mat-raised-button class=\"optionsButton\"\n                    (click)=\"makeIntermediateNode(activeObject)\"\n                    style=\"background-color: #FF5733; color: white\">\n                    Make intermediate state\n                </button>\n            </div>\n        </div>\n        <div class=\"floatingMainMenu\" *ngIf=\"activeObject != null && activeObject.type=='UIElementEdge'\">\n            This is an edge\n        </div>\n        <div class=\"uiUtilityMenu\" fxLayout=\"column\">\n            <div>\n                <button mat-icon-button class=\"optionsButton\" matTooltip=\"Clear all\" matTooltipPosition=\"below\"\n                    (click)=\"clearAll()\">\n                    <mat-icon>replay</mat-icon>\n                </button>\n            </div>\n            <div>\n                <button mat-icon-button class=\"optionsButton\" matTooltip=\"Zoom in\" matTooltipPosition=\"below\"\n                    (click)=\"zoomIn()\">\n                    <mat-icon>zoom_in</mat-icon>\n                </button>\n            </div>\n            <div>\n                <button mat-icon-button class=\"optionsButton\" matTooltip=\"Zoom out\" matTooltipPosition=\"below\"\n                    (click)=\"zoomOut()\">\n                    <mat-icon>zoom_out</mat-icon>\n                </button>\n            </div>\n            <div>\n                <button mat-icon-button class=\"optionsButton\" matTooltip=\"Fit to screen\" matTooltipPosition=\"below\"\n                    (click)=\"groupFocus()\">\n                    <mat-icon>center_focus_strong</mat-icon>\n                </button>\n            </div>\n            <div>\n                <button mat-icon-button class=\"optionsButton\" matTooltip=\"Pan\" matTooltipPosition=\"below\" \n                    (click)=\"togglePan()\" [style.color]=\" isDragButtonEnabled ? 'black':'lightgrey'\">\n                    <mat-icon>pan_tool</mat-icon>\n                </button>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/Utils/BestFitSolver.ts":
/*!************************************!*\
  !*** ./src/Utils/BestFitSolver.ts ***!
  \************************************/
/*! exports provided: BestFitSolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BestFitSolver", function() { return BestFitSolver; });
/* harmony import */ var _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NodeStateInSearch */ "./src/Utils/NodeStateInSearch.ts");
/* harmony import */ var _Solution__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Solution */ "./src/Utils/Solution.ts");
/* harmony import */ var _NodeStateInSearchColorMapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NodeStateInSearchColorMapper */ "./src/Utils/NodeStateInSearchColorMapper.ts");
/* harmony import */ var _PriorityQueue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PriorityQueue */ "./src/Utils/PriorityQueue.ts");
/* harmony import */ var _UIElementNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UIElementNode */ "./src/Utils/UIElementNode.ts");





class BestFitSolver {
    static Prepare(simulatorInstance) {
        Object.keys(simulatorInstance.nodes).forEach(nodeid => {
            const node = simulatorInstance.nodes[nodeid];
            // holds only the path cost
            node.pathCost = Number.MAX_VALUE;
            // initialize the current cost to max(therotically, infinity)
            // this value can be the pathCost + heuristic(in case of A*) OR
            // this value can a heurestic only(in greedy-best-fit)
            node.cost = Number.MAX_VALUE;
            // initialize the parent to null
            node.parent = null;
            // Mark if a node is visited
            node.stateInSearch = _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_0__["NodeStateInSearch"].NOT_VISITED;
            // visit order
            node.visitOrder = '';
        });
    }
    static Solve(simulatorComponent, weighDistanceToSource) {
        // if weighDistanceToSource is true, then the algorithm is A*, else it is greedy best-first
        // TODO: Generalize code for this prep step
        BestFitSolver.Prepare(simulatorComponent);
        let visitOrder = 1;
        debugger;
        simulatorComponent.startNode.pathCost = 0; // the cost of the start node to itself will be zero
        simulatorComponent.startNode.cost = simulatorComponent.distanceToNearestGoal(simulatorComponent.startNode);
        simulatorComponent.startNode.stateInSearch = _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_0__["NodeStateInSearch"].CURRENT; // mark the startNode as current-i.e. it is being visited right now, and
        simulatorComponent.startNode.visitOrder = visitOrder;
        // that some or all of its children are yet to be expanded
        // For visual representation set the color as well
        simulatorComponent.startNode.set({
            stroke: _NodeStateInSearchColorMapper__WEBPACK_IMPORTED_MODULE_2__["NodeStateInSearchColorMapper"].GetColorForCurrentNode(),
            dirty: true
        });
        let queue;
        const compareNodes = function (nodeA, nodeB) {
            return nodeA.cost - nodeB.cost;
        };
        // use a priority queue if a uniform cost search is being used
        queue = new _PriorityQueue__WEBPACK_IMPORTED_MODULE_3__["PriorityQueue"]({ comparator: compareNodes });
        queue.enqueue(simulatorComponent.startNode);
        while (!queue.isEmpty()) {
            const currentNode = queue.dequeue();
            const nodeType = currentNode.nodeType;
            if (nodeType === _UIElementNode__WEBPACK_IMPORTED_MODULE_4__["NodeType"].Goal) {
                // create a solution object and tranverse through all the parents of the GOAL NODE
                const sol = new _Solution__WEBPACK_IMPORTED_MODULE_1__["Solution"](currentNode.pathCost);
                let tempNode = currentNode;
                while (tempNode != null) {
                    sol.addNodeToPath(tempNode);
                    // find the edge connecting tempNode and tempNode.parent
                    if (tempNode.parent != null) {
                        const edgeConnectingParent = tempNode.getEdgeConnectingNode(tempNode.parent);
                        sol.addEdgeToPath(edgeConnectingParent);
                    }
                    tempNode = tempNode.parent;
                }
                return sol;
            }
            // const edges = currentNode.asSource; // Get all the edges in which the node is a source
            // const edgeIds = Object.keys(edges);
            // Get all the neighbouring nodes
            let neighbourData = currentNode.getAllNeighbouringNodesWithCost();
            let neighbours = neighbourData['neighbours'];
            let costs = neighbourData['costs'];
            for (var i = 0; i < neighbours.length; i++) {
                // const edge = edges[edgeId];
                const nextNode = neighbours[i];
                const cost = costs[i];
                if (nextNode.stateInSearch === _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_0__["NodeStateInSearch"].NOT_VISITED) {
                    nextNode.pathCost = currentNode.pathCost + cost;
                    if (weighDistanceToSource) {
                        // for A*, the cost will be the path cost + the heurestic estimate from nextNode to the closest goal
                        nextNode.cost = nextNode.pathCost + simulatorComponent.distanceToNearestGoal(nextNode);
                    }
                    else {
                        // for greedy-best fit, the cost will be the heurestic estimate from the nextNode to the closest goal only
                        nextNode.cost = simulatorComponent.distanceToNearestGoal(nextNode);
                    }
                    // set the parent of the nextNode
                    nextNode.parent = currentNode;
                    // set the state of the nextNode to seen or current
                    nextNode.stateInSearch = _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_0__["NodeStateInSearch"].CURRENT;
                    nextNode.set({
                        stroke: _NodeStateInSearchColorMapper__WEBPACK_IMPORTED_MODULE_2__["NodeStateInSearchColorMapper"].GetColorForCurrentNode(),
                        dirty: true
                    });
                    // enque the node for expansion
                    queue.enqueue(nextNode);
                }
            }
            // after all the nodes of the current node are expanded, we set the current state to visited
            currentNode.stateInSearch = _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_0__["NodeStateInSearch"].VISITED;
            currentNode.set({
                stroke: _NodeStateInSearchColorMapper__WEBPACK_IMPORTED_MODULE_2__["NodeStateInSearchColorMapper"].GetColorForVisitedNode(),
                dirty: true
            });
            currentNode.visitOrder = visitOrder++;
        }
        // if the queue is empty and a solution is not found till now, then there is no
        // solution to the problem
        return new _Solution__WEBPACK_IMPORTED_MODULE_1__["Solution"](Number.MAX_VALUE);
    }
}


/***/ }),

/***/ "./src/Utils/BinaryHeapStrategy.ts":
/*!*****************************************!*\
  !*** ./src/Utils/BinaryHeapStrategy.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BinaryHeapStrategy; });
class BinaryHeapStrategy {
    constructor(options) {
        this.comparator = options.comparator;
        this.data = options.initialValues ? options.initialValues.slice(0) : [];
        this._heapify();
    }
    _heapify() {
        if (this.data.length > 0) {
            for (let i = 0; i < this.data.length; i++) {
                this._bubbleUp(i);
            }
        }
    }
    enqueue(value) {
        this.data.push(value);
        this._bubbleUp(this.data.length - 1);
    }
    dequeue() {
        const ret = this.data[0];
        const last = this.data.pop();
        if (this.data.length > 0 && last !== undefined) {
            this.data[0] = last;
            this._bubbleDown(0);
        }
        return ret;
    }
    peek() {
        return this.data[0];
    }
    clear() {
        this.data.length = 0;
    }
    _bubbleUp(pos) {
        while (pos > 0) {
            // tslint:disable-next-line: no-bitwise
            const parent = (pos - 1) >>> 1;
            if (this.comparator(this.data[pos], this.data[parent]) < 0) {
                const x = this.data[parent];
                this.data[parent] = this.data[pos];
                this.data[pos] = x;
                pos = parent;
            }
            else {
                break;
            }
        }
    }
    _bubbleDown(pos) {
        const last = this.data.length - 1;
        while (true) {
            // tslint:disable-next-line: no-bitwise
            const left = (pos << 1) + 1;
            const right = left + 1;
            let minIndex = pos;
            if (left <= last && this.comparator(this.data[left], this.data[minIndex]) < 0) {
                minIndex = left;
            }
            if (right <= last && this.comparator(this.data[right], this.data[minIndex]) < 0) {
                minIndex = right;
            }
            if (minIndex !== pos) {
                const x = this.data[minIndex];
                this.data[minIndex] = this.data[pos];
                this.data[pos] = x;
                pos = minIndex;
            }
            else {
                break;
            }
        }
        return void 0;
    }
    refreshQueueOrder() {
        this._heapify();
    }
}
BinaryHeapStrategy.ctorParameters = () => [
    { type: undefined }
];


/***/ }),

/***/ "./src/Utils/BipartiteChecker.ts":
/*!***************************************!*\
  !*** ./src/Utils/BipartiteChecker.ts ***!
  \***************************************/
/*! exports provided: BipartiteChecker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BipartiteChecker", function() { return BipartiteChecker; });
/* harmony import */ var _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NodeStateInSearch */ "./src/Utils/NodeStateInSearch.ts");
/* harmony import */ var _Queue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Queue */ "./src/Utils/Queue.ts");
/* harmony import */ var _UIElementNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UIElementNode */ "./src/Utils/UIElementNode.ts");



class BipartiteChecker {
    // This function does the following
    // 1) Checks if the graph is bipartite or not
    // 2) Colors the nodes using two colors
    // 3) Arranges the parts by row
    static SolveBipartiteProblem(simulatorInstance) {
        let biPartiteState = BipartiteChecker.GetParts(simulatorInstance);
        console.log(biPartiteState);
        if (biPartiteState == null) {
            let result = { message: 'The graph is not bipartite' };
            return result;
        }
        else {
            BipartiteChecker.ColorNodesByParts(simulatorInstance, biPartiteState);
            return { message: "The graph is Bipartite. Two parts have been colored." };
        }
    }
    static ColorNodesByParts(simulatorInstance, parts) {
        debugger;
        let part0 = parts[0];
        let part1 = parts[1];
        for (var key in part0) {
            if (part0.hasOwnProperty(key)) {
                part0[key].set({
                    fill: '#008000',
                    dirty: true
                });
            }
        }
        for (var key in part1) {
            if (part1.hasOwnProperty(key)) {
                part1[key].set({
                    fill: '#808080',
                    dirty: true
                });
            }
        }
        simulatorInstance.canvas.requestRenderAll();
    }
    static GetParts(simulatorInstance) {
        Object.keys(simulatorInstance.nodes).forEach(nodeid => {
            const node = simulatorInstance.nodes[nodeid];
            // Mark the node as unvisited
            node.stateInSearch = _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_0__["NodeStateInSearch"].NOT_VISITED;
            node.set({
                fill: _UIElementNode__WEBPACK_IMPORTED_MODULE_2__["NodeColorMapper"].GetIntermediateNodeColor(),
                dirty: true
            });
        });
        simulatorInstance.canvas.requestRenderAll();
        let queue;
        queue = new _Queue__WEBPACK_IMPORTED_MODULE_1__["Queue"]();
        let part0 = {};
        let part1 = {};
        let nodes = simulatorInstance.nodes;
        const nodeIds = Object.keys(nodes);
        // Add any node to the queue
        queue.enqueue(nodes[nodeIds[0]]);
        // Assign this node to part0
        part0[nodeIds[0]] = nodes[nodeIds[0]];
        var colorForNeighbours = 0;
        while (!queue.isEmpty()) {
            // pop the topNode
            debugger;
            let topNode = queue.dequeue();
            var isInPart0 = topNode['id'] in part0;
            var isInPart1 = topNode['id'] in part1;
            if (isInPart0) {
                colorForNeighbours = 1;
            }
            else {
                // has to be in part1, i.e has to be in either of the two
                colorForNeighbours = 0;
            }
            var neighbouringNodes = topNode.getAllNeighbouringNodes();
            for (let i = 0; i < neighbouringNodes.length; i++) {
                let adjNode = neighbouringNodes[i];
                // Check if the adjNode is visited
                var isAdjInPart0 = adjNode['id'] in part0;
                var isAdjInPart1 = adjNode['id'] in part1;
                if (!isAdjInPart0 && !isAdjInPart1) {
                    // adjNode has not been seen as yet
                    if (colorForNeighbours == 0) {
                        part0[adjNode.id] = adjNode;
                    }
                    else {
                        part1[adjNode.id] = adjNode;
                    }
                    queue.enqueue(adjNode);
                }
                else if (adjNode['id'] in part0) {
                    if (colorForNeighbours == 0) {
                        continue;
                    }
                    else {
                        return null;
                    }
                }
                else if (adjNode['id'] in part1) {
                    if (colorForNeighbours == 1) {
                        continue;
                    }
                    else {
                        return null;
                    }
                }
                else {
                    // this will never happen
                    // a node will either be in part0 or part1
                }
            }
        }
        let result = [];
        result.push(part0);
        result.push(part1);
        console.log("Part 0:");
        console.log(part0);
        console.log("Part 1");
        console.log(part1);
        debugger;
        return result;
    }
}


/***/ }),

/***/ "./src/Utils/BreadthFirstSolver.ts":
/*!*****************************************!*\
  !*** ./src/Utils/BreadthFirstSolver.ts ***!
  \*****************************************/
/*! exports provided: BreadthFirstSolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreadthFirstSolver", function() { return BreadthFirstSolver; });
/* harmony import */ var _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NodeStateInSearch */ "./src/Utils/NodeStateInSearch.ts");
/* harmony import */ var _Queue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Queue */ "./src/Utils/Queue.ts");
/* harmony import */ var _UIElementNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UIElementNode */ "./src/Utils/UIElementNode.ts");
/* harmony import */ var _NodeStateInSearchColorMapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NodeStateInSearchColorMapper */ "./src/Utils/NodeStateInSearchColorMapper.ts");
/* harmony import */ var _Solution__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Solution */ "./src/Utils/Solution.ts");





class BreadthFirstSolver {
    static Prepare(simulatorInstance) {
        Object.keys(simulatorInstance.nodes).forEach(nodeid => {
            const node = simulatorInstance.nodes[nodeid];
            // initialize the current cost to max(therotically, infinity)
            node.cost = Number.MAX_VALUE;
            // initialize the parent to null
            node.parent = null;
            // Mark if a node is visited
            node.stateInSearch = _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_0__["NodeStateInSearch"].NOT_VISITED;
            node.visitOrder = '';
        });
    }
    static Solve(simulatorComponent) {
        BreadthFirstSolver.Prepare(simulatorComponent);
        let visitOrder = 1;
        simulatorComponent.startNode.cost = 0; // the cost of the start node to itself will be zero
        simulatorComponent.startNode.stateInSearch = _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_0__["NodeStateInSearch"].CURRENT; // mark the startNode as current-i.e. it is being visited right now, and
        // that some or all of its children are yet to be expanded
        simulatorComponent.startNode.visitOrder = visitOrder;
        // For visual representation set the color as well
        simulatorComponent.startNode.set({
            stroke: _NodeStateInSearchColorMapper__WEBPACK_IMPORTED_MODULE_3__["NodeStateInSearchColorMapper"].GetColorForCurrentNode(),
            dirty: true
        });
        let queue;
        queue = new _Queue__WEBPACK_IMPORTED_MODULE_1__["Queue"](); // use a normal queue if normal BFS is to be used
        queue.enqueue(simulatorComponent.startNode);
        while (!queue.isEmpty()) {
            const currentNode = queue.dequeue();
            const nodeType = currentNode.nodeType;
            if (nodeType === _UIElementNode__WEBPACK_IMPORTED_MODULE_2__["NodeType"].Goal) {
                // create a solution object and tranverse through all the parents of the GOAL NODE
                const sol = new _Solution__WEBPACK_IMPORTED_MODULE_4__["Solution"](currentNode.cost);
                let tempNode = currentNode;
                while (tempNode != null) {
                    sol.addNodeToPath(tempNode);
                    // find the edge connecting tempNode and tempNode.parent
                    if (tempNode.parent != null) {
                        const edgeConnectingParent = tempNode.getEdgeConnectingNode(tempNode.parent);
                        sol.addEdgeToPath(edgeConnectingParent);
                    }
                    tempNode = tempNode.parent;
                }
                return sol;
            }
            // Get all the neighbouring nodes
            let neighbours = currentNode.getAllNeighbouringNodes();
            // const edges = currentNode.asSource; // Get all the edges in which the node is a source
            // const edgeIds = Object.keys(edges);
            for (const nextNode of neighbours) {
                // const edge = edges[edgeId];
                //const nextNode = edge.destination;
                if (nextNode.stateInSearch === _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_0__["NodeStateInSearch"].NOT_VISITED) {
                    // as the nextNode is one step away from the currentNode, just add 1 to the currentNode's path cost from source
                    nextNode.cost = currentNode.cost + 1;
                    // set the parent of the nextNode
                    nextNode.parent = currentNode;
                    // set the state of the nextNode to seen or current
                    nextNode.stateInSearch = _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_0__["NodeStateInSearch"].CURRENT;
                    nextNode.set({
                        stroke: _NodeStateInSearchColorMapper__WEBPACK_IMPORTED_MODULE_3__["NodeStateInSearchColorMapper"].GetColorForCurrentNode(),
                        dirty: true
                    });
                    // enque the node for expansion
                    queue.enqueue(nextNode);
                }
            }
            // after all the nodes of the current node are expanded, we set the current state to visited
            currentNode.stateInSearch = _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_0__["NodeStateInSearch"].VISITED;
            currentNode.set({
                stroke: _NodeStateInSearchColorMapper__WEBPACK_IMPORTED_MODULE_3__["NodeStateInSearchColorMapper"].GetColorForVisitedNode(),
                dirty: true
            });
            currentNode.visitOrder = visitOrder++;
        }
        // if the queue is empty and a solution is not found till now, then there is no
        // solution to the problem
        return new _Solution__WEBPACK_IMPORTED_MODULE_4__["Solution"](Number.MAX_VALUE);
    }
}


/***/ }),

/***/ "./src/Utils/ConvexHull.ts":
/*!*********************************!*\
  !*** ./src/Utils/ConvexHull.ts ***!
  \*********************************/
/*! exports provided: ConvexHull */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConvexHull", function() { return ConvexHull; });
/* harmony import */ var _XY__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./XY */ "./src/Utils/XY.ts");
/* harmony import */ var _UIElementEdge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UIElementEdge */ "./src/Utils/UIElementEdge.ts");


class ConvexHull {
    static Find(simulatorInstance) {
        debugger;
        simulatorInstance.deleteAllEdges();
        let nodeIds = Object.keys(simulatorInstance.nodes);
        let nodes = [];
        let leftMostPoint = null;
        let leftX = Number.MAX_VALUE;
        // find the left-most point
        for (var i = 0; i < nodeIds.length; i++) {
            nodes.push(simulatorInstance.nodes[nodeIds[i]]);
            if (nodes[i].left < leftX) {
                leftMostPoint = nodes[i];
                leftX = nodes[i].left;
            }
        }
        if (leftMostPoint == null) {
            return { 'message': 'Something went wrong!' };
        }
        let hull = [];
        let start = leftMostPoint;
        hull.push(start);
        let current = start;
        let nextPoint = null;
        do {
            nextPoint = this.getNextPoint(current, simulatorInstance.nodes);
            hull.push(nextPoint);
            current = nextPoint;
        } while (nextPoint.id != start.id);
        hull.push(start);
        for (var i = 0; i < hull.length - 1; i++) {
            const edge = new _UIElementEdge__WEBPACK_IMPORTED_MODULE_1__["UIElementEdge"]([hull[i].left, hull[i].top, hull[i + 1].left, hull[i + 1].top], {
                id: simulatorInstance.idGenerator.generateNew(),
                source: hull[i],
                destination: hull[i + 1],
                isUndirected: true
            });
            simulatorInstance.registerNodeInEdge(edge, hull[i], hull[i + 1], true);
        }
        simulatorInstance.canvas.requestRenderAll();
        return {
            'message': 'Convex-hull found!'
        };
    }
    static getNextPoint(current, nodesSet) {
        delete nodesSet[current.id];
        let nodeIds = Object.keys(nodesSet);
        let nextNode = nodesSet[nodeIds[0]];
        let currVect = new _XY__WEBPACK_IMPORTED_MODULE_0__["XY"](nextNode.left - current.left, nextNode.top - current.top);
        for (var i = 1; i < nodeIds.length; i++) {
            let newCand = nodesSet[nodeIds[i]];
            let newVect = new _XY__WEBPACK_IMPORTED_MODULE_0__["XY"](newCand.left - current.left, newCand.top - current.top);
            let cp = currVect.crossProduct(newVect);
            if (cp > 0) {
                nextNode = newCand;
                currVect = newVect;
            }
        }
        nodesSet[current.id] = current;
        return nextNode;
    }
}


/***/ }),

/***/ "./src/Utils/DepthFirstSolver.ts":
/*!***************************************!*\
  !*** ./src/Utils/DepthFirstSolver.ts ***!
  \***************************************/
/*! exports provided: DepthFirstSolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepthFirstSolver", function() { return DepthFirstSolver; });
/* harmony import */ var _NodeStateInSearchColorMapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NodeStateInSearchColorMapper */ "./src/Utils/NodeStateInSearchColorMapper.ts");

class DepthFirstSolver {
    static Solve(simulatorInstance, currentState, bestState, solveOptimally) {
        const currentNode = currentState.currentNode;
        // mark the current node as visited
        currentNode.set({
            stroke: _NodeStateInSearchColorMapper__WEBPACK_IMPORTED_MODULE_0__["NodeStateInSearchColorMapper"].GetColorForVisitedNode(),
            dirty: true
        });
        simulatorInstance.canvas.requestRenderAll();
        if (currentState.reachedGoalState()) {
            if (solveOptimally) {
                if (currentState.cost < bestState.cost) {
                    bestState.applyState(currentState);
                    return {
                        continueSearch: true,
                        solutionFound: true,
                        message: 'Solution found with a path cost of :' + currentState.cost
                    };
                }
                else {
                    return {
                        continueSearch: true,
                        solutionFound: true,
                        message: 'Better solution exists with a path cost of :' + bestState.cost
                    };
                }
            }
            else {
                bestState.applyState(currentState);
                return {
                    continueSearch: false,
                    solutionFound: true,
                    message: 'Solution found with a path cost of :' + currentState.cost
                };
            }
        }
        // const connectedEdges = currentState.getNextEdges();
        // const connectedEdgeIds = Object.keys(connectedEdges);
        let neighbourData = currentNode.getAllNeighbourData();
        let neighbours = neighbourData['neighbours'];
        let costs = neighbourData['costs'];
        let edges = neighbourData['edges'];
        for (var i = 0; i < neighbours.length; i++) {
            // const nextEdge = connectedEdges[edgeId];
            const nextNode = neighbours[i];
            const edgeCost = costs[i];
            const nextEdge = edges[i];
            if (currentState.isNodeConsideredInPath(nextNode)) {
                continue; // do not consider a node that has already been considered to avoid infinite loops
            }
            // forward track
            currentState.setCurrentNode(nextNode);
            currentState.addNodeToPath(nextNode);
            currentState.addEdgeToPath(nextEdge);
            currentState.addCost(edgeCost);
            const result = this.Solve(simulatorInstance, currentState, bestState, solveOptimally);
            // backtrack
            currentState.setCurrentNode(currentNode);
            currentState.removeNodeFromPath(nextNode);
            currentState.removeEdgeFromPath(nextEdge);
            currentState.deductCost(edgeCost);
            if (!result.continueSearch) {
                // if in any one of the child node expansion, continueSearch is set to false, further child exploration should be stopped.
                return result;
            }
        }
        // executed when all the children have been expanded.
        // if a solution has been found till now, then information related to that will be returned.
        // we need to always set continueSearch to true because the execution will come here only when we are running in 
        // optimal = true setting and in that case we need to continue search even we have found a solution
        return {
            continueSearch: true,
            solutionFound: bestState.isSolutionFound(),
            message: bestState.isSolutionFound() ? 'Best solution till now found with a cost of ' + bestState.cost : 'Best solution not found till now'
        };
    }
}


/***/ }),

/***/ "./src/Utils/GeneralAlgorithms.ts":
/*!****************************************!*\
  !*** ./src/Utils/GeneralAlgorithms.ts ***!
  \****************************************/
/*! exports provided: GeneralAlgorithms */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeneralAlgorithms", function() { return GeneralAlgorithms; });
/* harmony import */ var _BipartiteChecker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BipartiteChecker */ "./src/Utils/BipartiteChecker.ts");

class GeneralAlgorithms {
    /*
    This function is used to order the graph topologically
    */
    static TopologicalSorting(simulatorInstance) {
    }
    /*
    This function is used to check if a graph is bipartite or not
    */
    static CheckIfBipartite(simulatorInstance) {
        return _BipartiteChecker__WEBPACK_IMPORTED_MODULE_0__["BipartiteChecker"].SolveBipartiteProblem(simulatorInstance);
    }
}


/***/ }),

/***/ "./src/Utils/GraphBridges.ts":
/*!***********************************!*\
  !*** ./src/Utils/GraphBridges.ts ***!
  \***********************************/
/*! exports provided: GraphBridges */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphBridges", function() { return GraphBridges; });
/* harmony import */ var _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NodeStateInSearch */ "./src/Utils/NodeStateInSearch.ts");
/* harmony import */ var _SearchSolvers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SearchSolvers */ "./src/Utils/SearchSolvers.ts");


class GraphBridges {
    static Prepare(simulatorInstance) {
        Object.keys(simulatorInstance.nodes).forEach(nodeid => {
            const node = simulatorInstance.nodes[nodeid];
            // initialize the parent to null
            node.parent = null;
            // Mark if a node is visited
            node.stateInSearch = _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_0__["NodeStateInSearch"].NOT_VISITED;
            node.level = 0;
        });
    }
    static Identify(simulatorComponent) {
        GraphBridges.Prepare(simulatorComponent);
        _SearchSolvers__WEBPACK_IMPORTED_MODULE_1__["SearchSolvers"].PrepareForSearch(simulatorComponent);
        let allBridges = [];
        let nodeList = [];
        const nodeIds = Object.keys(simulatorComponent.nodes);
        for (const nodeId of nodeIds) {
            const node = simulatorComponent.nodes[nodeId];
            nodeList.push(node);
        }
        debugger;
        nodeList.forEach(node => {
            if (node.stateInSearch == _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_0__["NodeStateInSearch"].NOT_VISITED) {
                node.level = 0;
                let bridges = [];
                GraphBridges.subTreeIdenfity(simulatorComponent, node, bridges);
                bridges.forEach(bridge => {
                    allBridges.push(bridge);
                });
            }
        });
        let result = {};
        if (allBridges.length == 0) {
            result['message'] = 'There are no bridges in the graph!';
        }
        else {
            // mark bridges in the graph
            allBridges.forEach(bridge => {
                bridge.set({
                    stroke: '#00FF00',
                    dirty: true
                });
            });
            simulatorComponent.canvas.requestRenderAll();
            result['message'] = "Bridges have been colored in the graph!";
        }
        return result;
    }
    static subTreeIdenfity(simulatorComponent, node, bridges) {
        node.stateInSearch = _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_0__["NodeStateInSearch"].VISITED;
        node.H = Number.MAX_VALUE;
        let neighbourData = node.getAllNeighbourData();
        let neighbours = neighbourData['neighbours'];
        let edges = neighbourData['edges'];
        for (var i = 0; i < neighbours.length; i++) {
            let u = neighbours[i];
            if (u.stateInSearch == _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_0__["NodeStateInSearch"].NOT_VISITED) {
                u.level = node.level + 1;
                GraphBridges.subTreeIdenfity(simulatorComponent, u, bridges);
                if (u.H >= u.level) {
                    bridges.push(edges[i]);
                }
                if (u.H < node.H) {
                    node.H = u.H;
                }
            }
            else if (u.level < node.level - 1) {
                if (u.level < node.H) {
                    node.H = u.level;
                }
            }
        }
    }
}


/***/ }),

/***/ "./src/Utils/IdGenerator.ts":
/*!**********************************!*\
  !*** ./src/Utils/IdGenerator.ts ***!
  \**********************************/
/*! exports provided: IdGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdGenerator", function() { return IdGenerator; });
/* harmony import */ var _Utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility */ "./src/Utils/Utility.ts");

class IdGenerator {
    constructor(largestNumber) {
        this.largestNumber = largestNumber;
        this.idsGenerated = {};
    }
    generateNew() {
        var id;
        do {
            id = _Utility__WEBPACK_IMPORTED_MODULE_0__["Utility"].GenerateRandomNumberBetween(0, this.largestNumber);
        } while (this.idsGenerated[id] != null);
        return id;
    }
}
IdGenerator.ctorParameters = () => [
    { type: Number }
];


/***/ }),

/***/ "./src/Utils/NodeStateInSearch.ts":
/*!****************************************!*\
  !*** ./src/Utils/NodeStateInSearch.ts ***!
  \****************************************/
/*! exports provided: NodeStateInSearch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeStateInSearch", function() { return NodeStateInSearch; });
var NodeStateInSearch;
(function (NodeStateInSearch) {
    NodeStateInSearch["VISITED"] = "VISITED";
    NodeStateInSearch["CURRENT"] = "CURRENT";
    NodeStateInSearch["NOT_VISITED"] = "NOT_VISITED";
})(NodeStateInSearch || (NodeStateInSearch = {}));


/***/ }),

/***/ "./src/Utils/NodeStateInSearchColorMapper.ts":
/*!***************************************************!*\
  !*** ./src/Utils/NodeStateInSearchColorMapper.ts ***!
  \***************************************************/
/*! exports provided: NodeStateInSearchColorMapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeStateInSearchColorMapper", function() { return NodeStateInSearchColorMapper; });
class NodeStateInSearchColorMapper {
    static GetColorForCurrentNode() {
        return this.COLOR_MAP['CURRENT'];
    }
    static GetColorForVisitedNode() {
        return this.COLOR_MAP['VISITED'];
    }
    static GetColorForNotVisitedNode() {
        return this.COLOR_MAP['NOT_VISITED'];
    }
}
NodeStateInSearchColorMapper.COLOR_MAP = {
    "CURRENT": "#000",
    "VISITED": "#F7F701",
    "NOT_VISITED": "#FFF"
};


/***/ }),

/***/ "./src/Utils/PriorityQueue.ts":
/*!************************************!*\
  !*** ./src/Utils/PriorityQueue.ts ***!
  \************************************/
/*! exports provided: PriorityQueue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PriorityQueue", function() { return PriorityQueue; });
/* harmony import */ var _BinaryHeapStrategy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BinaryHeapStrategy */ "./src/Utils/BinaryHeapStrategy.ts");

class PriorityQueue {
    constructor(options) {
        this.len = 0;
        this.len = options.initialValues ? options.initialValues.length : 0;
        this.strategy = new _BinaryHeapStrategy__WEBPACK_IMPORTED_MODULE_0__["default"](options);
    }
    get length() { return this.len; }
    enqueue(value) {
        this.len++;
        this.strategy.enqueue(value);
    }
    dequeue() {
        if (!this.len) {
            throw new Error('Empty queue');
        }
        this.len--;
        return this.strategy.dequeue();
    }
    peek() {
        if (!this.len) {
            throw new Error('Empty queue');
        }
        return this.strategy.peek();
    }
    clear() {
        this.len = 0;
        this.strategy.clear();
    }
    isEmpty() {
        return this.len === 0;
    }
    heapify() {
        this.strategy.refreshQueueOrder();
    }
}
PriorityQueue.ctorParameters = () => [
    { type: undefined }
];


/***/ }),

/***/ "./src/Utils/Queue.ts":
/*!****************************!*\
  !*** ./src/Utils/Queue.ts ***!
  \****************************/
/*! exports provided: Queue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Queue", function() { return Queue; });
class Queue {
    constructor(queue) {
        this.queue = queue || [];
    }
    enqueue(item) {
        this.queue.push(item);
    }
    dequeue() {
        return this.queue.shift();
    }
    peek() {
        return this.queue[0];
    }
    clear() {
        this.queue = [];
    }
    count() {
        return this.queue.length;
    }
    isEmpty() {
        return (this.count() === 0);
    }
}
Queue.ctorParameters = () => [
    { type: Array }
];


/***/ }),

/***/ "./src/Utils/SearchSolvers.ts":
/*!************************************!*\
  !*** ./src/Utils/SearchSolvers.ts ***!
  \************************************/
/*! exports provided: SearchSolvers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchSolvers", function() { return SearchSolvers; });
/* harmony import */ var _BestFitSolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BestFitSolver */ "./src/Utils/BestFitSolver.ts");
/* harmony import */ var _BreadthFirstSolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BreadthFirstSolver */ "./src/Utils/BreadthFirstSolver.ts");
/* harmony import */ var _DepthFirstSolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DepthFirstSolver */ "./src/Utils/DepthFirstSolver.ts");
/* harmony import */ var _NodeStateInSearchColorMapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NodeStateInSearchColorMapper */ "./src/Utils/NodeStateInSearchColorMapper.ts");
/* harmony import */ var _Solution__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Solution */ "./src/Utils/Solution.ts");
/* harmony import */ var _UniformCostSolver__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./UniformCostSolver */ "./src/Utils/UniformCostSolver.ts");






class SearchSolvers {
    static ValidateGraph(simulatorInstance) {
        let result = {
            isValid: false,
            message: ''
        };
        debugger;
        if (Object.keys(simulatorInstance.nodes).length === 0) {
            result.isValid = false;
            result.message = 'Please add some nodes to the graph';
            return result;
        }
        if (simulatorInstance.startNode != null && Object.keys(simulatorInstance.goalNodes).length !== 0) {
            result.isValid = true;
            result.message = '';
        }
        else if (simulatorInstance.startNode != null && Object.keys(simulatorInstance.goalNodes).length === 0) {
            result.isValid = false;
            result.message = 'Graph not valid: Graph should have at least one goal node';
        }
        else if (simulatorInstance.startNode == null && Object.keys(simulatorInstance.goalNodes).length !== 0) {
            result.isValid = false;
            result.message = 'Graph not valid: Start node is not defined';
        }
        else {
            result.isValid = false;
            result.message = 'Graph not valid: Start, End nodes are not defined';
        }
        return result;
    }
    static SolveByBreadthFirst(simulatorComponent) {
        SearchSolvers.PrepareForSearch(simulatorComponent);
        let solution;
        solution = _BreadthFirstSolver__WEBPACK_IMPORTED_MODULE_1__["BreadthFirstSolver"].Solve(simulatorComponent);
        const solFound = solution.isSolutionFound();
        const result = {
            solutionFound: solFound,
            message: solFound ? 'Solution found with a cost of: ' + solution.cost : 'Could not find the solution'
        };
        const nodeList = solution.getNodeListInPath();
        nodeList.forEach(node => {
            node.set({
                stroke: '#00FF00',
                dirty: true
            });
        });
        const edgeList = solution.getEdgeListInPath();
        edgeList.forEach(edge => {
            edge.set({
                stroke: '#00FF00',
                dirty: true
            });
        });
        simulatorComponent.canvas.requestRenderAll();
        return result;
    }
    static SolveByDepthFirst(simulatorInstance, solveOptimally) {
        let result = {
            solutionFound: false,
            message: ''
        };
        SearchSolvers.PrepareForSearch(simulatorInstance);
        let currentSolution = new _Solution__WEBPACK_IMPORTED_MODULE_4__["Solution"](0);
        currentSolution.setCurrentNode(simulatorInstance.startNode);
        currentSolution.addNodeToPath(simulatorInstance.startNode);
        let bestSolution = new _Solution__WEBPACK_IMPORTED_MODULE_4__["Solution"](Number.MAX_VALUE);
        _DepthFirstSolver__WEBPACK_IMPORTED_MODULE_2__["DepthFirstSolver"].Solve(simulatorInstance, currentSolution, bestSolution, solveOptimally);
        const edges = bestSolution.getEdgeListInPath();
        const nodes = bestSolution.getNodeListInPath();
        if (edges.length == 0) {
            result.solutionFound = false;
            result.message = 'Could not find the solution';
            return result;
        }
        result.solutionFound = true;
        result.message = 'Best solution found with path cost: ' + bestSolution.cost;
        nodes.forEach(node => {
            node.set({
                stroke: '#00FF00',
                dirty: true
            });
        });
        edges.forEach(edge => {
            edge.set({
                stroke: '#00FF00',
                dirty: true
            });
        });
        simulatorInstance.canvas.requestRenderAll();
        return result;
    }
    static SolveByBestFit(simulatorComponent, isAStarSearch) {
        SearchSolvers.PrepareForSearch(simulatorComponent);
        let solution;
        if (isAStarSearch) {
            solution = _BestFitSolver__WEBPACK_IMPORTED_MODULE_0__["BestFitSolver"].Solve(simulatorComponent, true);
        }
        else {
            solution = _BestFitSolver__WEBPACK_IMPORTED_MODULE_0__["BestFitSolver"].Solve(simulatorComponent, false);
        }
        const solFound = solution.isSolutionFound();
        const result = {
            solutionFound: solFound,
            message: solFound ? 'Solution found with a cost of: ' + solution.cost : 'Could not find the solution'
        };
        const nodeList = solution.getNodeListInPath();
        nodeList.forEach(node => {
            node.set({
                stroke: '#00FF00',
                dirty: true
            });
        });
        const edgeList = solution.getEdgeListInPath();
        edgeList.forEach(edge => {
            edge.set({
                stroke: '#00FF00',
                dirty: true
            });
        });
        simulatorComponent.canvas.requestRenderAll();
        return result;
    }
    static SolveByUniformCostSearch(simulatorComponent) {
        SearchSolvers.PrepareForSearch(simulatorComponent);
        let solution;
        solution = _UniformCostSolver__WEBPACK_IMPORTED_MODULE_5__["UniformCostSolver"].Solve(simulatorComponent);
        const solFound = solution.isSolutionFound();
        const result = {
            solutionFound: solFound,
            message: solFound ? 'Solution found with a cost of: ' + solution.cost : 'Could not find the solution'
        };
        const nodeList = solution.getNodeListInPath();
        nodeList.forEach(node => {
            node.set({
                stroke: '#00FF00',
                dirty: true
            });
        });
        const edgeList = solution.getEdgeListInPath();
        edgeList.forEach(edge => {
            edge.set({
                stroke: '#00FF00',
                dirty: true
            });
        });
        simulatorComponent.canvas.requestRenderAll();
        return result;
    }
    static PrepareForSearch(simulatorInstance) {
        let notVisitedNodeColor = _NodeStateInSearchColorMapper__WEBPACK_IMPORTED_MODULE_3__["NodeStateInSearchColorMapper"].GetColorForNotVisitedNode();
        Object.keys(simulatorInstance.nodes).forEach(nodeid => {
            var node = simulatorInstance.nodes[nodeid];
            node.set({
                stroke: notVisitedNodeColor,
                strokeWidth: 4,
                dirty: true
            });
        });
        Object.keys(simulatorInstance.edges).forEach(edgeId => {
            var edge = simulatorInstance.edges[edgeId];
            edge.set({
                stroke: '#FFFFFF',
                dirty: true
            });
        });
        simulatorInstance.canvas.requestRenderAll();
    }
}


/***/ }),

/***/ "./src/Utils/Solution.ts":
/*!*******************************!*\
  !*** ./src/Utils/Solution.ts ***!
  \*******************************/
/*! exports provided: Solution */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Solution", function() { return Solution; });
/* harmony import */ var _UIElementNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIElementNode */ "./src/Utils/UIElementNode.ts");

class Solution {
    constructor(cost) {
        this.currentNode = {};
        this.nodesInPath = {};
        this.edgesInPath = {};
        this.cost = cost;
    }
    reachedGoalState() {
        const nodeType = this.currentNode.nodeType;
        return (nodeType === _UIElementNode__WEBPACK_IMPORTED_MODULE_0__["NodeType"].Goal);
    }
    applyState(otherSolution) {
        this.cost = otherSolution.cost;
        this.currentNode = otherSolution.currentNode;
        this.nodesInPath = {}; // create a new object to add nodes as key value pairs
        // iterate over all the otherSolution's nodes and add them to the current solution
        const nodeIds = Object.keys(otherSolution.nodesInPath);
        for (const nodeId of nodeIds) {
            const node = otherSolution.nodesInPath[nodeId];
            this.nodesInPath[nodeId] = node;
        }
        this.edgesInPath = {}; // create a new object to add edges as key value pairs
        const edgeIds = Object.keys(otherSolution.edgesInPath);
        for (const edgeId of edgeIds) {
            const edge = otherSolution.edgesInPath[edgeId];
            this.edgesInPath[edgeId] = edge;
        }
    }
    getNextEdges() {
        return this.currentNode.asSource;
    }
    isNodeConsideredInPath(node) {
        return (this.nodesInPath[node.id]);
    }
    setCurrentNode(node) {
        this.currentNode = node;
    }
    addNodeToPath(node) {
        this.nodesInPath[node.id] = node;
    }
    addEdgeToPath(edge) {
        this.edgesInPath[edge.id] = edge;
    }
    addCost(cost) {
        this.cost += cost;
    }
    removeNodeFromPath(nodeToRemove) {
        delete this.nodesInPath[nodeToRemove.id];
    }
    removeEdgeFromPath(edgeToRemove) {
        delete this.edgesInPath[edgeToRemove.id];
    }
    deductCost(cost) {
        this.cost -= cost;
    }
    getNodeListInPath() {
        let nodeList = [];
        const nodeIds = Object.keys(this.nodesInPath);
        for (const nodeId of nodeIds) {
            const node = this.nodesInPath[nodeId];
            nodeList.push(node);
        }
        return nodeList;
    }
    getEdgeListInPath() {
        let edgeList = [];
        const edgeIds = Object.keys(this.edgesInPath);
        for (const edgeId of edgeIds) {
            const node = this.edgesInPath[edgeId];
            edgeList.push(node);
        }
        return edgeList;
    }
    isSolutionFound() {
        return (Object.keys(this.edgesInPath).length !== 0);
    }
}
Solution.ctorParameters = () => [
    null
];


/***/ }),

/***/ "./src/Utils/TopologicalSorting.ts":
/*!*****************************************!*\
  !*** ./src/Utils/TopologicalSorting.ts ***!
  \*****************************************/
/*! exports provided: TopologicalSorting */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopologicalSorting", function() { return TopologicalSorting; });
/* harmony import */ var _Queue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Queue */ "./src/Utils/Queue.ts");

class TopologicalSorting {
    static Sort(simulatorInstance) {
        let incomingEdges = {};
        let nodeIds = Object.keys(simulatorInstance.nodes);
        let queue;
        queue = new _Queue__WEBPACK_IMPORTED_MODULE_0__["Queue"]();
        debugger;
        for (let i = 0; i < nodeIds.length; i++) {
            let nodeId = nodeIds[i];
            let node = simulatorInstance.nodes[nodeId];
            let parentNodes = simulatorInstance.getSourceNodesFor(node);
            incomingEdges[nodeId] = parentNodes.length;
            if (parentNodes.length == 0) {
                queue.enqueue(node);
            }
        }
        let orderQueue;
        orderQueue = new _Queue__WEBPACK_IMPORTED_MODULE_0__["Queue"]();
        let inOrder = 0;
        while (!queue.isEmpty()) {
            let node = queue.dequeue();
            orderQueue.enqueue(node);
            let destinations = simulatorInstance.getDestinationNodesFor(node);
            inOrder++;
            for (let i = 0; i < destinations.length; i++) {
                let destinationNodeId = destinations[i].id;
                incomingEdges[destinationNodeId] = incomingEdges[destinationNodeId] - 1;
                if (incomingEdges[destinationNodeId] == 0) {
                    queue.enqueue(destinations[i]);
                }
            }
        }
        if (inOrder == nodeIds.length) {
            // order nodes in topological order
            let x = 0;
            while (!orderQueue.isEmpty()) {
                let node = orderQueue.dequeue();
                node.set({
                    left: x,
                    top: Math.random() * 120,
                    dirty: true
                });
                x += 300;
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
            simulatorInstance.canvas.requestRenderAll();
            simulatorInstance.groupFocus();
            simulatorInstance.zoomOutBy(0.4);
        }
        let result = {};
        if (inOrder < nodeIds.length) {
            result['message'] = 'Topological ordering is not valid for the graph.';
        }
        else {
            result['message'] = 'Nodes have been sorted topologically from left ro right.';
            result['message'] += ' They have been staggered randomly for better edge visibility.';
        }
        console.log(incomingEdges);
        return result;
    }
}


/***/ }),

/***/ "./src/Utils/UIElementEdge.ts":
/*!************************************!*\
  !*** ./src/Utils/UIElementEdge.ts ***!
  \************************************/
/*! exports provided: UIElementEdge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIElementEdge", function() { return UIElementEdge; });
/* harmony import */ var fabric__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fabric */ "./node_modules/fabric/dist/fabric.js");
/* harmony import */ var fabric__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fabric__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _XY__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./XY */ "./src/Utils/XY.ts");


let UIElementEdge = fabric.util.createClass(fabric.Line, {
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
        // this decides if the edged is two way-i.e undirected or not
        this.set('isUndirected', options.isUndirected || false);
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
            source: this.get('source'),
            destination: this.get('destination')
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
        if (!this.isUndirected) {
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
        }
        ctx.restore();
    },
    getCost() {
        const edgeStart = new _XY__WEBPACK_IMPORTED_MODULE_1__["XY"](this.x1, this.y1);
        const edgeEnd = new _XY__WEBPACK_IMPORTED_MODULE_1__["XY"](this.x2, this.y2);
        const edgeLength = _XY__WEBPACK_IMPORTED_MODULE_1__["XY"].getDistanceBetween(edgeStart, edgeEnd);
        const cost = edgeLength * this.edgeWeight;
        return Math.floor(cost * 1000) / 1000;
    }
});


/***/ }),

/***/ "./src/Utils/UIElementNode.ts":
/*!************************************!*\
  !*** ./src/Utils/UIElementNode.ts ***!
  \************************************/
/*! exports provided: UIElementNode, NodeType, NodeColorMapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIElementNode", function() { return UIElementNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeType", function() { return NodeType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeColorMapper", function() { return NodeColorMapper; });
/* harmony import */ var _XY__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./XY */ "./src/Utils/XY.ts");
/* harmony import */ var fabric__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fabric */ "./node_modules/fabric/dist/fabric.js");
/* harmony import */ var fabric__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fabric__WEBPACK_IMPORTED_MODULE_1__);


let UIElementNode = fabric.util.createClass(fabric.Circle, {
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
    getEdgeConnectingNode(otherNode) {
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
    getDistanceTo(otherNode) {
        const thisPos = new _XY__WEBPACK_IMPORTED_MODULE_0__["XY"](this.left, this.top);
        const otherPos = new _XY__WEBPACK_IMPORTED_MODULE_0__["XY"](otherNode.left, otherNode.top);
        return thisPos.distanceTo(otherPos);
    },
    getAllNeighbouringNodes() {
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
        let neighbours = [];
        // Iterate over all the edges in which the node is a source
        const asSourceEdgeIds = Object.keys(this.asSource);
        for (const edgeId of asSourceEdgeIds) {
            const edge = this.asSource[edgeId];
            const node = edge.destination;
            if (node.id != this.id) {
                neighbours.push(node);
            }
        }
        const asDestinationEdgeIds = Object.keys(this.asDestination);
        for (const edgeId of asDestinationEdgeIds) {
            const edge = this.asDestination[edgeId];
            if (edge.isUndirected) {
                const node = edge.source;
                if (node.id != this.id) {
                    neighbours.push(node);
                }
            }
        }
        return neighbours;
    },
    getAllNeighbouringNodesWithCost() {
        let neighbours = [];
        let costs = [];
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
            if (edge.isUndirected) {
                const node = edge.source;
                neighbours.push(node);
                costs.push(edge.getCost());
            }
        }
        return { 'neighbours': neighbours, 'costs': costs };
    },
    getAllNeighbourData() {
        let neighbours = [];
        let costs = [];
        let edges = [];
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
            if (edge.isUndirected) {
                const node = edge.source;
                neighbours.push(node);
                costs.push(edge.getCost());
                edges.push(edge);
            }
        }
        return { 'neighbours': neighbours, 'costs': costs, 'edges': edges };
    }
});
var NodeType;
(function (NodeType) {
    NodeType[NodeType["Start"] = 1] = "Start";
    NodeType[NodeType["Intermediate"] = 2] = "Intermediate";
    NodeType[NodeType["Goal"] = 3] = "Goal";
})(NodeType || (NodeType = {}));
class NodeColorMapper {
    static GetIntermediateNodeColor() {
        return this.COLOR_MAP.Intermediate;
    }
    static GetGoalNodeColor() {
        return this.COLOR_MAP.Goal;
    }
    static GetStartNodeColor() {
        return this.COLOR_MAP.Start;
    }
}
NodeColorMapper.COLOR_MAP = {
    Start: '#0849A2',
    Goal: '#08A229',
    Intermediate: '#FF5733'
};


/***/ }),

/***/ "./src/Utils/UniformCostSolver.ts":
/*!****************************************!*\
  !*** ./src/Utils/UniformCostSolver.ts ***!
  \****************************************/
/*! exports provided: UniformCostSolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UniformCostSolver", function() { return UniformCostSolver; });
/* harmony import */ var _UIElementNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIElementNode */ "./src/Utils/UIElementNode.ts");
/* harmony import */ var _PriorityQueue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PriorityQueue */ "./src/Utils/PriorityQueue.ts");
/* harmony import */ var _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NodeStateInSearch */ "./src/Utils/NodeStateInSearch.ts");
/* harmony import */ var _Solution__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Solution */ "./src/Utils/Solution.ts");
/* harmony import */ var _NodeStateInSearchColorMapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NodeStateInSearchColorMapper */ "./src/Utils/NodeStateInSearchColorMapper.ts");





class UniformCostSolver {
    static Prepare(simulatorInstance) {
        Object.keys(simulatorInstance.nodes).forEach(nodeid => {
            const node = simulatorInstance.nodes[nodeid];
            // initialize the current cost to max(therotically, infinity)
            node.cost = Number.MAX_VALUE;
            // initialize the parent to null
            node.parent = null;
            // Mark if a node is visited
            node.stateInSearch = _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_2__["NodeStateInSearch"].NOT_VISITED;
            node.visitOrder = '';
        });
    }
    static Solve(simulatorComponent) {
        UniformCostSolver.Prepare(simulatorComponent);
        let visitOrder = 1;
        simulatorComponent.startNode.cost = 0; // the cost of the start node to itself will be zero
        simulatorComponent.startNode.stateInSearch = _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_2__["NodeStateInSearch"].CURRENT; // mark the startNode as current-i.e. it is being visited right now, and
        // that some or all of its children are yet to be expanded
        simulatorComponent.startNode.visitOrder = visitOrder;
        // For visual representation set the color as well
        simulatorComponent.startNode.set({
            stroke: _NodeStateInSearchColorMapper__WEBPACK_IMPORTED_MODULE_4__["NodeStateInSearchColorMapper"].GetColorForCurrentNode(),
            dirty: true
        });
        let queue;
        const compareNodes = function (nodeA, nodeB) {
            return nodeA.cost - nodeB.cost;
        };
        // use a priority queue for uniform cost search
        queue = new _PriorityQueue__WEBPACK_IMPORTED_MODULE_1__["PriorityQueue"]({ comparator: compareNodes });
        queue.enqueue(simulatorComponent.startNode);
        while (!queue.isEmpty()) {
            const currentNode = queue.dequeue();
            const nodeType = currentNode.nodeType;
            if (nodeType === _UIElementNode__WEBPACK_IMPORTED_MODULE_0__["NodeType"].Goal) {
                // create a solution object and tranverse through all the parents of the GOAL NODE
                const sol = new _Solution__WEBPACK_IMPORTED_MODULE_3__["Solution"](currentNode.cost);
                let tempNode = currentNode;
                while (tempNode != null) {
                    sol.addNodeToPath(tempNode);
                    // find the edge connecting tempNode and tempNode.parent
                    if (tempNode.parent != null) {
                        const edgeConnectingParent = tempNode.getEdgeConnectingNode(tempNode.parent);
                        sol.addEdgeToPath(edgeConnectingParent);
                    }
                    tempNode = tempNode.parent;
                }
                return sol;
            }
            // Get all the neighbouring nodes
            let neighbourData = currentNode.getAllNeighbouringNodesWithCost();
            let neighbours = neighbourData['neighbours'];
            let costs = neighbourData['costs'];
            //const edges = currentNode.asSource; // Get all the edges in which the node is a source
            //const edgeIds = Object.keys(edges);
            for (var i = 0; i < neighbours.length; i++) {
                //const edge = edges[edgeId];
                const nextNode = neighbours[i];
                const cost = costs[i];
                if (nextNode.stateInSearch === _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_2__["NodeStateInSearch"].NOT_VISITED) {
                    // the nextNode is being seen for the 1st time
                    nextNode.cost = currentNode.cost + cost;
                    // set the parent of the nextNode
                    nextNode.parent = currentNode;
                    // set the state of the nextNode to seen or current
                    nextNode.stateInSearch = _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_2__["NodeStateInSearch"].CURRENT;
                    nextNode.set({
                        stroke: _NodeStateInSearchColorMapper__WEBPACK_IMPORTED_MODULE_4__["NodeStateInSearchColorMapper"].GetColorForCurrentNode(),
                        dirty: true
                    });
                    // enque the node for expansion
                    queue.enqueue(nextNode);
                }
                else if (nextNode.stateInSearch === _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_2__["NodeStateInSearch"].CURRENT) {
                    // the nextNode has been seen before
                    const newCost = currentNode.cost + cost;
                    if (newCost < nextNode.cost) {
                        // a better way to reach newNode has been seen
                        nextNode.cost = newCost;
                        nextNode.parent = currentNode;
                        queue.heapify(); // refresh the queue order
                    }
                } // else if nextNode.stateInSearch === NodeStateInSearch.VISITED, it has been explored completely
            }
            // after all the nodes of the current node are expanded, we set the current state to visited
            currentNode.stateInSearch = _NodeStateInSearch__WEBPACK_IMPORTED_MODULE_2__["NodeStateInSearch"].VISITED;
            currentNode.set({
                stroke: _NodeStateInSearchColorMapper__WEBPACK_IMPORTED_MODULE_4__["NodeStateInSearchColorMapper"].GetColorForVisitedNode(),
                dirty: true
            });
            currentNode.visitOrder = visitOrder++;
        }
        // if the queue is empty and a solution is not found till now, then there is no
        // solution to the problem
        return new _Solution__WEBPACK_IMPORTED_MODULE_3__["Solution"](Number.MAX_VALUE);
    }
}


/***/ }),

/***/ "./src/Utils/Utility.ts":
/*!******************************!*\
  !*** ./src/Utils/Utility.ts ***!
  \******************************/
/*! exports provided: Utility */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utility", function() { return Utility; });
/* harmony import */ var _XY__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./XY */ "./src/Utils/XY.ts");

class Utility {
    static GenerateRandomPointInBox(min, max) {
        var x1 = Utility.GenerateRandomNumberBetween(min.X, max.X);
        var y1 = Utility.GenerateRandomNumberBetween(min.Y, max.Y);
        return new _XY__WEBPACK_IMPORTED_MODULE_0__["XY"](x1, y1);
    }
    static GenerateRandomNumberBetween(lowerBound, upperBound) {
        var range = Math.abs(upperBound - lowerBound);
        return Math.floor(Math.random() * range) + lowerBound;
    }
    static Sleep(miliseconds) {
        var currentTime = new Date().getTime();
        while (currentTime + miliseconds >= new Date().getTime()) {
        }
    }
}


/***/ }),

/***/ "./src/Utils/XY.ts":
/*!*************************!*\
  !*** ./src/Utils/XY.ts ***!
  \*************************/
/*! exports provided: XY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XY", function() { return XY; });
class XY {
    constructor(X, Y) {
        this.X = X;
        this.Y = Y;
    }
    static getDistanceBetween(edgeStart, edgeEnd) {
        const vec = edgeStart.subtract(edgeEnd);
        return vec.getLength();
    }
    add(other) {
        const newX = this.X + other.X;
        const newY = this.Y + other.Y;
        return new XY(newX, newY);
    }
    subtract(other) {
        const newX = this.X - other.X;
        const newY = this.Y - other.Y;
        return new XY(newX, newY);
    }
    multiply(scalar) {
        const newX = this.X * scalar;
        const newY = this.Y * scalar;
        return new XY(newX, newY);
    }
    divide(scalar) {
        const newX = this.X / scalar;
        const newY = this.Y / scalar;
        return new XY(newX, newY);
    }
    toString() {
        return 'X: ' + this.X + ', Y: ' + this.Y;
    }
    getPolarAngleInDegree() {
        const angleInRadian = Math.atan2(this.Y, this.X);
        let angleInDegree = angleInRadian * (180 / Math.PI);
        if (angleInDegree <= 0) { // is negative or zero.
            if (Math.abs(angleInDegree) <= 5) { // in this case the angle can be in the range -5 to +5. We set it to 0, this test case captures when the vector angle is very 
                // close to 0. We need to set it to 0.
                angleInDegree = 0;
            }
            else {
                angleInDegree = 360 + angleInDegree;
            }
        }
        return angleInDegree;
    }
    dotProduct(other) {
        return this.X * other.X + this.Y + other.Y;
    }
    isVectical() {
        const polarAngle = this.getPolarAngleInDegree();
        return ((Math.abs(polarAngle - 90) <= 3) ||
            (Math.abs(polarAngle - 270) <= 3));
    }
    crossProduct(other) {
        // cross product: we have two vectors, this and other. We need to find the cross product of this and other
        // it will be equal to
        // this.x * other.y - this.y * other.x
        return this.X * other.Y - this.Y * other.X;
    }
    getLength() {
        return Math.sqrt(Math.pow(this.X, 2) + Math.pow(this.Y, 2));
    }
    getUnitVector() {
        const length = this.getLength();
        const unitVector = this.divide(length);
        return unitVector;
    }
    distanceTo(other) {
        const vector = this.subtract(other);
        return vector.getLength();
    }
}
XY.BasisX = new XY(1, 0);
XY.BasisY = new XY(0, 1);
XY.BasisXY = new XY(1, 1);
XY.ctorParameters = () => [
    { type: Number },
    { type: Number }
];


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _simulator_simulator_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./simulator/simulator.component */ "./src/app/simulator/simulator.component.ts");




const routes = [
    {
        path: '',
        component: _simulator_simulator_component__WEBPACK_IMPORTED_MODULE_3__["SimulatorComponent"]
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AppRoutingModule);



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let AppComponent = class AppComponent {
    constructor() {
        this.title = 'AISearchSimulator';
    }
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
        styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _simulator_simulator_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./simulator/simulator.component */ "./src/app/simulator/simulator.component.ts");
/* harmony import */ var _material_material_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./material/material.module */ "./src/app/material/material.module.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");









let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            _simulator_simulator_component__WEBPACK_IMPORTED_MODULE_5__["SimulatorComponent"],
            _simulator_simulator_component__WEBPACK_IMPORTED_MODULE_5__["HelpDialogComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
            _material_material_module__WEBPACK_IMPORTED_MODULE_6__["MaterialModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"]
        ],
        providers: [],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]],
        entryComponents: [
            _simulator_simulator_component__WEBPACK_IMPORTED_MODULE_5__["HelpDialogComponent"],
        ],
    })
], AppModule);



/***/ }),

/***/ "./src/app/material/material.module.ts":
/*!*********************************************!*\
  !*** ./src/app/material/material.module.ts ***!
  \*********************************************/
/*! exports provided: MaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialModule", function() { return MaterialModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");




const MaterialComponents = [
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatIconModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTooltipModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSelectModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSnackBarModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialogModule"]
];
let MaterialModule = class MaterialModule {
};
MaterialModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
        ],
        exports: [
            MaterialComponents
        ]
    })
], MaterialModule);



/***/ }),

/***/ "./src/app/simulator/simulator.component.css":
/*!***************************************************!*\
  !*** ./src/app/simulator/simulator.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host{\n    width: 100%;\n    height: 100%;\n}\n\n.contentMain{\n    /* border: 1px dashed pink; */\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n}\n\n.canvasWrapper{\n    /* background: rebeccapurple; */\n    /* border: 1px solid rebeccapurple; */\n    width: 100%;\n    height: 100%;\n}\n\n.canvasElement{\n    /* background: greenyellow; */\n    /* border: 2px dotted goldenrod; */\n    width: 100%;\n    height: 100%;\n}\n\n.floatingMainMenu{\n    right: 25px;\n    top: 0;\n    /* margin-top: 10px; */\n    padding: 10px;\n    box-shadow: 0 2px 6px 0px  rgba(0,0,0,0.2);\n    background: white;\n    /* width: 20%; */\n    position: absolute;\n    z-index: 10;\n    border-bottom-left-radius: 3%;\n    border-bottom-right-radius: 3%;\n    max-height: 70vh;\n    /* border: 2px solid darkblue; */\n    /* overflow-y: scroll; */\n    max-width: 180px;\n}\n\n.uiUtilityMenu{\n    left: 0;\n    top: 0;\n    position: absolute;\n    /* margin-top: 10px;\n    margin-left: 5px; */\n}\n\n.uiUtilityMenu .optionsButton{\n    color: lightgrey;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2ltdWxhdG9yL3NpbXVsYXRvci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksV0FBVztJQUNYLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSw2QkFBNkI7SUFDN0IsV0FBVztJQUNYLFlBQVk7SUFDWixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSwrQkFBK0I7SUFDL0IscUNBQXFDO0lBQ3JDLFdBQVc7SUFDWCxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksNkJBQTZCO0lBQzdCLGtDQUFrQztJQUNsQyxXQUFXO0lBQ1gsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxNQUFNO0lBQ04sc0JBQXNCO0lBQ3RCLGFBQWE7SUFDYiwwQ0FBMEM7SUFDMUMsaUJBQWlCO0lBQ2pCLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsV0FBVztJQUNYLDZCQUE2QjtJQUM3Qiw4QkFBOEI7SUFDOUIsZ0JBQWdCO0lBQ2hCLGdDQUFnQztJQUNoQyx3QkFBd0I7SUFDeEIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksT0FBTztJQUNQLE1BQU07SUFDTixrQkFBa0I7SUFDbEI7dUJBQ21CO0FBQ3ZCOztBQUVBO0lBQ0ksZ0JBQWdCO0FBQ3BCIiwiZmlsZSI6InNyYy9hcHAvc2ltdWxhdG9yL3NpbXVsYXRvci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3R7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xufVxuXG4uY29udGVudE1haW57XG4gICAgLyogYm9yZGVyOiAxcHggZGFzaGVkIHBpbms7ICovXG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5jYW52YXNXcmFwcGVye1xuICAgIC8qIGJhY2tncm91bmQ6IHJlYmVjY2FwdXJwbGU7ICovXG4gICAgLyogYm9yZGVyOiAxcHggc29saWQgcmViZWNjYXB1cnBsZTsgKi9cbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5jYW52YXNFbGVtZW50e1xuICAgIC8qIGJhY2tncm91bmQ6IGdyZWVueWVsbG93OyAqL1xuICAgIC8qIGJvcmRlcjogMnB4IGRvdHRlZCBnb2xkZW5yb2Q7ICovXG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xufVxuXG4uZmxvYXRpbmdNYWluTWVudXtcbiAgICByaWdodDogMjVweDtcbiAgICB0b3A6IDA7XG4gICAgLyogbWFyZ2luLXRvcDogMTBweDsgKi9cbiAgICBwYWRkaW5nOiAxMHB4O1xuICAgIGJveC1zaGFkb3c6IDAgMnB4IDZweCAwcHggIHJnYmEoMCwwLDAsMC4yKTtcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICAvKiB3aWR0aDogMjAlOyAqL1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB6LWluZGV4OiAxMDtcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAzJTtcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMyU7XG4gICAgbWF4LWhlaWdodDogNzB2aDtcbiAgICAvKiBib3JkZXI6IDJweCBzb2xpZCBkYXJrYmx1ZTsgKi9cbiAgICAvKiBvdmVyZmxvdy15OiBzY3JvbGw7ICovXG4gICAgbWF4LXdpZHRoOiAxODBweDtcbn1cblxuLnVpVXRpbGl0eU1lbnV7XG4gICAgbGVmdDogMDtcbiAgICB0b3A6IDA7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIC8qIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgbWFyZ2luLWxlZnQ6IDVweDsgKi9cbn1cblxuLnVpVXRpbGl0eU1lbnUgLm9wdGlvbnNCdXR0b257XG4gICAgY29sb3I6IGxpZ2h0Z3JleTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/simulator/simulator.component.ts":
/*!**************************************************!*\
  !*** ./src/app/simulator/simulator.component.ts ***!
  \**************************************************/
/*! exports provided: CanvasState, SimulatorComponent, HelpDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasState", function() { return CanvasState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimulatorComponent", function() { return SimulatorComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HelpDialogComponent", function() { return HelpDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _Utils_XY__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utils/XY */ "./src/Utils/XY.ts");
/* harmony import */ var _Utils_UIElementNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utils/UIElementNode */ "./src/Utils/UIElementNode.ts");
/* harmony import */ var _Utils_UIElementEdge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Utils/UIElementEdge */ "./src/Utils/UIElementEdge.ts");
/* harmony import */ var src_Utils_Utility__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/Utils/Utility */ "./src/Utils/Utility.ts");
/* harmony import */ var src_Utils_IdGenerator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/Utils/IdGenerator */ "./src/Utils/IdGenerator.ts");
/* harmony import */ var src_Utils_SearchSolvers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/Utils/SearchSolvers */ "./src/Utils/SearchSolvers.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var fabric__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! fabric */ "./node_modules/fabric/dist/fabric.js");
/* harmony import */ var fabric__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(fabric__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var src_Utils_GeneralAlgorithms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/Utils/GeneralAlgorithms */ "./src/Utils/GeneralAlgorithms.ts");
/* harmony import */ var src_Utils_TopologicalSorting__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/Utils/TopologicalSorting */ "./src/Utils/TopologicalSorting.ts");
/* harmony import */ var src_Utils_GraphBridges__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/Utils/GraphBridges */ "./src/Utils/GraphBridges.ts");
/* harmony import */ var src_Utils_ConvexHull__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/Utils/ConvexHull */ "./src/Utils/ConvexHull.ts");















var CanvasState;
(function (CanvasState) {
    CanvasState[CanvasState["Normal"] = 1] = "Normal";
    CanvasState[CanvasState["DrawingEdge"] = 2] = "DrawingEdge";
})(CanvasState || (CanvasState = {}));
let SimulatorComponent = class SimulatorComponent {
    constructor(snackBar, dialog) {
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.algorithms = ['Breadth first search', 'Uniform cost search', 'Depth first search', 'Depth first (Optimal)', 'Best-Fit (Greedy)', 'Best-Fit (A*)', 'Check Bipartiteness', 'Topological Ordering', 'Find Bridges(Undirected graph)', 'Convex Hull'];
        this.nodes = {};
        this.edges = {};
        this.isLinkingEnabled = false;
        this.isLinkingBidirectional = false;
        this.isDragButtonEnabled = false;
        this.activeObject = null;
        this.tempEdge = null;
        this.idGenerator = new src_Utils_IdGenerator__WEBPACK_IMPORTED_MODULE_6__["IdGenerator"](Number.MAX_SAFE_INTEGER);
        this.startNode = null;
        this.goalNodes = {};
        this.numbers = [];
    }
    ngOnInit() {
    }
    clearAll() {
        this.deleteAllNodes();
        this.deleteAllEdges();
        this.activeObject = null;
        this.startNode = null;
        this.goalNodes = {};
        this.numbers = [];
        this.idGenerator = new src_Utils_IdGenerator__WEBPACK_IMPORTED_MODULE_6__["IdGenerator"](Number.MAX_SAFE_INTEGER);
    }
    deleteAllNodes() {
        let nodeIds = Object.keys(this.nodes);
        for (var i = 0; i < nodeIds.length; i++) {
            this.canvas.remove(this.nodes[nodeIds[i]]);
        }
        this.nodes = {};
    }
    deleteAllEdges() {
        let edgeIds = Object.keys(this.edges);
        for (var i = 0; i < edgeIds.length; i++) {
            this.canvas.remove(this.edges[edgeIds[i]]);
        }
        this.edges = {};
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
            if (zoom > 20) {
                zoom = 20;
            }
            if (zoom < 0.01) {
                zoom = 0.01;
            }
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
                        const edge = new _Utils_UIElementEdge__WEBPACK_IMPORTED_MODULE_4__["UIElementEdge"]([oldSelection.left, oldSelection.top, this.activeObject.left, this.activeObject.top], {
                            id: rid,
                            source: oldSelection,
                            destination: this.activeObject,
                            isUndirected: this.isLinkingBidirectional
                        });
                        this.registerNodeInEdge(edge, oldSelection, this.activeObject, this.isLinkingBidirectional);
                        // this.registerNodeInEdge(edge, oldSelection, this.activeObject);
                    }
                    else {
                        console.log('Same selection');
                        this.canvas.remove(this.tempEdge);
                    }
                }
                else if (oldSelection != null && this.activeObject == null) {
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
            const point = new _Utils_XY__WEBPACK_IMPORTED_MODULE_2__["XY"](opt.e.layerX, opt.e.layerY);
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
            if ((this.isLinkingEnabled || this.isLinkingBidirectional) && this.activeObject != null) {
                // draw an edge from the selected item to the current mouse location
                if (this.tempEdge != null) {
                    this.canvas.remove(this.tempEdge);
                }
                this.tempEdge =
                    new _Utils_UIElementEdge__WEBPACK_IMPORTED_MODULE_4__["UIElementEdge"]([this.activeObject.left, this.activeObject.top, point.X, point.Y], {
                        id: -1,
                        fill: '#959494',
                        stroke: '#959494',
                        strokeWidth: 2,
                        selectable: false,
                        isUndirected: this.isLinkingBidirectional
                    });
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
                    if (edge.source.id == currentSelection.id) {
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
                    if (edge.destination.id == currentSelection.id) {
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
            const point = new _Utils_XY__WEBPACK_IMPORTED_MODULE_2__["XY"](opt.e.layerX, opt.e.layerY);
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
    onResize(event) {
        console.log(event.target.innerWidth);
        this.canvasElementWidth = event.target.innerWidth;
        console.log(event.target.innerHeight);
        this.canvasElementHeight = event.target.innerHeight;
        this.canvas.set({
            width: this.canvasElementWidth,
            height: this.canvasElementHeight
        });
        this.groupFocus();
    }
    runSimulator() {
        switch (this.selectedAlgorithm) {
            case this.algorithms[0]: {
                // breadth first
                const result = src_Utils_SearchSolvers__WEBPACK_IMPORTED_MODULE_7__["SearchSolvers"].ValidateGraph(this);
                if (!result.isValid) {
                    this.snackBar.open(result.message, 'Got it!');
                    return;
                }
                const res = src_Utils_SearchSolvers__WEBPACK_IMPORTED_MODULE_7__["SearchSolvers"].SolveByBreadthFirst(this);
                this.snackBar.open(res.message, 'Okay!');
                return;
            }
            case this.algorithms[1]: {
                // Uniform cost search
                const result = src_Utils_SearchSolvers__WEBPACK_IMPORTED_MODULE_7__["SearchSolvers"].ValidateGraph(this);
                if (!result.isValid) {
                    this.snackBar.open(result.message, 'Got it!');
                    return;
                }
                const res = src_Utils_SearchSolvers__WEBPACK_IMPORTED_MODULE_7__["SearchSolvers"].SolveByUniformCostSearch(this);
                this.snackBar.open(res.message, 'Okay!');
                return;
            }
            case this.algorithms[2]: {
                // depth first
                const result = src_Utils_SearchSolvers__WEBPACK_IMPORTED_MODULE_7__["SearchSolvers"].ValidateGraph(this);
                if (!result.isValid) {
                    this.snackBar.open(result.message, 'Got it!');
                    return;
                }
                const res = src_Utils_SearchSolvers__WEBPACK_IMPORTED_MODULE_7__["SearchSolvers"].SolveByDepthFirst(this, false);
                this.snackBar.open(res.message, 'Okay!');
                return;
            }
            case this.algorithms[3]: {
                // depth-first(optimal)
                const result = src_Utils_SearchSolvers__WEBPACK_IMPORTED_MODULE_7__["SearchSolvers"].ValidateGraph(this);
                if (!result.isValid) {
                    this.snackBar.open(result.message, 'Got it!');
                    return;
                }
                const res = src_Utils_SearchSolvers__WEBPACK_IMPORTED_MODULE_7__["SearchSolvers"].SolveByDepthFirst(this, true);
                this.snackBar.open(res.message, 'Okay!');
                return;
            }
            case this.algorithms[4]: {
                // greedy best fit
                const result = src_Utils_SearchSolvers__WEBPACK_IMPORTED_MODULE_7__["SearchSolvers"].ValidateGraph(this);
                if (!result.isValid) {
                    this.snackBar.open(result.message, 'Got it!');
                    return;
                }
                const res = src_Utils_SearchSolvers__WEBPACK_IMPORTED_MODULE_7__["SearchSolvers"].SolveByBestFit(this, false);
                this.snackBar.open(res.message, 'Okay!');
                return;
            }
            case this.algorithms[5]: {
                // A* search
                const result = src_Utils_SearchSolvers__WEBPACK_IMPORTED_MODULE_7__["SearchSolvers"].ValidateGraph(this);
                if (!result.isValid) {
                    this.snackBar.open(result.message, 'Got it!');
                    return;
                }
                const res = src_Utils_SearchSolvers__WEBPACK_IMPORTED_MODULE_7__["SearchSolvers"].SolveByBestFit(this, true);
                this.snackBar.open(res.message, 'Okay!');
                return;
            }
            case this.algorithms[6]: {
                // Check if bipartite
                const res = src_Utils_GeneralAlgorithms__WEBPACK_IMPORTED_MODULE_11__["GeneralAlgorithms"].CheckIfBipartite(this);
                this.snackBar.open(res.message, "Okay");
                return;
            }
            case this.algorithms[7]: {
                // Topological ordering
                const res = src_Utils_TopologicalSorting__WEBPACK_IMPORTED_MODULE_12__["TopologicalSorting"].Sort(this);
                this.snackBar.open(res.message, "Okay!");
                return;
            }
            case this.algorithms[8]: {
                // Find Bridges(Undirected graph)
                const res = src_Utils_GraphBridges__WEBPACK_IMPORTED_MODULE_13__["GraphBridges"].Identify(this);
                this.snackBar.open(res.message, "Okay!");
                return;
            }
            case this.algorithms[9]: {
                // convex hull
                const res = src_Utils_ConvexHull__WEBPACK_IMPORTED_MODULE_14__["ConvexHull"].Find(this);
                this.snackBar.open(res.message, "Okay");
                return;
            }
        }
    }
    registerNodeInEdge(edge, oldSelection, currentSelection, isLinkingBidirectional) {
        //isLinkingBidirectional: boolean
        this.canvas.add(edge);
        this.edges[edge.id] = edge;
        // add the edge in the asSource and asDestination members of the source and destination node
        oldSelection.asSource[edge.id] = edge;
        currentSelection.asDestination[edge.id] = edge;
        if (isLinkingBidirectional) {
            currentSelection.asSource[edge.id] = edge;
            oldSelection.asDestination[edge.id] = edge;
        }
        this.canvas.sendToBack(edge);
    }
    isEdge(obj) {
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
        const screenCenter = this.getScreenCenter();
        const screenCenterInCanvasSystem = this.transformScreenToCanvas(screenCenter);
        // debugger;
        const boxMin = screenCenterInCanvasSystem.add(_Utils_XY__WEBPACK_IMPORTED_MODULE_2__["XY"].BasisXY.multiply(-1 * 100));
        const boxMax = screenCenterInCanvasSystem.add(_Utils_XY__WEBPACK_IMPORTED_MODULE_2__["XY"].BasisXY.multiply(100));
        // generate a random point within a box in the centre of the screen
        const newNodePos = src_Utils_Utility__WEBPACK_IMPORTED_MODULE_5__["Utility"].GenerateRandomPointInBox(boxMin, boxMax);
        this.createNewNodeAt(newNodePos);
    }
    AddNodeInBox(boxMin, boxMax) {
        // generate a random point within a box in the centre of the screen
        const newNodePos = src_Utils_Utility__WEBPACK_IMPORTED_MODULE_5__["Utility"].GenerateRandomPointInBox(boxMin, boxMax);
        this.createNewNodeAt(newNodePos);
    }
    AddRandomNodes() {
        let nodeCount = src_Utils_Utility__WEBPACK_IMPORTED_MODULE_5__["Utility"].GenerateRandomNumberBetween(3, 8);
        // Get the center of the screen (in screen coordinates)
        const screenCenter = this.getScreenCenter();
        const screenCenterInCanvasSystem = this.transformScreenToCanvas(screenCenter);
        // debugger;
        const boxMin = screenCenterInCanvasSystem.add(_Utils_XY__WEBPACK_IMPORTED_MODULE_2__["XY"].BasisXY.multiply(-1 * 250));
        const boxMax = screenCenterInCanvasSystem.add(_Utils_XY__WEBPACK_IMPORTED_MODULE_2__["XY"].BasisXY.multiply(250));
        for (var i = 1; i <= nodeCount; i++) {
            this.AddNodeInBox(boxMin, boxMax);
        }
    }
    transformScreenToCanvas(pointInScreenSystem) {
        let pointInCanvasSystem;
        // get transform from screen system to canvas system
        const viewportTransform = this.canvas.viewportTransform;
        const xDelta = this.canvas.viewportTransform[4] * -1;
        const yDelta = this.canvas.viewportTransform[5] * -1;
        const X = (1 / viewportTransform[0]) * (pointInScreenSystem.X + xDelta);
        const Y = (1 / viewportTransform[3]) * (pointInScreenSystem.Y + yDelta);
        pointInCanvasSystem = new _Utils_XY__WEBPACK_IMPORTED_MODULE_2__["XY"](X, Y);
        return pointInCanvasSystem;
    }
    getScreenCenter() {
        return new _Utils_XY__WEBPACK_IMPORTED_MODULE_2__["XY"](this.canvasElementWidth / 2, this.canvasElementHeight / 2);
    }
    createNewNodeAt(point) {
        const id = Object.keys(this.nodes).length + 1;
        const node = new _Utils_UIElementNode__WEBPACK_IMPORTED_MODULE_3__["UIElementNode"]({
            id,
            left: point.X,
            top: point.Y
        });
        this.registerNodeInGraph(node);
        this.canvas.setActiveObject(node);
        this.activeObject = node;
        this.canvas.requestRenderAll();
    }
    registerNodeInGraph(node) {
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
    getNodeTypeAsString(node) {
        if (this.isNode(node)) {
            const nodeType = node.nodeType;
            switch (nodeType) {
                case _Utils_UIElementNode__WEBPACK_IMPORTED_MODULE_3__["NodeType"].Intermediate: {
                    return 'Intermediate';
                }
                case _Utils_UIElementNode__WEBPACK_IMPORTED_MODULE_3__["NodeType"].Goal: {
                    return 'Goal';
                }
                case _Utils_UIElementNode__WEBPACK_IMPORTED_MODULE_3__["NodeType"].Start: {
                    return 'Start';
                }
            }
        }
        else {
            return 'OOPs, something went wrong!';
        }
    }
    isNode(node) {
        if (node == null) {
            return false;
        }
        return node.type === 'UIElementNode';
    }
    isStartNode(node) {
        if (!this.isNode(node)) {
            throw new DOMException('The object is not UIElementNode type');
        }
        const nodeType = node.nodeType;
        return (nodeType === _Utils_UIElementNode__WEBPACK_IMPORTED_MODULE_3__["NodeType"].Start);
    }
    isGoalNode(node) {
        if (!this.isNode(node)) {
            throw new DOMException('The object is not UIElementNode type');
        }
        const nodeType = node.nodeType;
        return (nodeType === _Utils_UIElementNode__WEBPACK_IMPORTED_MODULE_3__["NodeType"].Goal);
    }
    isIntermediateNode(node) {
        if (!this.isNode(node)) {
            throw new DOMException('The object is not UIElementNode type');
        }
        const nodeType = node.nodeType;
        return (nodeType === _Utils_UIElementNode__WEBPACK_IMPORTED_MODULE_3__["NodeType"].Intermediate);
    }
    makeStartNode(node) {
        if (this.isGoalNode(node)) {
            delete this.nodes[node.id];
        }
        if (this.startNode != null) {
            this.startNode.set({
                fill: _Utils_UIElementNode__WEBPACK_IMPORTED_MODULE_3__["NodeColorMapper"].GetIntermediateNodeColor(),
                dirty: true,
                nodeType: _Utils_UIElementNode__WEBPACK_IMPORTED_MODULE_3__["NodeType"].Intermediate
            });
        }
        this.activeObject.set({
            fill: _Utils_UIElementNode__WEBPACK_IMPORTED_MODULE_3__["NodeColorMapper"].GetStartNodeColor(),
            dirty: true,
            nodeType: _Utils_UIElementNode__WEBPACK_IMPORTED_MODULE_3__["NodeType"].Start
        });
        this.startNode = this.activeObject;
        this.canvas.requestRenderAll();
    }
    makeGoalNode(node) {
        debugger;
        if (this.goalNodes[node.id] !== undefined) {
            return; // the node is already a goal node
        }
        this.goalNodes[node.id] = node;
        node.set({
            fill: _Utils_UIElementNode__WEBPACK_IMPORTED_MODULE_3__["NodeColorMapper"].GetGoalNodeColor(),
            dirty: true,
            nodeType: _Utils_UIElementNode__WEBPACK_IMPORTED_MODULE_3__["NodeType"].Goal
        });
        this.canvas.requestRenderAll();
    }
    makeIntermediateNode(node) {
        if (this.isGoalNode(node)) {
            node.set({
                fill: _Utils_UIElementNode__WEBPACK_IMPORTED_MODULE_3__["NodeColorMapper"].GetIntermediateNodeColor(),
                dirty: true,
                nodeType: _Utils_UIElementNode__WEBPACK_IMPORTED_MODULE_3__["NodeType"].Intermediate
            });
            delete this.goalNodes[node.id];
        }
        if (this.startNode === node) {
            this.startNode.set({
                fill: _Utils_UIElementNode__WEBPACK_IMPORTED_MODULE_3__["NodeColorMapper"].GetIntermediateNodeColor(),
                dirty: true,
                nodeType: _Utils_UIElementNode__WEBPACK_IMPORTED_MODULE_3__["NodeType"].Intermediate
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
        if (zoom > 20) {
            zoom = 20;
        }
        if (zoom < 0.01) {
            zoom = 0.01;
        }
        // get the centre of the screen
        const screenCenter = this.getScreenCenter();
        this.canvas.zoomToPoint({ x: screenCenter.X, y: screenCenter.Y }, zoom); // point, zoom amount
    }
    zoomOut() {
        let zoom = this.canvas.getZoom();
        this.zoom = Math.round(zoom * 5) / 5;
        console.log('Zoom: ' + zoom);
        zoom = zoom - 0.01;
        if (zoom > 20) {
            zoom = 20;
        }
        if (zoom < 0.01) {
            zoom = 0.01;
        }
        // get the centre of the screen
        const screenCenter = this.getScreenCenter();
        this.canvas.zoomToPoint({ x: screenCenter.X, y: screenCenter.Y }, zoom); // point, zoom amount
    }
    zoomOutBy(zoomAmount) {
        let zoom = this.canvas.getZoom();
        this.zoom = Math.round(zoom * 5) / 5;
        console.log('Zoom: ' + zoom);
        zoom = zoom - zoomAmount;
        if (zoom > 20) {
            zoom = 20;
        }
        if (zoom < 0.01) {
            zoom = 0.01;
        }
        // get the centre of the screen
        const screenCenter = this.getScreenCenter();
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
        }
        else {
            if (widthAfterHeightZoom <= this.canvasElementWidth) {
                zoom = heightZoom;
                heightZoomBool = true;
            }
            else {
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
    getDestinationNodesFor(currentNode) {
        const destinationNodes = [];
        Object.keys(currentNode.asSource).forEach(edgeId => {
            const edge = this.getEdge(edgeId);
            destinationNodes.push(edge.destination);
        });
        return destinationNodes;
    }
    getSourceNodesFor(currentNode) {
        const sourceNodes = [];
        Object.keys(currentNode.asDestination).forEach(edgeId => {
            const edge = this.getEdge(edgeId);
            sourceNodes.push(edge.source);
        });
        return sourceNodes;
    }
    getAllNeighbouringNodes(currentNode) {
        let sourceNodes = this.getSourceNodesFor(currentNode);
        let destinationNodes = this.getDestinationNodesFor(currentNode);
        let allNodes = [];
        sourceNodes.forEach(element => {
            allNodes.push(element);
        });
        destinationNodes.forEach(element => {
            allNodes.push(element);
        });
        return allNodes;
    }
    getEdge(edgeId) {
        return this.edges[edgeId];
    }
    distanceToNearestGoal(queryNode) {
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
};
SimulatorComponent.ctorParameters = () => [
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatSnackBar"] },
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__["MatDialog"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('window:resize', ['$event']),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object]),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
], SimulatorComponent.prototype, "onResize", null);
SimulatorComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-simulator',
        template: __webpack_require__(/*! raw-loader!./simulator.component.html */ "./node_modules/raw-loader/index.js!./src/app/simulator/simulator.component.html"),
        styles: [__webpack_require__(/*! ./simulator.component.css */ "./src/app/simulator/simulator.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_8__["MatSnackBar"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__["MatDialog"]])
], SimulatorComponent);

let HelpDialogComponent = class HelpDialogComponent {
    constructor() { }
};
HelpDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-help-dialog',
        template: __webpack_require__(/*! raw-loader!./help-dialog.html */ "./node_modules/raw-loader/index.js!./src/app/simulator/help-dialog.html")
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], HelpDialogComponent);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/jeetendragan/Documents/my_projects/AISearchSimulator/src/main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!***********************!*\
  !*** jsdom (ignored) ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!********************************************************!*\
  !*** jsdom/lib/jsdom/living/generated/utils (ignored) ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!***************************************!*\
  !*** jsdom/lib/jsdom/utils (ignored) ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map