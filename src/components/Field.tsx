import React from "react";
import {Cell} from "./Cell";
import './../css/styles.css';

interface FieldProp {
    width: number;
    height: number;
    filledCells: Array<{ x: number, y: number }>;
}

export const Field: React.FC<FieldProp> = (({width, height, filledCells}) => {
    let divs = [];
    for (let h = 1; h <= height; h++) {
        let cells = [];
        for (let w = 1; w <= width; w++) {
            const isFilled = filledCells.filter(point => point.x === w && point.y === h).length > 0;
            cells.push({
                x: w,
                y: h,
                filled: isFilled
            });
        }
        divs.push(cells);
    }
    return <table>
        {divs.map((line, i) => {
            return <tr>
                {line.map((cell, j) => {
                    return <Cell key={i * j} x={cell.x} y={cell.y} filled={cell.filled}/>
                })}
            </tr>;
        })}
    </table>;
});