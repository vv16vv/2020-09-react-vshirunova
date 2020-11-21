import React, {ChangeEvent, useState} from "react";
import {RangeBlock, StyledRange} from "./StyledComponents";
import {CenteredLabel, RangeLabel} from "./StyledTextComponents";

export interface RangeProp {
    min?: number;
    max: number;
    step?: number;
    value: number;
    changeHandler: (newValue: number) => void;
}

export const Range: React.FC<RangeProp> = ({min, max, step, value, changeHandler}) => {

    const [currentValue, setCurValue] = useState(value);
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = +event.target.value;
        changeHandler(newValue);
        setCurValue(newValue);
    }

    const realMin = min !== undefined ? min : 1;
    return (<RangeBlock>
        <div><CenteredLabel>{currentValue}</CenteredLabel></div>
        <div>
            <RangeLabel>{realMin}</RangeLabel>
            <StyledRange
                type="range"
                min={realMin}
                max={max}
                step={step !== undefined ? step : 1}
                value={currentValue}
                onChange={onChange}
            />
            <RangeLabel>{max}</RangeLabel>
        </div>
    </RangeBlock>)
};