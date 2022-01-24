#!/usr/bin/env ts-node

import { paths } from "./input";

const pathSystem: Map<string, string[]> = new Map();

paths.forEach(node => {
    const [startNode, endNode] = node.split("-");
    {
        const existingPathsForStartNode = pathSystem.get(startNode);
        let newPathsStartNode: string[];
        if(!existingPathsForStartNode) {
            newPathsStartNode = [endNode];
        } else {
            newPathsStartNode = [...existingPathsForStartNode, endNode];
        }
        pathSystem.set(startNode, newPathsStartNode);
    }
    {
        const existingPathsForEndNode = pathSystem.get(endNode);
        let newPathsEndNode: string[];
        if(!existingPathsForEndNode) {
            newPathsEndNode = [startNode];
        } else {
            newPathsEndNode = [...existingPathsForEndNode, startNode];
        }
        pathSystem.set(endNode, newPathsEndNode);
    }
});

const traverseGraph = (pathHistory: string[]):string[][] => {
    const currentNode = pathHistory[pathHistory.length - 1];
    const connectionsFromCurrentNode = pathSystem.get(currentNode) ?? [];
    let res: string[][] = [];
    connectionsFromCurrentNode.forEach(node => {
        let smallCaveVisitedTwice = false;
        pathHistory.filter(x => x === x.toLocaleLowerCase()).forEach(x => {
            smallCaveVisitedTwice = smallCaveVisitedTwice || pathHistory.filter(y => x === y).length === 2
        });
        if(node === "end") {
            res.push([...pathHistory, node]);
        } else if(node !== "start" && (pathHistory.indexOf(node) === -1 || node === node.toUpperCase() || !smallCaveVisitedTwice)) {
            const currRes = traverseGraph([...pathHistory, node]);
            currRes.forEach(x => res.push(x));
        }
    });
    return res;
}

let pathOptions: string[][] = [];

const startingConnections = pathSystem.get("start") ?? [];
startingConnections.forEach(node => {
    const res = traverseGraph(["start", node]);
    res.forEach(x => {
        pathOptions.push(x);
    });
});
console.log(pathOptions.length);