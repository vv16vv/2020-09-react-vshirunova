import 'jsdom-global/register';
import React from "react";
import {SettingsForm} from "./SettingsForm";
import {mount} from "enzyme";

describe("Settings form", () => {

    const submitHandler = jest.fn();

    it("should process submit", () => {
        const wrapper = mount(
            <SettingsForm onSubmit={submitHandler}/>
        );
        wrapper
            .find(SettingsForm)
            .simulate('submit')
        expect(submitHandler).toBeCalled()
    });

});