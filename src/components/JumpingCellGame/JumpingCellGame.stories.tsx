import React from "react";
import {number, withKnobs} from "@storybook/addon-knobs";

import {RawJumpingCellGame} from "./JumpingCellGame";
import {ErrorBoundary} from "@/components/ErrorBoundary";
import {action} from "@storybook/addon-actions";

export default {
    title: "Jumping Cell Game Story",
    decorators: [withKnobs],
}

export const JumpingCellGameStory: React.FC<{}> = () => {
    const optionsDim = {
        range: true,
        min: 5,
        max: 20,
        step: 1
    };
    const optionsCoord = {
        range: true,
        min: 1,
        max: 20,
        step: 1
    };
    const optionsStat = {
        range: true,
        min: 0,
        max: 100,
        step: 1
    };
    const optionsFreq = {
        range: true,
        min: 2000,
        max: 10000,
        step: 500
    };
    const width = number("Width", 10, optionsDim);
    const height = number("Height", 10, optionsDim);
    const x = number("X", 1, optionsCoord);
    const y = number("Y", 3, optionsCoord);
    const jumps = number("Jumps", 0, optionsStat);
    const clicks = number("Clicks", 2, optionsStat);
    const frequency = number("Frequency", 5000, optionsFreq);
    return <ErrorBoundary>
            <RawJumpingCellGame
                width={width}
                height={height}
                frequency={frequency}
                x={x}
                y={y}
                jumps={jumps}
                clicks={clicks}
                onClick={action("clicked")}
                onJump={action("jump")}
                onReset={action("reset")}
            />
    </ErrorBoundary>
};