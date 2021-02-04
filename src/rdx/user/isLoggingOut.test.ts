import {testedUser, userLoggedIn} from "@/rdx/testConstants";
import userSlice, {isLoggingOut} from "@/rdx/user/userSlice"

describe("IS_LOGGING_OUT", () => {
    const userLogOutInProcess = {
        isLoggedIn: true,
        isLoggingOut: true,
        user: testedUser
    }

    it('should correctly indicate start of logging out process', () => {
        const state = userSlice(userLoggedIn, {
            type: isLoggingOut.type,
            payload: {
                isLoggingOut: true
            }
        });
        expect(state).toStrictEqual(userLogOutInProcess);
    });

    it('should correctly indicate end of logging out process', () => {
        const state = userSlice(userLogOutInProcess, {
            type: isLoggingOut.type,
            payload: {
                isLoggingOut: false
            }
        });
        expect(state).toStrictEqual(userLoggedIn);
    });

})
