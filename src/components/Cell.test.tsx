import React from "react";
import {render, shallow} from "enzyme";
import {Cell} from "./Cell";

describe("Cell", () => {

    const clickHandler = jest.fn();
    const x = 3;
    const y = 4;

    it("should show coordinates and filled up sign", () => {
        expect(render(<Cell x={x} y={y} filled={true} clickHandler={clickHandler}/>)).toMatchSnapshot();
    });

    it("should show coordinates and empty sign", () => {
        expect(render(<Cell x={x} y={y} filled={false} clickHandler={clickHandler}/>)).toMatchSnapshot();
    });

    it('should pass coordinates to the onClick handler', () => {

        const wrapper = shallow(
            <Cell x={x} y={y} filled={false} clickHandler={clickHandler}/>
        );

        wrapper.simulate('click');

        expect(clickHandler).toBeCalledWith(x, y);
    });
});