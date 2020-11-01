import React from "react";
import {Cell} from "./Cell";
import {boolean, number, withKnobs} from "@storybook/addon-knobs";

export default {
    title: "Cell Story",
    decorators: [withKnobs],
}

const GeneralCellStory: React.FC<{x: number, y: number, filled: boolean}> = (props) => {
    const x = number('X', props.x);
    const y = number('Y', props.y);
    const filled = boolean('Is Filled', props.filled);
    return (
        <Cell x={x} y={y} filled={filled}/>
    );
};

export const FilledCellStory: React.FC<{}> = () => {
    return <GeneralCellStory x={3} y={4} filled={true}/>
};

export const EmptyCellStory: React.FC<{}> = () => {
    return <GeneralCellStory x={3} y={4} filled={false}/>
};
