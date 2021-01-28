import {rootReducer} from "@/rdx/reducers";
import {gameAfterSeveralClicks, userLoggedIn} from "@/rdx/testConstants";

it('Start should begin new game with applied width, height and initial frequency; jumps and clicks should be reset', () => {
    const state = rootReducer({
        userReducer: userLoggedIn,
        gameReducer: gameAfterSeveralClicks
    }, {
        type: 'gameStart',
        payload: {
            width: 5,
            height: 3,
            frequency: 4000
        }
    });
    expect(state)
        .toStrictEqual({
            userReducer: userLoggedIn,
            gameReducer: {
                width: 5,
                height: 3,
                initFrequency: 4000,
                currFrequency: 4000,
                x: 8,
                y: 7,
                jumps: 0,
                clicks: 0
            }
        });
})