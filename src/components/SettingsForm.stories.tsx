import React from "react";
import {SettingsForm} from "./SettingsForm";
import {action} from "@storybook/addon-actions";

export default {
    title: "Jumping Cell Game Settings Story",
}

export const SettingsStory: React.FC<{}> = () => {
    return <SettingsForm onSubmit={action("apply changes")}/>
};