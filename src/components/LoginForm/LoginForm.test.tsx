import 'jsdom-global/register';
import React from "react";
import {mount} from "enzyme";
import {initialFormProps, LoginForm, LoginFormResult} from "./LoginForm";

describe("Login form", () => {

    const submitHandler = jest.fn();

    const defaultValues = initialFormProps;
    const changedValues: LoginFormResult = {
        login: "viel"
    };

    it("should process submit with default values", () => {
        const wrapper = mount(
            <LoginForm onSubmit={submitHandler}/>
        );
        wrapper
            .find('button')
            .simulate('submit');
        expect(submitHandler).toHaveBeenCalledWith(defaultValues)
    });

    it("should process submit with changed values", () => {
        const wrapper = mount(
            <LoginForm onSubmit={submitHandler}/>
        );
        wrapper
            .find('input[name="name"]')
            .simulate("change", {
                target: {value: changedValues.login},
            });
        wrapper
            .find('button')
            .simulate('submit');
        expect(submitHandler).toHaveBeenCalledWith(changedValues)
    });

});