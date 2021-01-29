/**
 * @jest-environment jsdom
 */
import {testedUser, userLoggedIn} from "@/rdx/testConstants";
import {rootReducer} from "@/rdx/reducers";
import {ActionTypes} from "@/rdx/actions";
import {defaultLoginState} from "@/rdx/user/loginState";
import {defaultGameState} from "@/rdx/game/gameState";

describe("Initialize the store accordingly to local storage state", () => {
    it('if login is set already', () => {
        const state = rootReducer({
            userReducer: defaultLoginState,
            gameReducer: defaultGameState
        }, {
            type: ActionTypes.INIT,
            payload: {
                isLoggedIn: true,
                user: testedUser
            }
        });
        expect(state).toStrictEqual({
            userReducer: userLoggedIn,
            gameReducer: defaultGameState
        });
    });

    it('if login is not set', () => {
        const state = rootReducer({
            userReducer: defaultLoginState,
            gameReducer: defaultGameState
        }, {
            type: ActionTypes.INIT,
            payload: {
                isLoggedIn: false,
            }
        });
        expect(state).toStrictEqual({
            userReducer: defaultLoginState,
            gameReducer: defaultGameState
        });
    });
});
