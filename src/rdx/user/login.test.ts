import {testedUser, userLoggedIn} from "@/rdx/testConstants";
import {defaultLoginState} from "@/rdx/user/loginState";
import userSlice, {login} from "@/rdx/user/userSlice"

describe("Login action should", () => {
    it('pass with correct name', () => {
        const state = userSlice(defaultLoginState, {
            type: login.type,
            payload: {
                userName: testedUser
            }
        });
        expect(state)
            .toStrictEqual(userLoggedIn);
    });
    it('fail with empty name', () => {
        const state = userSlice(defaultLoginState, {
            type: login.type,
            payload: {
                userName: ''
            }
        });
        expect(state).toStrictEqual(defaultLoginState);
    });
})
