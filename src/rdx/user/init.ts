import {Action} from "redux";

import {ActionTypes} from "@/rdx/actions";
import {LoginState} from "@/rdx/user/loginState";

export interface InitPayload {
    user?: string;
    isLoggedIn: boolean;
}

export interface InitAction extends Action {
    payload: InitPayload
}

export const init = (isLoggedIn: boolean, user: string | undefined = undefined): InitAction => ({
    type: ActionTypes.INIT,
    payload: {
        isLoggedIn,
        user
    }
});

export const loading = (): Action => ({
    type: ActionTypes.LOADING,
});

export const initReducer = (state: LoginState, payload: InitPayload): LoginState => {
    const user: string | undefined = payload.user;
    const isLoggedIn: boolean = payload.isLoggedIn;
    return {
        ...state,
        user,
        isLoggedIn
    }
}
