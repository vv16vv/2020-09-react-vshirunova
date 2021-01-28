import {rootReducer} from "@/rdx/reducers";
import {userLoggedIn} from "@/rdx/testConstants";
import {defaultGameState} from "@/rdx/game/gameState";

it('Game jump should calculate new coordinates', () => {
    const state = rootReducer({
        userReducer: userLoggedIn,
        gameReducer: defaultGameState
    }, {
        type: 'gameJump',
        payload: {
            seedX: 0.2567296167753027,
            seedY: 0.5600669849441537
        }
    });
    expect(state).toStrictEqual({
        userReducer: userLoggedIn,
        gameReducer: {
            width: 10,
            height: 10,
            initFrequency: 2000,
            currFrequency: 2000,
            x: 3,
            y: 6,
            jumps: 0,
            clicks: 0
        }
    });
});
