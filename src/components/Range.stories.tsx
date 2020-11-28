import React from "react";
import {action} from "@storybook/addon-actions";
import {number, withKnobs} from "@storybook/addon-knobs";

import {Range} from "./Range"
import {Form, Formik} from "formik";

export default {
    title: "Range Story",
    decorators: [withKnobs],
}

export const FullRangeStory: React.FC<{}> = () => {
    const min = number('Min', 1);
    const max = number('Max', 10);
    const step = number('Step', 2);
    const value = number('Value', 4);
    return (
        <Formik initialValues={{test: value}} onSubmit={action("Form submitted")}>
            <Form>
                <Range
                    name={"test"}
                    min={min} max={max} step={step}
                    value={value}
                    changeHandler={action("Value changed")}/>
            </Form>
        </Formik>
    );
}

const PartRange: React.FC<{ max: number, initialValue: number }> = (props) => {
    const max = number('Max', props.max);
    const value = number('Value', props.initialValue);
    return (
        <Formik initialValues={{test: value}} onSubmit={action("Form submitted")}>
            <Form>
                <Range name={"test"}
                       max={max}
                       value={value}
                       changeHandler={action("Value changed")}/>
            </Form>
        </Formik>
    );
};

export const PartRangeStory: React.FC<{}> = () => {
    return <PartRange max={10} initialValue={4}/>
}
