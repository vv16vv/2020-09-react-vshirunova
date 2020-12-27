import React from "react";
import {action} from "@storybook/addon-actions";
import {SettingsForm} from "./SettingsForm";
import {number} from "@storybook/addon-knobs";

export default {
    title: "Jumping Cell Game Settings Story (using state)",
}

export const SettingsStory: React.FC<{}> = () => {
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
    const width = number("Width", 10, optionsDimension);
    const height = number("Height", 10, optionsDimension);
    const frequency = number("Frequency", 5000, optionsFreq);
    return <SettingsForm
      width={width}
      height={height}
      frequency={frequency}
      onSubmit={action("apply changes")}
    />
};