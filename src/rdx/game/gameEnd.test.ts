import {rootReducer} from "@/rdx/reducers";
import {gameAfterSeveralClicks, userLoggedIn} from "@/rdx/testConstants";

it('Game end does nothing with state still', () => {
    const state = rootReducer({
        userReducer: userLoggedIn,
        gameReducer: gameAfterSeveralClicks
    }, {
        type: 'gameEnd'
    });
    expect(state).toStrictEqual({
        userReducer: userLoggedIn,
        gameReducer: gameAfterSeveralClicks
    });
});
