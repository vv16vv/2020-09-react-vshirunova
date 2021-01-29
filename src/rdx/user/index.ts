import {ActionTypes} from "@/rdx/actions";
import {defaultLoginState, LoginState} from "@/rdx/user/loginState";
import {LoginAction, loginReducer} from "@/rdx/user/login";
import {InitAction, initReducer} from "@/rdx/user/init";
import {IsLoggingOutAction, isLoggingOutReducer} from "@/rdx/user/isLoggingOut";
import {LogoutAction, logoutReducer} from "@/rdx/user/logout";

type LoginActions = LoginAction
    | LogoutAction
    | InitAction
    | IsLoggingOutAction

export const userReducer = (state: LoginState = defaultLoginState, action: LoginActions): LoginState => {
    if (state.isLoggingOut && action.type === ActionTypes.LOGIN) return state;
    switch (action.type) {
        case ActionTypes.INIT:
            return initReducer(state, (action as InitAction).payload)
        case ActionTypes.IS_LOGGING_OUT:
            return isLoggingOutReducer(state, (action as IsLoggingOutAction).payload)
        case ActionTypes.LOGIN:
            return loginReducer(state, (action as LoginAction).payload)
        case ActionTypes.LOGOUT:
            return logoutReducer(state)
        default:
            return state
    }
};

