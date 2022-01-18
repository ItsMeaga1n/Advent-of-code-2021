#!/usr/bin/env ts-node

import { boardsRows, sequence } from "./input";

interface BingoNumber {
    NumberValue: number,
    IsMarked: boolean
}

interface Board {
    Numbers: BingoNumber[][],
    MarkNumber(CalledNumber: number): number
}

class BingoBoard implements Board {
    Numbers: BingoNumber[][];
    constructor(boardRows: string[]) {
        const rows:BingoNumber[][] = [];
        if(boardRows.length !== 5) {
            throw new TypeError("BingoBoard has to have 5 rows. Given: " + boardRows.length);
        }
        boardRows.forEach(row => {
            const rowsParsed = row.trim().split(" ");
            if(rowsParsed.length !== 5) {
                throw new TypeError("Each row in bingo rows needs to have 5 numbers");
            }
            rows.push(rowsParsed.map(rowParsed => ({
                NumberValue: parseInt(rowParsed),
                IsMarked: false
            })));
        });
        this.Numbers = rows;
    }
    MarkNumber(CalledNumber: number) {
        for(let i = 0; i < 5; i++) {
            this.Numbers[i].forEach(currNumber => {
                currNumber.IsMarked = currNumber.IsMarked ? true : currNumber.NumberValue === CalledNumber;
            });
        }
        return this.GetVictoryScore(CalledNumber);
    }

    GetUnmarkedNumbersSum() {
        let sum = 0;
        this.Numbers.forEach(currRow => {
            sum += currRow.map(x => x.IsMarked ? 0 : x.NumberValue).reduce((acc, curr) => acc + curr);
        });
        return sum;
    }

    IsComplete(): boolean {
        for(let i = 0; i < 5; i++) {
            let isHorizontal = true;
            let isVertical = true;

            for(let j = 0; j < 5; j++) {
                if(!this.Numbers[i][j].IsMarked) {
                    isHorizontal = false;
                }
                if(!this.Numbers[j][i].IsMarked) {
                    isVertical = false;
                }
            }

            if(isHorizontal || isVertical) {
                return true;
            }
        }
        return false;
    }

    GetVictoryScore(calledNumber: number): number {
        if(this.IsComplete()) {
            return this.GetUnmarkedNumbersSum() * calledNumber;
        }
        return 0;
    }

    toString() {
        let res = "";
        this.Numbers.forEach(num => {
            res += num.map(x => `${x.NumberValue}[${x.IsMarked ? 1 : 0}]`).join(" ") + "\n";
        });
        return res;
    }
}

const boards:BingoBoard[] = [];

for(let i = 0; i < boardsRows.length / 5; i++) {
    boards.push(new BingoBoard(boardsRows.slice(i * 5, i * 5 + 5)));
}
let firstWin: number | null = null;
let lastWin: number | null = null;
for(let i = 0; i < sequence.length; i++) {
    for(let j = 0; j < boards.length; j++) {
        const board = boards[j];
        const res = board.MarkNumber(sequence[i]);
        if(board.IsComplete() && !firstWin) {
            firstWin = res;
        }
        if(board.IsComplete() && !lastWin && boards.filter(x => x.IsComplete()).length === boards.length) {
            lastWin = res;
        }
    }
    if(firstWin && lastWin) {
        break;
    }
}

console.log(`First win score: ${firstWin}, last win score: ${lastWin}`);