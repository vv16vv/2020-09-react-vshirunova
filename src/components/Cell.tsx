import React from "react";

interface CellProp {
    x: number;
    y: number;
    filled: boolean;
}

export const Cell: React.FC<CellProp> = (({x, y, filled}) => {
    const filledSign = filled ? "[X]" : "[ ]";
    return (
        <td>
            {`${filledSign} ${x}, ${y}`}
        </td>
    )
});