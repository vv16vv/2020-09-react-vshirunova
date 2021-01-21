import React from "react";

import {StyledTd} from "@/components/styled/StyledComponents";

interface CellProp {
    x: number;
    y: number;
    filled: boolean;
    clickHandler: (x: number, y: number) => void;
}

export const Cell: React.FC<CellProp> = (({x, y, filled, clickHandler}) => {
    const filledSign = filled ? "X" : " ";
    const id = `id${x}-${y}`;
    return (
        <StyledTd filled={filled} id={id} onClick={() => clickHandler(x, y)}>
            {filledSign}
        </StyledTd>
    )
});