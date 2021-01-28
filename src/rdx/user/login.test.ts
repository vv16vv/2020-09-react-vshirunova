/**
 * @jest-environment jsdom
 */
import {loginStorage} from "@/logic/LoginStorage";
import {testedUser, userLoggedIn} from "@/rdx/testConstants";
import {rootReducer} from "@/rdx/reducers";
import {ActionTypes} from "@/rdx/actions";
import {saveName} from "@/rdx/user/index";
import {Paths} from "@/Paths";
import {defaultLoginState} from "@/rdx/user/loginState";
import {defaultGameState} from "@/rdx/game/gameState";
import {mockStore} from "@/rdx/mockStore";

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
    describe("produce several actions", () => {
        let store: any;
        beforeEach(async () => {
            store = mockStore({
                userReducer: defaultLoginState,
                gameReducer: defaultGameState
            })
            await loginStorage.clearName()
        })

        it("in the required order", async () => {
            const expectedActions = [{
                type: ActionTypes.LOGIN,
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
            expect(store.getActions()).toStrictEqual(expectedActions)
        })
    })
})
