import {Dispatch} from "redux";
import {push} from "react-router-redux";

import {ActionTypes} from "@/rdx/actions";
import {LoginStorage} from "@/logic/LoginStorage";
import {Paths} from "@/Paths";
import {defaultLoginState, LoginState} from "@/rdx/user/loginState";
import {login, LoginAction, loginReducer} from "@/rdx/user/login";
import {init, InitAction, initReducer} from "@/rdx/user/init";
import {isLoggingOut, IsLoggingOutAction, isLoggingOutReducer} from "@/rdx/user/isLoggingOut";
import {logout, LogoutAction, logoutReducer} from "@/rdx/user/logout";

type LoginActions = LoginAction
    | LogoutAction
    | InitAction
    | IsLoggingOutAction

export function userReducer(state: LoginState = defaultLoginState, action: LoginActions): LoginState {
    if (state.isLoggingOut && action.type === ActionTypes.login) return state;
    switch (action.type) {
        case ActionTypes.init:
            return initReducer(state, (action as InitAction).payload)
        case ActionTypes.isLoggingOut:
            return isLoggingOutReducer(state, (action as IsLoggingOutAction).payload)
        case ActionTypes.login:
            return loginReducer(state, (action as LoginAction).payload)
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
                            dispatch(init(true, userName))
                        else
                            dispatch(init(false))
                    })
            else
                dispatch(init(false))
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
