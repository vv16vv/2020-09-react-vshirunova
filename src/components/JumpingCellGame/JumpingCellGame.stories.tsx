import React from "react";
import {number, withKnobs} from "@storybook/addon-knobs";
import {JumpingCellGame} from "./JumpingCellGame";
import {ErrorBoundary} from "cmp/ErrorBoundary";

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
    const optionsFreq = {
        range: true,
        min: 2000,
        max: 10000,
        step: 500
    };
    const width = number("Width", 10, options);
    const height = number("Height", 10, options);
    const frequency = number("Frequency", 5000, optionsFreq);
    return <ErrorBoundary>
        <JumpingCellGame width={width} height={height} frequency={frequency}/>
    </ErrorBoundary>
};