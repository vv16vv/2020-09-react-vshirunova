import {Action, Dispatch} from "redux";
import {push} from "react-router-redux";

import {ActionTypes} from "@/rdx/actions";
import {LoginStorage} from "@/logic/LoginStorage";
import {Paths} from "@/Paths";

interface LoginState {
    user?: string;
    isLoggedIn: boolean;
    isLoggingOut: boolean;
}

const defaultLoginState: LoginState = {
    isLoggedIn: false,
    isLoggingOut: false,
}

export interface LoginPayload {
    userName: string
}

export interface LoginAction extends Action {
    payload: LoginPayload
}

export interface LoginInitPayload {
    user?: string;
    isLoggedIn: boolean;
}

export interface LoginInitAction extends Action {
    payload: LoginInitPayload
}

export interface IsLoggingOutPayload {
    isLoggingOut: boolean;
}

export interface IsLoggingOutAction extends Action {
    payload: IsLoggingOutPayload
}

type LoginActions = LoginAction
    | LoginInitAction
    | IsLoggingOutAction

export function isLoggingOutReducer(state: LoginState, action: LoginActions): LoginState {
    switch (action.type) {
        case ActionTypes.isLoggingOut: {
            return {
                ...state,
                isLoggingOut: (action as IsLoggingOutAction).payload.isLoggingOut
            }
        }
        default:
            return state
    }
}

export function isLoggingOut(isLoggingOut: boolean): IsLoggingOutAction {
    return {
        type: ActionTypes.isLoggingOut,
        payload: {
            isLoggingOut
        }
    }
}

export function loginReducer(state: LoginState = defaultLoginState, action: LoginActions): LoginState {
    if (state.isLoggingOut && action.type === ActionTypes.login) return state;
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
        case ActionTypes.isLoggingOut:
            return isLoggingOutReducer(state, action)
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
        type: ActionTypes.initLogin,
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
            .then(() => {
                dispatch(push(Paths.Game))
            })
    }
}

export function clearName() {
    return (dispatch: Dispatch) => {
        dispatch(isLoggingOut(true))
        LoginStorage
            .clearName()
            .then(() => {
                dispatch(logout())
            })
            .then(() => {
                dispatch(isLoggingOut(false))
            })
            .then(() => {
                dispatch(push(Paths.Root))
            })
    }
}
