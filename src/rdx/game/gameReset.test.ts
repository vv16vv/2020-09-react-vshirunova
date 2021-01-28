import {rootReducer} from "@/rdx/reducers";
import {gameAfterSeveralClicks, userLoggedIn} from "@/rdx/testConstants";
import {defaultGameState} from "@/rdx/game/gameState";

it('Game reset should reset jumps, clicks, coordinates and current frequency', () => {
    const state = rootReducer({
        userReducer: userLoggedIn,
        gameReducer: gameAfterSeveralClicks
    }, {
        type: 'gameReset'
    });
    expect(state).toStrictEqual({
        userReducer: userLoggedIn,
        gameReducer: defaultGameState
    });
});
