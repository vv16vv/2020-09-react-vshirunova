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
import {AppThunk} from "@/rdx/reducers";

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

export function loading(): AppThunk {
    return async (dispatch: Dispatch) => {
        return LoginStorage
            .isNameSet()
            .then((isNameSet) => {
                if (isNameSet) {
                    LoginStorage
                        .getCurrentName()
                        .then((userName) => {
                            if (userName !== "")
                                dispatch(init(true, userName))
                            else
                                dispatch(init(false))
                        })
                } else {
                    dispatch(init(false))
                }
            })
    };
}

export const saveName = (userName: string): AppThunk => {
    return async (dispatch: Dispatch) => {
        return LoginStorage
            .putNameToStorage(userName)
            .then(() => {
                dispatch(login(userName))
            })
            .then(() => {
                dispatch(push(Paths.Game))
            })
    };
};

export function clearName(): AppThunk {
    return async (dispatch: Dispatch<any>) => {
        dispatch(isLoggingOut(true))
        return LoginStorage
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
}
