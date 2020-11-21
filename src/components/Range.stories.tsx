import React from "react";
import {action} from "@storybook/addon-actions";
import {number, withKnobs} from "@storybook/addon-knobs";

import {Range} from "./Range"

export default {
    title: "Range Story",
    decorators: [withKnobs],
}

const FullRange: React.FC<{ min: number, max: number, step: number, initialValue: number }> = (props) => {
    const min = number('Min', props.min);
    const max = number('Max', props.max);
    const step = number('Step', props.step);
    const value = number('Value', props.initialValue);
    return (
        <Range min={min} max={max} step={step} value={value} changeHandler={action("Value changed")}/>
    );
};

export const FullRangeStory: React.FC<{}> = () => {
    return <FullRange min={1} max={10} step={2} initialValue={4}/>
}

const PartRange: React.FC<{ max: number, initialValue: number }> = (props) => {
    const max = number('Max', props.max);
    const value = number('Value', props.initialValue);
    return (
        <Range max={max} value={value} changeHandler={action("Value changed")}/>
    );
};

export const PartRangeStory: React.FC<{}> = () => {
    return <PartRange max={10} initialValue={4}/>
}
