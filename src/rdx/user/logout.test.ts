import {userLoggedIn} from "@/rdx/testConstants";
import {defaultLoginState} from "@/rdx/user/loginState";
import userSlice, {logout} from "@/rdx/user/userSlice"

describe("logout", () => {
    it('should process user state log in to out', () => {
        const state = userSlice(userLoggedIn, {
            type: logout.type,
        });
        expect(state)
            .toStrictEqual(defaultLoginState);
    });

})