/**
 * @jest-environment jsdom
 */
import {userLoggedIn} from "@/rdx/testConstants";
import {ActionTypes} from "@/rdx/actions";
import {rootReducer} from "@/rdx/reducers";
import {defaultLoginState} from "@/rdx/user/loginState";
import {defaultGameState} from "@/rdx/game/gameState";

describe("logout", () => {
    it('should process user state log in to out', () => {
        const state = rootReducer({
            userReducer: userLoggedIn,
            gameReducer: defaultGameState
        }, {
            type: ActionTypes.LOGOUT,
        });
        expect(state)
            .toStrictEqual({
                userReducer: defaultLoginState,
                gameReducer: defaultGameState
            });
    });

})