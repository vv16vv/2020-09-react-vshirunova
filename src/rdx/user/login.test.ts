/**
 * @jest-environment jsdom
 */
import {testedUser, userLoggedIn} from "@/rdx/testConstants";
import {rootReducer} from "@/rdx/reducers";
import {ActionTypes} from "@/rdx/actions";
import {defaultLoginState} from "@/rdx/user/loginState";
import {defaultGameState} from "@/rdx/game/gameState";

describe("Login action should", () => {
    it('pass with correct name', () => {
        const state = rootReducer({
            userReducer: defaultLoginState,
            gameReducer: defaultGameState
        }, {
            type: ActionTypes.LOGIN,
            payload: {
                userName: testedUser
            }
        });
        expect(state)
            .toStrictEqual({
                userReducer: userLoggedIn,
                gameReducer: defaultGameState
            });
    });
    it('fail with empty name', () => {
        const state = rootReducer({
            userReducer: defaultLoginState,
            gameReducer: defaultGameState
        }, {
            type: ActionTypes.LOGIN,
            payload: {
                userName: ''
            }
        });
        expect(state).toStrictEqual({
            userReducer: defaultLoginState,
            gameReducer: defaultGameState
        });
    });
})
