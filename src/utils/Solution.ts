import { NodeType } from './UIElementNode';

export class Solution {
    public currentNode;
    public nodesInPath;
    public edgesInPath;
    public cost: number;

    constructor(cost) {
        this.currentNode = {};
        this.nodesInPath = {};
        this.edgesInPath = {};
        this.cost = cost;
    }

    public reachedGoalState(): boolean {
        const nodeType: NodeType = this.currentNode.nodeType;
        return (nodeType === NodeType.Goal);
    }

    public applyState(otherSolution: Solution) {
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

    public getNextEdges(): any {
        return this.currentNode.asSource;
    }

    public isNodeConsideredInPath(node): boolean {
        return (this.nodesInPath[node.id]);
    }

    public setCurrentNode(node: any) {
        this.currentNode = node;
    }

    public addNodeToPath(node: any) {
        this.nodesInPath[node.id] = node;
    }

    public addEdgeToPath(edge: any) {
        this.edgesInPath[edge.id] = edge;
    }

    addCost(cost: number) {
        this.cost += cost;
    }

    removeNodeFromPath(nodeToRemove: any) {
        delete this.nodesInPath[nodeToRemove.id];
    }

    removeEdgeFromPath(edgeToRemove: any) {
        delete this.edgesInPath[edgeToRemove.id];
    }

    deductCost(cost: number) {
        this.cost -= cost;
    }

    public getNodeListInPath(): any[] {
        let nodeList: any[] = [];
        const nodeIds = Object.keys(this.nodesInPath);
        for (const nodeId of nodeIds) {
            const node = this.nodesInPath[nodeId];
            nodeList.push(node);
        }
        return nodeList;
    }

    public getEdgeListInPath(): any[] {
        let edgeList: any[] = [];
        const edgeIds = Object.keys(this.edgesInPath);
        for (const edgeId of edgeIds) {
            const node = this.edgesInPath[edgeId];
            edgeList.push(node);
        }
        return edgeList;
    }

    public isSolutionFound() {
        return (Object.keys(this.edgesInPath).length !== 0);
    }
}
