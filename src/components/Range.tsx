import React, {ChangeEvent} from "react";
import {RangeBlock, StyledRange} from "./StyledComponents";
import {CenteredLabel, RangeLabel} from "./StyledTextComponents";

export interface RangeProp {
    min?: number;
    max: number;
    step?: number;
    value: number;
    changeHandler: (event: ChangeEvent) => void;
}

export const Range: React.FC<RangeProp> = ({min, max, step, value, changeHandler}) => {
    const realMin = min !== undefined ? min : 1;
    return (<RangeBlock>
        <div><CenteredLabel>{value}</CenteredLabel></div>
        <div>
            <RangeLabel>{realMin}</RangeLabel>
            <StyledRange
                type="range"
                min={realMin}
                max={max}
                step={step !== undefined ? step : 1}
                defaultValue={value}
                onChange={changeHandler}
            />
            <RangeLabel>{max}</RangeLabel>
        </div>
    </RangeBlock>)
};