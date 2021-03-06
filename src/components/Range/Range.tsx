import React, {ChangeEvent, useCallback, useState} from "react";

import {RangeBlock, StyledRange} from "@/components/styled/StyledComponents";
import {CenteredLabel, RangeLabel} from "@/components/styled/StyledTextComponents";

export interface RangeProp {
    name: string;
    min?: number;
    max: number;
    step?: number;
    value: number;
    changeHandler: (field: string, newValue: number) => void;
}

export const Range: React.FC<RangeProp> = ({name, min, max, step, value, changeHandler}) => {
    const realMin = min ?? 1;
    const [currentValue, setCurValue] = useState(value);

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newValue = +event?.target?.value ?? realMin;
        changeHandler(name,newValue);
        setCurValue(newValue);
    }, []);

    return (<RangeBlock>
        <div><CenteredLabel>{currentValue}</CenteredLabel></div>
        <div>
            <RangeLabel>{realMin}</RangeLabel>
            <StyledRange
                name={name}
                type="range"
                min={realMin}
                max={max}
                step={step ?? 1}
                value={currentValue}
                onChange={onChange}
            />
            <RangeLabel>{max}</RangeLabel>
        </div>
    </RangeBlock>)
};