import React from "react";
import {number, withKnobs} from "@storybook/addon-knobs";
import {Provider} from "react-redux";

import {JumpingCellGame} from "./JumpingCellGame";
import {ErrorBoundary} from "@/components/ErrorBoundary";
import {userLoggedIn} from "@/rdx/testConstants";
import {mockStore} from "@/rdx/mockStore";

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
    const store = mockStore({
        userReducer: userLoggedIn,
        gameReducer: {
            width,
            height,
            initFrequency: frequency,
            currFrequency: frequency,
            x: 0,
            y: 0,
            jumps: 0,
            clicks: 0,
        }
    })
    return <ErrorBoundary>
        <Provider store={store}>
            <JumpingCellGame/>
        </Provider>
    </ErrorBoundary>
};