import 'jsdom-global/register';
import React from "react";
import {mount} from "enzyme";
import {act} from "@testing-library/react";

import {SettingsFormikForm} from "./SettingsFormikForm";

describe("Settings form", () => {

  const submitHandler = jest.fn();

  it("should process submit", async () => {
    await act(async () => {
      const wrapper = mount(
        <SettingsFormikForm onSubmit={submitHandler}/>
      );
      wrapper
        .find('SettingsFormikForm')
        .simulate('submit');
    });
    expect(submitHandler).toHaveBeenCalled()
  });

});