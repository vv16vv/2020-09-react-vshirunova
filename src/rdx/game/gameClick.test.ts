import {defaultGameState} from "@/rdx/game/gameState";
import gameSlice, {click} from "@/rdx/game/gameSlice"

describe("Click on the game field should", () => {
    it('if click on the filled cell, increment clicks and jumps, decrease current frequency', () => {
        const state = gameSlice(defaultGameState, {
            type: click.type,
            payload: {
                clickX: 0,
                clickY: 0
            }
        });
        expect(state).toStrictEqual({
            width: 10,
            height: 10,
            initFrequency: 2000,
            currFrequency: 1000,
            x: 0,
            y: 0,
            jumps: 1,
            clicks: 1
        });
    })
    it('if click on the empty cell, only increment clicks', () => {
        const state = gameSlice(defaultGameState, {
            type: click.type,
            payload: {
                clickX: 3,
                clickY: 3
            }
        });
        expect(state).toStrictEqual({
            width: 10,
            height: 10,
            initFrequency: 2000,
            currFrequency: 2000,
            x: 0,
            y: 0,
            jumps: 0,
            clicks: 1
        });
    })
})