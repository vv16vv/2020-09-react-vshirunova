import {Action} from "redux";

import {ActionTypes} from "@/rdx/actions";
import {LoginState} from "@/rdx/login/loginState";

export interface LogoutAction extends Action {
}

export const logout = (): LogoutAction => ({
    type: ActionTypes.logout,
});

export const logoutReducer = (state: LoginState): LoginState => ({
    ...state,
    user: undefined,
    isLoggedIn: false
})