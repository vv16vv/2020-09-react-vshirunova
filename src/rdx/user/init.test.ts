import {testedUser, userLoggedIn} from "@/rdx/testConstants";
import {defaultLoginState} from "@/rdx/user/loginState";
import userSlice, {init} from "@/rdx/user/userSlice"

describe("Initialize the store accordingly to local storage state", () => {
    it('if login is set already', () => {
        const state = userSlice(defaultLoginState, {
            type: init.type,
            payload: {
                isLoggedIn: true,
                user: testedUser
            }
        });
        expect(state).toStrictEqual(userLoggedIn);
    });

    it('if login is not set', () => {
        const state = userSlice(defaultLoginState, {
            type: init.type,
            payload: {
                isLoggedIn: false,
            }
        });
        expect(state).toStrictEqual(defaultLoginState);
    });
});
