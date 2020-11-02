import 'jsdom-global/register';
import React from "react";
import {mount, render} from "enzyme";
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

    it("table 1x1 with filled cell", () => {
        expect(render(<Field
            width={1} height={1}
            filledCells={[{x: 1, y: 1}]}
            clickHandler={clickHandler}/>).text()).toEqual("[X] 1, 1")
    });

    it("table 1x1 with empty cell", () => {
        expect(render(<Field
            width={1} height={1}
            filledCells={[]}
            clickHandler={clickHandler}/>).text()).toEqual("[ ] 1, 1")
    });

    it("table 3x4 with different cells", () => {
        expect(render(
            <Field
                width={3}
                height={4}
                filledCells={filledCellsData}
                clickHandler={clickHandler}/>
            ).text()
        ).toEqual("[X] 1, 1[ ] 2, 1[ ] 3, 1[ ] 1, 2[X] 2, 2[ ] 3, 2[ ] 1, 3[ ] 2, 3[ ] 3, 3[ ] 1, 4[ ] 2, 4[X] 3, 4")
    });


    it('table should pass onClick handler to nested cells', () => {
        const x = 1;
        const y = 1;
        const onClickParams = {
            x: x,
            y: y
        }

        const wrapper = mount(
            <Field width={1} height={1} filledCells={filledCellsData} clickHandler={clickHandler}/>
        );

        expect(wrapper).toMatchSnapshot();

        wrapper
            .find('td')
            .simulate('click', {
                target: onClickParams,
            });

        expect(clickHandler).toBeCalledWith(x, y);
    });
});