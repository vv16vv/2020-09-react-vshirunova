/**
 * @jest-environment jsdom
 */
import {gameAfterSeveralClicks, testedUser, userLoggedIn} from "@/rdx/testConstants";
import {ActionTypes} from "@/rdx/actions";
import {clearName} from "@/rdx/user/index";
import {LoginStorage} from "@/logic/LoginStorage";
import {rootReducer} from "@/rdx/reducers";
import {Paths} from "@/Paths";
import {defaultLoginState} from "@/rdx/user/loginState";
import {defaultGameState} from "@/rdx/game/gameState";
import {mockStore} from "@/rdx/mockStore";

describe("logout", () => {
    describe('should produce several actions', () => {
        let store: any;
        beforeEach(async () => {
            store = mockStore({
                userReducer: defaultLoginState,
                gameReducer: gameAfterSeveralClicks
            })
            await LoginStorage.putNameToStorage(testedUser)
        })

        it("in the required order", async () => {
            const expectedActions = [{
                type: ActionTypes.isLoggingOut,
                payload: {
                    isLoggingOut: true
                }
            }, {
                type: ActionTypes.logout,
            }, {
                type: ActionTypes.isLoggingOut,
                payload: {
                    isLoggingOut: false
                }
            }, {
                type: "@@router/CALL_HISTORY_METHOD",
                payload: {
                    method: "push",
                    args: [Paths.Root]
                }
            }]

            await store.dispatch(clearName())
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should process user state log in to out', () => {
        const state = rootReducer({
            userReducer: userLoggedIn,
            gameReducer: defaultGameState
        }, {
            type: 'logout',
        });
        expect(state)
            .toEqual({
                userReducer: defaultLoginState,
                gameReducer: defaultGameState
            });
    });

})