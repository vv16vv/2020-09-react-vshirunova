import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";
import {Range} from "./Range";

describe("Range", () => {

    const changeHandler = jest.fn();
    const min = 1;
    const max = 10;
    const step = 1;
    const initialValue = 5;

    it("should show min, max and current value - all props", () => {
        expect(renderer.create(
            <Range
                min={min}
                max={max}
                step={step}
                value={initialValue}
                changeHandler={changeHandler}/>
            ).toJSON()
        ).toMatchSnapshot();
    });

    it("should show min, max and current value - only required props", () => {
        expect(renderer.create(
            <Range
                max={max}
                value={initialValue}
                changeHandler={changeHandler}/>
            ).toJSON()
        ).toMatchSnapshot();
    });

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