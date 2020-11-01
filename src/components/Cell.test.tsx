import React from "react";
import {render} from "enzyme";
import {Cell} from "./Cell";

describe("Cell", () => {
    it("coordinates are shown, cell is filled up", () => {
       expect(render(<Cell x={3} y={4} filled={true} />).text()).toEqual("[X] 3, 4")
    });

    it("coordinates are shown, cell is empty", () => {
       expect(render(<Cell x={3} y={4} filled={false} />).text()).toEqual("[ ] 3, 4")
    });
});