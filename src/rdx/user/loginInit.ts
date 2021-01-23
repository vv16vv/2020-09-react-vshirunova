import {Action} from "redux";

import {ActionTypes} from "@/rdx/actions";
import {LoginState} from "@/rdx/user/loginState";

export interface LoginInitPayload {
    user?: string;
    isLoggedIn: boolean;
}

export interface LoginInitAction extends Action {
    payload: LoginInitPayload
}

export const loginInit = (isLoggedIn: boolean, user: string | undefined = undefined): LoginInitAction => ({
    type: ActionTypes.loginInit,
    payload: {
        isLoggedIn,
        user
    }
});

export const loginInitReducer = (state: LoginState, payload: LoginInitPayload): LoginState => {
    const user: string | undefined = payload.user;
    const isLoggedIn: boolean = payload.isLoggedIn;
    return {
        ...state,
        user,
        isLoggedIn
    }
}
