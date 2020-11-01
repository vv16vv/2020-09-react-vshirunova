import React from "react";
import {array, number, withKnobs} from "@storybook/addon-knobs";
import {action} from "@storybook/addon-actions";

import {Field} from "./Field";

export default {
    title: "Field Story",
    decorators: [withKnobs],
}

export const FieldStory: React.FC<{}> = () => {
    const options = {
        range: true,
        min: 5,
        max: 20,
        step: 1
    };
    const width = number("Width", 10, options);
    const height = number("Height", 10, options);
    const filledCellsData = [
        "1, 1",
        "2, 2",
        "3, 3",
        "3, 1",
        "1, 3",
    ];
    const filledCells = array("Filled cells", filledCellsData, ":")
        .map(cellString => {
            const parts = cellString.split(",");
            return {
                x: +parts[0],
                y: +parts[1],
            }
        });
    return <Field width={width} height={height} filledCells={filledCells} clickHandler={action("Cell clicked")}/>
};
