import React from "react";
import {SettingsFormikForm} from "./SettingsFormikForm";
import {action} from "@storybook/addon-actions";

export default {
    title: "Jumping Cell Game Settings Story (using Formik)",
}

export const SettingsFormikStory: React.FC<{}> = () => {
    return <SettingsFormikForm onSubmit={action("apply changes")}/>
};