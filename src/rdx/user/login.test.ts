/**
 * @jest-environment jsdom
 */
import {LoginStorage} from "@/logic/LoginStorage";
import {testedUser, userLoggedIn} from "@/rdx/testConstants";
import {rootReducer} from "@/rdx/reducers";
import {ActionTypes} from "@/rdx/actions";
import {Paths} from "@/Paths";
import {defaultLoginState} from "@/rdx/user/loginState";
import {defaultGameState} from "@/rdx/game/gameState";
import {mockStore} from "@/rdx/mockStore";
import {saveName, saveNameGen} from "@/saga/first";

describe("Login action should", () => {
    it('pass with correct name', () => {
        const state = rootReducer({
            userReducer: defaultLoginState,
            gameReducer: defaultGameState
        }, {
            type: 'login',
            payload: {
                userName: testedUser
            }
        });
        expect(state)
            .toEqual({
                userReducer: userLoggedIn,
                gameReducer: defaultGameState
            });
    });
    it('fail with empty name', () => {
        const state = rootReducer({
            userReducer: defaultLoginState,
            gameReducer: defaultGameState
        }, {
            type: 'login',
            payload: {
                userName: ''
            }
        });
        expect(state).toEqual({
            userReducer: defaultLoginState,
            gameReducer: defaultGameState
        });
    });
    describe("produce several actions", () => {
        let store: any;
        beforeEach(async () => {
            store = mockStore({
                userReducer: defaultLoginState,
                gameReducer: defaultGameState
            })
            await LoginStorage.clearName()
        })

        it("in the required order", async () => {
            const expectedActions = [{
                type: ActionTypes.login,
                payload: {
                    userName: testedUser
                }
            }, {
                type: "@@router/CALL_HISTORY_METHOD",
                payload: {
                    method: "push",
                    args: [Paths.Game]
                }
            }]

            await store.dispatch(saveName(testedUser))
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
