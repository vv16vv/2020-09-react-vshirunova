import {Dispatch} from "redux";
import {push} from "react-router-redux";

import {ActionTypes} from "@/rdx/actions";
import {LoginStorage} from "@/logic/LoginStorage";
import {Paths} from "@/Paths";
import {defaultLoginState, LoginState} from "@/rdx/login/loginState";
import {login, LoginAction, loginReducer as partialLoginReducer} from "@/rdx/login/login";
import {loginInit, LoginInitAction, loginInitReducer} from "@/rdx/login/loginInit";
import {isLoggingOut, IsLoggingOutAction, isLoggingOutReducer} from "@/rdx/login/isLoggingOut";
import {logout, LogoutAction, logoutReducer} from "@/rdx/login/logout";

type LoginActions = LoginAction
    | LogoutAction
    | LoginInitAction
    | IsLoggingOutAction

export function loginReducer(state: LoginState = defaultLoginState, action: LoginActions): LoginState {
    if (state.isLoggingOut && action.type === ActionTypes.login) return state;
    switch (action.type) {
        case ActionTypes.loginInit:
            return loginInitReducer(state, (action as LoginInitAction).payload)
        case ActionTypes.isLoggingOut:
            return isLoggingOutReducer(state, (action as IsLoggingOutAction).payload)
        case ActionTypes.login:
            return partialLoginReducer(state, (action as LoginAction).payload)
        case ActionTypes.logout:
            return logoutReducer(state)
        default:
            return state
    }
}

export const loading = () => (dispatch: Dispatch) => {
    LoginStorage
        .isNameSet()
        .then((isNameSet) => {
            if (isNameSet)
                LoginStorage
                    .getCurrentName()
                    .then((userName) => {
                        if (userName !== "")
                            dispatch(loginInit(true, userName))
                        else
                            dispatch(loginInit(false))
                    })
            else
                dispatch(loginInit(false))
        })
};

export const saveName = (userName: string) => (dispatch: Dispatch) => {
    LoginStorage
        .putNameToStorage(userName)
        .then(() => {
            dispatch(login(userName))
        })
        .then(() => {
            dispatch(push(Paths.Game))
        })
};

export const clearName = () => (dispatch: Dispatch) => {
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
};
