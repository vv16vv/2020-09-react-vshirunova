import React from "react";
import {number, text, withKnobs} from "@storybook/addon-knobs";
import {Provider} from "react-redux";

import {SettingsForm} from "./SettingsForm";
import {userLoggedIn} from "@/rdx/testConstants";
import {mockStore} from "@/rdx/mockStore";

export default {
    title: "Jumping Cell Game Settings Story (using state)",
    decorators: [withKnobs],
}

const optionsDimension = {
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

export const NoNameSettingsStory: React.FC<{}> = () => {
    const width = number("Width", 10, optionsDimension);
    const height = number("Height", 10, optionsDimension);
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
    return <Provider store={store}>
        <SettingsForm key={width * height * frequency}/>
    </Provider>
}

export const WithNameSettingsStory: React.FC<{}> = () => {
    const width = number("Width", 10, optionsDimension);
    const height = number("Height", 10, optionsDimension);
    const frequency = number("Frequency", 5000, optionsFreq);
    const userName = text("User name", "Vitkus");
    const store = mockStore({
        userReducer: {
            isLoggedIn: true,
            isLoggingOut: false,
            user: userName
        },
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
    return <Provider store={store}>
        <SettingsForm
            key={userName + width * height * frequency}
        />
    </Provider>
}
