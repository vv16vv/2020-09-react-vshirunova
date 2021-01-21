import React from "react";
import {action} from "@storybook/addon-actions";

import {SettingsFormikForm} from "./SettingsFormikForm";

export default {
    title: "Jumping Cell Game Settings Story (using Formik)",
}

export const SettingsFormikStory: React.FC<{}> = () => {
    return <SettingsFormikForm onSubmit={action("apply changes")}/>
};