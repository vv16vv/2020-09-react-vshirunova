import React from "react";
import {action} from "@storybook/addon-actions";
import {LoginForm} from "./LoginForm";

export default {
    title: "Login form Story",
}

export const LoginStory: React.FC<{}> = () => {
    return <LoginForm onSubmit={action("apply changes")}/>
};