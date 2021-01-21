import React from "react";
import {action} from "@storybook/addon-actions";
import {text, withKnobs} from "@storybook/addon-knobs";

import {NotFound} from "./NotFound";

export default {
    title: "NotFoundPage form Story",
    decorators: [withKnobs],
}

export const PageNotFoundStory: React.FC<{}> = () => {
    const path = text("Not found path", "notProcessed");

    return <NotFound notFoundPath={path} onBack={action("go back")}/>
};