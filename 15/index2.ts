#!/usr/bin/env ts-node

import { riskLevels } from "./input";

const baseX = riskLevels[0].length;
const baseY = riskLevels.length;
const maxX = riskLevels[0].length * 5 - 1;
const maxY = riskLevels.length * 5 - 1;

class QueueElement {
    priority: number;
    element: string;
    constructor(element: string, priority: number) {
        this.element = element;
        this.priority = priority;
    }
}

class PriorityQueue {
    items: QueueElement[];
    constructor() {
        this.items = [];
    }
    queueUp(element: string, priority: number) {
        const qElement = new QueueElement(element, priority);
        let contain = false;

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }

        if (!contain) {
            this.items.push(qElement);
        }
    }

    pop() {
        return this.items.shift();
    }
}

interface spt {
    graphPosition: string
}

const getRiskLevel = (x: number, y: number) => {
    let increases = 0;
    while (x >= baseX) {
        increases++;
        x -= baseX;
    }
    while (y >= baseY) {
        increases++;
        y -= baseY;
    }
    let res = (increases + parseInt(riskLevels[y][x]));
    if(res > 19) {
        res += 2;
    } else if(res > 9) {
        res++;
    }
    return res % 10;
}

const dijkstra = (target: string) => {
    const accumulatedMatrix: number[][] = [];
    const queue = new PriorityQueue();
    for(let i = 0; i <= maxY; i++) {
        accumulatedMatrix.push([]);
        for(let j = 0; j <= maxX; j++) {
            accumulatedMatrix[i].push(Infinity);
        }
    }
    accumulatedMatrix[0][0] = 0;
    queue.queueUp("0,1", getRiskLevel(0, 1));
    queue.queueUp("1,0", getRiskLevel(1, 0));
    while(accumulatedMatrix[maxY][maxX] === Infinity) {
        const currItem = queue.pop();
        if(!currItem) {
            break;
        }
        const [x, y] = currItem.element.split(",").map(x => parseInt(x));
        if(accumulatedMatrix[y][x] !== Infinity) {
            continue;
        }
        accumulatedMatrix[y][x] = currItem.priority;
        if(x % 50 === 0 && y % 50 === 0) {
            console.log(currItem.element);
        }
        if(y < maxY) {
            queue.queueUp(`${x},${y + 1}`, currItem.priority + getRiskLevel(x, y + 1));
        }
        if(x > 0) {
            queue.queueUp(`${x - 1},${y}`, currItem.priority + getRiskLevel(x - 1, y));
        }
        if(x < maxX) {
            queue.queueUp(`${x + 1},${y}`, currItem.priority + getRiskLevel(x + 1, y));
        }
        if(y > 0) {
            queue.queueUp(`${x},${y - 1}`, currItem.priority + getRiskLevel(x, y - 1));
        }
    }
    return accumulatedMatrix[maxY][maxX];
}

console.log(dijkstra(`${maxY},${maxX}`));
