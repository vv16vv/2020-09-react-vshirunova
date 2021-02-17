import {gameAfterSeveralClicks} from "@/rdx/testConstants";
import gameSlice, {start} from "@/rdx/game/gameSlice"

it('Start should begin new game with applied width, height and initial frequency; jumps and clicks should be reset', () => {
    const state = gameSlice(gameAfterSeveralClicks, {
        type: start.type,
        payload: {
            width: 5,
            height: 3,
            frequency: 4000
        }
    });
    expect(state)
        .toStrictEqual({
            width: 5,
            height: 3,
            initFrequency: 4000,
            currFrequency: 4000,
            x: 8,
            y: 7,
            jumps: 0,
            clicks: 0
        });
})