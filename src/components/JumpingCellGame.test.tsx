import renderer from "react-test-renderer";
import React from "react";
import {JumpingCellGame} from "./JumpingCellGame";

describe("Jumping cell game", () => {

    const width = 3;
    const height = 4;

    it("should be rendered", () => {
        expect(renderer.create(
            <JumpingCellGame
                width={width}
                height={height}
            />
            ).toJSON()
        ).toMatchSnapshot();
    });

});