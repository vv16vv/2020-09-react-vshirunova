import {Action} from "redux";

import {ActionTypes} from "@/rdx/actions";
import {LoginState} from "@/rdx/login/loginState";

export interface IsLoggingOutPayload {
    isLoggingOut: boolean;
}

export interface IsLoggingOutAction extends Action {
    payload: IsLoggingOutPayload
}

export const isLoggingOutReducer = (state: LoginState, payload: IsLoggingOutPayload): LoginState => ({
    ...state,
    isLoggingOut: payload.isLoggingOut
});

export function isLoggingOut(isLoggingOut: boolean): IsLoggingOutAction {
    return {
        type: ActionTypes.isLoggingOut,
        payload: {
            isLoggingOut
        }
    }
}