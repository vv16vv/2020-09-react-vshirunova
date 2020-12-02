import React from "react";
import {action} from "@storybook/addon-actions";
import {SettingsForm} from "./SettingsForm";
import {GameWithSettings} from "./GameWithSettings";

export default {
    title: "Jumping Cell Game with Settings Story",
}

export const GameWithSettingsStory: React.FC<{}> = () => {
    return <GameWithSettings/>
};