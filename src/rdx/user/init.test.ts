import {testedUser, userLoggedIn} from "@/rdx/testConstants";
import {defaultLoginState} from "@/rdx/user/loginState";
import userSlice, {init} from "@/rdx/user/userSlice"

describe("Initialize the store accordingly to local storage state", () => {
    it('if login is set already', () => {
        const state = userSlice(defaultLoginState, {
            type: init.type,
            payload: {
                userName: testedUser
            }
        });
        expect(state).toStrictEqual(userLoggedIn);
    });

    it('if login is not set', () => {
        const state = userSlice(defaultLoginState, {
            type: init.type,
            payload: {
                userName: undefined,
            }
        });
        expect(state).toStrictEqual(defaultLoginState);
    });

    it('if login is set to empty string', () => {
        const state = userSlice(defaultLoginState, {
            type: init.type,
            payload: {
                userName: "",
            }
        });
        expect(state).toStrictEqual(defaultLoginState);
    });
});
