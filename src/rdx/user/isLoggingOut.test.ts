import {rootReducer} from "@/rdx/reducers";
import {gameAfterSeveralClicks, testedUser, userLoggedIn} from "@/rdx/testConstants";
import {ActionTypes} from "@/rdx/actions";

describe("IS_LOGGING_OUT", () => {
    const userLogOutInProcess = {
        isLoggedIn: true,
        isLoggingOut: true,
        user: testedUser
    }

    it('should correctly indicate start of logging out process', () => {
        const state = rootReducer({
            userReducer: userLoggedIn,
            gameReducer: gameAfterSeveralClicks
        }, {
            type: ActionTypes.IS_LOGGING_OUT,
            payload: {
                isLoggingOut: true
            }
        });
        expect(state).toStrictEqual({
            userReducer: userLogOutInProcess,
            gameReducer: gameAfterSeveralClicks
        });
    });

    it('should correctly indicate end of logging out process', () => {
        const state = rootReducer({
            userReducer: userLogOutInProcess,
            gameReducer: gameAfterSeveralClicks
        }, {
            type: ActionTypes.IS_LOGGING_OUT,
            payload: {
                isLoggingOut: false
            }
        });
        expect(state).toStrictEqual({
            userReducer: userLoggedIn,
            gameReducer: gameAfterSeveralClicks
        });
    });

})
