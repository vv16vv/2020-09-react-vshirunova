import {rootReducer} from "@/rdx/reducers";
import {gameAfterSeveralClicks, testedUser, userLoggedIn} from "@/rdx/testConstants";

describe("isLoggingOut", () => {
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
            type: 'isLoggingOut',
            payload: {
                isLoggingOut: true
            }
        });
        expect(state).toEqual({
            userReducer: userLogOutInProcess,
            gameReducer: gameAfterSeveralClicks
        });
    });

    it('should correctly indicate end of logging out process', () => {
        const state = rootReducer({
            userReducer: userLogOutInProcess,
            gameReducer: gameAfterSeveralClicks
        }, {
            type: 'isLoggingOut',
            payload: {
                isLoggingOut: false
            }
        });
        expect(state).toEqual({
            userReducer: userLoggedIn,
            gameReducer: gameAfterSeveralClicks
        });
    });

})
