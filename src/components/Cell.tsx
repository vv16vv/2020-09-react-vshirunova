import React from "react";
import './../css/styles.css';

interface CellProp {
    x: number;
    y: number;
    filled: boolean;
}

export const Cell: React.FC<CellProp> = (({x, y, filled}) => {
    return (
        <td className={filled ? "filledCell" : "emptyCell"}>
            {`${x}, ${y}`}
        </td>
    )
});