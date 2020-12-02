import React from "react";
import {action} from "@storybook/addon-actions";
import {SettingsForm} from "./SettingsForm";

export default {
    title: "Jumping Cell Game Settings Story (using state)",
}

export const SettingsStory: React.FC<{}> = () => {
    return <SettingsForm onSubmit={action("apply changes")}/>
};