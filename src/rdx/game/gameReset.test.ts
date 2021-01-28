import {rootReducer} from "@/rdx/reducers";
import {gameAfterSeveralClicks, userLoggedIn} from "@/rdx/testConstants";
import {defaultGameState} from "@/rdx/game/gameState";
import {ActionTypes} from "@/rdx/actions";

it('Game reset should reset jumps, clicks, coordinates and current frequency', () => {
    const state = rootReducer({
        userReducer: userLoggedIn,
        gameReducer: gameAfterSeveralClicks
    }, {
        type: ActionTypes.GAME_RESET
    });
    expect(state).toStrictEqual({
        userReducer: userLoggedIn,
        gameReducer: defaultGameState
    });
});
