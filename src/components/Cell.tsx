import React from "react";

interface CellProp {
    x: number;
    y: number;
    filled: boolean;
    clickHandler: (x: number, y: number) => void;
}

export const Cell: React.FC<CellProp> = (({x, y, filled, clickHandler}) => {
    const filledSign = filled ? "[X]" : "[ ]";
    return (
        <td onClick={() => clickHandler(x, y)}>
            {`${filledSign} ${x}, ${y}`}
        </td>
    )
});