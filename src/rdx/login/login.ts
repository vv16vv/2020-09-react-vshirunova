import {Action} from "redux";

import {ActionTypes} from "@/rdx/actions";
import {LoginState} from "@/rdx/login/loginState";

export interface LoginPayload {
    userName: string
}

export interface LoginAction extends Action {
    payload: LoginPayload
}

export const login = (userName: string): LoginAction => ({
    type: ActionTypes.login,
    payload: {userName}
});

export const loginReducer = (state: LoginState, payload: LoginPayload): LoginState => ({
    ...state,
    user: payload.userName,
    isLoggedIn: true
})