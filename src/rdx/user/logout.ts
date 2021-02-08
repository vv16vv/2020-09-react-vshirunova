import {Action} from "redux";

import {ActionTypes} from "@/rdx/actions";
import {LoginState} from "@/rdx/user/loginState";

export interface LogoutAction extends Action {
}

export const logout = (): LogoutAction => ({
    type: ActionTypes.LOGOUT,
});

export const clearName = (): Action => ({
    type: ActionTypes.CLEAR_NAME,
});

export const logoutReducer = (state: LoginState): LoginState => ({
    ...state,
    user: undefined,
    isLoggedIn: false
})