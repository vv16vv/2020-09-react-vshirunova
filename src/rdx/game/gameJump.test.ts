import {defaultGameState} from "@/rdx/game/gameState";
import gameSlice, {jump} from "@/rdx/game/gameSlice"

it('Game jump should calculate new coordinates', () => {
    const state = gameSlice(defaultGameState, {
        type: jump.type,
        payload: {
            seedX: 0.2567296167753027,
            seedY: 0.5600669849441537
        }
    });
    expect(state).toStrictEqual({
        width: 10,
        height: 10,
        initFrequency: 2000,
        currFrequency: 2000,
        x: 3,
        y: 6,
        jumps: 0,
        clicks: 0
    });
});
