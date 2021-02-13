import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {defaultLoginState} from "@/rdx/user/loginState";
import {ActionTypes} from "@/rdx/actions";

interface InitPayload {
    user?: string;
    isLoggedIn: boolean;
}

interface IsLoggingOutPayload {
    isLoggingOut: boolean;
}

export interface LoginPayload {
    userName: string
}

const userSlice = createSlice({
    name: "user",
    initialState: defaultLoginState,
    reducers: {
        init: (state, action: PayloadAction<InitPayload>) => {
            state.user = action.payload.user
            state.isLoggedIn = action.payload.isLoggedIn
        },
        isLoggingOut: (state, action: PayloadAction<IsLoggingOutPayload>) => {
            state.isLoggingOut = action.payload.isLoggingOut;
        },
        login: (state, action: PayloadAction<LoginPayload>) => {
            const isLoggedIn = action.payload.userName !== undefined && action.payload.userName !== ""
            if (isLoggedIn) state.user = action.payload.userName
            state.isLoggedIn = isLoggedIn
        },
        logout: (state) => {
            state.user = undefined
            state.isLoggedIn = false
        }
    }
})

export const loading = createAction(ActionTypes.LOADING);
export const clearName = createAction(ActionTypes.CLEAR_NAME);
export const saveName = createAction<LoginPayload>(ActionTypes.SAVE_NAME);

export const {init, isLoggingOut, login, logout} = userSlice.actions

export default userSlice.reducer