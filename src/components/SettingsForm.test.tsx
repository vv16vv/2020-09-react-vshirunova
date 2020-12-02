import 'jsdom-global/register';
import React from "react";
import {SettingsForm} from "./SettingsForm";
import {mount} from "enzyme";
import {act} from "@testing-library/react";

describe("Settings form", () => {

    const submitHandler = jest.fn();

    it("should process submit", async () => {
        const wrapper = mount(
            <SettingsForm onSubmit={submitHandler}/>
        );
        act(() => {
            wrapper
                .find('button')
                .simulate('submit');
        });
        await expect(submitHandler).toHaveBeenCalled()
    });

});