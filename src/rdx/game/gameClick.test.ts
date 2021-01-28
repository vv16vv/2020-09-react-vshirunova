import {rootReducer} from "@/rdx/reducers";
import {userLoggedIn} from "@/rdx/testConstants";
import {defaultGameState} from "@/rdx/game/gameState";
import {ActionTypes} from "@/rdx/actions";

describe("Click on the game field should", () => {
    it('if click on the filled cell, increment clicks and jumps, decrease current frequency', () => {
        const state = rootReducer({
            userReducer: userLoggedIn,
            gameReducer: defaultGameState
        }, {
            type: ActionTypes.GAME_CLICK,
            payload: {
                clickX: 0,
                clickY: 0
            }
        });
        expect(state).toStrictEqual({
            userReducer: userLoggedIn,
            gameReducer: {
                width: 10,
                height: 10,
                initFrequency: 2000,
                currFrequency: 1000,
                x: 0,
                y: 0,
                jumps: 1,
                clicks: 1
            }
        });
    })
    it('if click on the empty cell, only increment clicks', () => {
        const state = rootReducer({
            userReducer: userLoggedIn,
            gameReducer: defaultGameState
        }, {
            type: ActionTypes.GAME_CLICK,
            payload: {
                clickX: 3,
                clickY: 3
            }
        });
        expect(state).toStrictEqual({
            userReducer: userLoggedIn,
            gameReducer: {
                width: 10,
                height: 10,
                initFrequency: 2000,
                currFrequency: 2000,
                x: 0,
                y: 0,
                jumps: 0,
                clicks: 1
            }
        });
    })
})