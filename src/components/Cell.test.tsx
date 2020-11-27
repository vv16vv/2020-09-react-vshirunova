import React from "react";
import {shallow} from "enzyme";
import {Cell} from "./Cell";

describe("Cell", () => {

    const clickHandler = jest.fn();
    const x = 3;
    const y = 4;

    it('should pass coordinates to the onClick handler', () => {

        const wrapper = shallow(
            <Cell x={x} y={y} filled={false} clickHandler={clickHandler}/>
        );

        wrapper.simulate('click');

        expect(clickHandler).toBeCalledWith(x, y);
    });
});