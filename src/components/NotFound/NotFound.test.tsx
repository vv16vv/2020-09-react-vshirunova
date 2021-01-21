import 'jsdom-global/register';
import React from "react";
import {mount} from "enzyme";

import {NotFound} from "./NotFound";

describe("NotFound component", () => {

    const clickHandler = jest.fn();
    const notFoundPath = "notFound";


    it('should pass onClick handler', () => {
        const wrapper = mount(
            <NotFound notFoundPath={notFoundPath} onBack={clickHandler}/>
        );

        wrapper
            .find("button")
            .simulate('click');

        expect(clickHandler).toBeCalled();
    });
});