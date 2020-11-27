import React from "react";
import {shallow} from "enzyme";
import {Range} from "./Range";

describe("Range", () => {

    const changeHandler = jest.fn();
    const min = 1;
    const max = 10;
    const step = 1;
    const initialValue = 5;

    it("should set min and step when they missed", () => {
        const wrapper = shallow(
            <Range
                max={max}
                value={initialValue}
                changeHandler={changeHandler}/>
        )
            .find({type: 'range'})
            .props();
        expect(wrapper).toHaveProperty(['min'], 1)
        expect(wrapper).toHaveProperty(['step'], 1)
    });

    it('should call onChange handler', () => {
        const wrapper = shallow(
            <Range
                min={min}
                max={max}
                step={step}
                value={initialValue}
                changeHandler={changeHandler}/>
        );
        wrapper
            .find({type: 'range'})
            .simulate('change');

        expect(changeHandler).toBeCalled();
    });
});