import React from "react";
import {number, withKnobs} from "@storybook/addon-knobs";
import {JumpingCellGame} from "./JumpingCellGame";

export default {
    title: "Jumping Cell Game Story",
    decorators: [withKnobs],
}

export const JumpingCellGameStory: React.FC<{}> = () => {
    const options = {
        range: true,
        min: 5,
        max: 20,
        step: 1
    };
    const width = number("Width", 10, options);
    const height = number("Height", 10, options);
    return <JumpingCellGame width={width} height={height}/>
};