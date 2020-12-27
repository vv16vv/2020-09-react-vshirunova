import React from "react";
import {Cell} from "cmp/Cell";
import {StyledTable, StyledTr} from "styled/StyledComponents";

interface FieldProp {
    width: number;
    height: number;
    filledCells: Array<{ x: number, y: number }>;
    clickHandler: (x: number, y: number) => void;
}

export const Field: React.FC<FieldProp> = (({width, height, filledCells, clickHandler}) => {
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
    return <StyledTable><tbody>
        {divs.map((line, i) => {
            return <StyledTr key={i + 1}>
                {line.map((cell, j) => {
                    return <Cell
                        key={(i + 1) * (j + 1)}
                        x={cell.x}
                        y={cell.y}
                        filled={cell.filled}
                        clickHandler={clickHandler}/>
                })}
            </StyledTr>;
        })}
    </tbody></StyledTable>;
});