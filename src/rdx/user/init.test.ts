/**
 * @jest-environment jsdom
 */
import {testedUser, userLoggedIn} from "@/rdx/testConstants";
import {rootReducer} from "@/rdx/reducers";
import {loginStorage} from "@/logic/LoginStorage";
import {ActionTypes} from "@/rdx/actions";
import {defaultLoginState} from "@/rdx/user/loginState";
import {defaultGameState} from "@/rdx/game/gameState";
import {mockStore} from "@/rdx/mockStore";
import {loading} from "@/rdx/saga";

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

    describe('should produce action INIT in the correct state', () => {
        let store: any;
        afterEach(async () => {
            store.clearActions()
        })

        describe("if user name is absent in the local storage", () => {
            beforeEach(async () => {
                store = mockStore({
                    userReducer: defaultLoginState,
                    gameReducer: defaultGameState
                })
                await loginStorage.clearName()
            })

            it("INIT should be with isLoggedIn = false", async () => {
                const expectedActions = [{
                    type: ActionTypes.INIT,
                    payload: {
                        isLoggedIn: false,
                        user: undefined,
                    }
                }]

                await store.dispatch(loading())
                expect(store.getActions()).toStrictEqual(expectedActions)
            })
        })

        describe("if user name is present in the local storage and it's empty", () => {
            beforeEach(async () => {
                store = mockStore({
                    userReducer: defaultLoginState,
                    gameReducer: defaultGameState
                })
                await loginStorage.putNameToStorage("")
            })

            it("INIT should be with isLoggedIn = false", async () => {
                const expectedActions = [{
                    type: ActionTypes.INIT,
                    payload: {
                        isLoggedIn: false,
                        user: undefined,
                    }
                }]

                await store.dispatch(loading())
                expect(store.getActions()).toStrictEqual(expectedActions)
            })
        })

        describe("if user name is present in the local storage and it's NOT empty", () => {

            beforeEach(async () => {
                store = mockStore({
                    userReducer: defaultLoginState,
                    gameReducer: defaultGameState
                })
                await loginStorage.putNameToStorage(testedUser)
            })
            it("INIT should be with isLoggedIn = false", async () => {
                const expectedActions = [{
                    type: ActionTypes.INIT,
                    payload: {
                        isLoggedIn: true,
                        user: testedUser
                    }
                }]

                await store.dispatch(loading())
                expect(store.getActions()).toStrictEqual(expectedActions)
            })
        })
    })
});
