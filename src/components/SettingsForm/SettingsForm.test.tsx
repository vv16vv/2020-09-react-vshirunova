import 'jsdom-global/register';
import React from "react";
import {mount} from "enzyme";
import {SettingsForm, SettingsFormResult} from "./SettingsForm";
import {initialGameSettings} from "cmp/GameWithSettings";

describe("Settings form", () => {

    const submitHandler = jest.fn();

    const defaultValues = initialGameSettings;
    const changedValues:SettingsFormResult = {
        width: 15,
        height: 8,
        frequency: 1000
    } ;

    it("should process submit with default values", () => {
        const wrapper = mount(
            <SettingsForm
              width={defaultValues.width}
              height={defaultValues.height}
              frequency={defaultValues.frequency}
              onSubmit={submitHandler}/>
        );
        wrapper
            .find('button')
            .simulate('submit');
        expect(submitHandler).toHaveBeenCalledWith(defaultValues)
    });

    it("should process submit with changed values", () => {
        const wrapper = mount(
          <SettingsForm
            width={defaultValues.width}
            height={defaultValues.height}
            frequency={defaultValues.frequency}
            onSubmit={submitHandler}/>
        );
        wrapper
            .find('input[name="width"]')
            .simulate("change", {
                target: { value: changedValues.width },
            });
        wrapper
            .find('input[name="height"]')
            .simulate("change", {
                target: { value: changedValues.height },
            });
        wrapper
            .find('input[name="frequency"]')
            .simulate("change", {
                target: { value: changedValues.frequency / 1000 },
            });
        wrapper
            .find('button')
            .simulate('submit');
        expect(submitHandler).toHaveBeenCalledWith(changedValues)
    });

});