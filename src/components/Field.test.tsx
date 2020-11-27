import 'jsdom-global/register';
import React from "react";
import renderer from "react-test-renderer";
import {mount} from "enzyme";
import {Field} from "./Field";

describe("Field", () => {

    const clickHandler = jest.fn();

    const filledCellsData = [
        "1, 1",
        "2, 2",
        "3, 4",
    ].map(cellString => {
        const parts = cellString.split(",");
        return {
            x: +parts[0],
            y: +parts[1],
        }
    });

    it('table should pass onClick handler to nested cells', () => {
        const wrapper = mount(
            <Field width={2} height={2} filledCells={filledCellsData} clickHandler={clickHandler}/>
        );

        [
            {x: 1, y: 1},
            {x: 1, y: 2},
            {x: 2, y: 1},
            {x: 2, y: 2}
        ].forEach(({x, y}) => {
            console.log(`Check click for coordinates [${x}, ${y}]`)
            wrapper
                .find({x: x, y: y})
                .simulate('click');

            expect(clickHandler).toBeCalledWith(x, y);
        })
    });
});