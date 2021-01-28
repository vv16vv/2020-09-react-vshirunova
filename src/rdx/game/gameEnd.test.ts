import {rootReducer} from "@/rdx/reducers";
import {gameAfterSeveralClicks, userLoggedIn} from "@/rdx/testConstants";
import {ActionTypes} from "@/rdx/actions";

it('Game end does nothing with state still', () => {
    const state = rootReducer({
        userReducer: userLoggedIn,
        gameReducer: gameAfterSeveralClicks
    }, {
        type: ActionTypes.GAME_END
    });
    expect(state).toStrictEqual({
        userReducer: userLoggedIn,
        gameReducer: gameAfterSeveralClicks
    });
});
