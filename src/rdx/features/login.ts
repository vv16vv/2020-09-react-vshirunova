import {Action, Dispatch} from "redux";

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

export interface LoginInitAction extends Action {
    payload: LoginState
}

type LoginActions = LoginAction
    | LoginInitAction

export function loginReducer(state: LoginState = defaultLoginState, action: LoginActions): LoginState {
    switch (action.type) {
        case ActionTypes.initLogin: {
            const user: string | undefined = (action as LoginInitAction).payload.user;
            const isLoggedIn: boolean = (action as LoginInitAction).payload.isLoggedIn;
            return {
                ...state,
                user,
                isLoggedIn
            }
        }
        case ActionTypes.login: {
            const user: string = (action as LoginAction).payload.userName
            return {
                ...state,
                user,
                isLoggedIn: true
            }
        }
        case ActionTypes.logout: {
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

export function initLogin(isLoggedIn: boolean, user: string | undefined = undefined): LoginInitAction {
    return {
        type: ActionTypes.login,
        payload: {
            isLoggedIn,
            user
        }
    }
}

export function login(userName: string): LoginAction {
    return {
        type: ActionTypes.login,
        payload: { userName }
    }
}

export function logout(): Action {
    return {
        type: ActionTypes.logout,
    }
}

export function loading() {
    return (dispatch: Dispatch) => {
        LoginStorage
            .isNameSet()
            .then((isNameSet) => {
                if (isNameSet)
                    LoginStorage
                        .getCurrentName()
                        .then((userName) => {
                            if(userName !== "")
                                dispatch(initLogin(true,userName))
                            else
                                dispatch(initLogin(false))
                        })
                else
                    dispatch(initLogin(false))
            })
    }
}

export function saveName(userName: string) {
    return (dispatch: Dispatch) => {
        LoginStorage
            .putNameToStorage(userName)
            .then(() => {
                dispatch(login(userName))
            })
    }
}

export function clearName() {
    return (dispatch: Dispatch) => {
        LoginStorage
            .clearName()
            .then(() => {
                dispatch(logout())
            })
    }
}
