import {Action} from "redux";
import {ActionTypes} from "@/rdx/actions";
import {LoginStorage} from "@/logic/LoginStorage";

interface LoginState {
    user?: string;
    isLoggedIn: boolean;
}

const defaultLoginState: LoginState = {
    isLoggedIn: false,
}

export interface LoginPayload {
    userName: string
}

export interface LoginAction extends Action {
    payload: LoginPayload
}

export function loginReducer(state: LoginState = defaultLoginState, action: LoginAction): LoginState {
    switch (action.type) {
        case ActionTypes.login: {
            const userName: string = action.payload.userName
            LoginStorage.putNameToStorage(userName)
            return {
                ...state,
                user: userName,
                isLoggedIn: true
            }
        }
        case ActionTypes.logout: {
            LoginStorage.clearName()
            return {
                ...state,
                user: undefined,
                isLoggedIn: false
            }
        }
        default:
            return state
    }
}

export function login(payload: LoginPayload): LoginAction {
    return {
        type: ActionTypes.login,
        payload: payload
    }
}

export function logout(): Action {
    return {
        type: ActionTypes.logout,
    }
}
