import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {defaultLoginState} from "@/rdx/user/loginState";
import {ActionTypes} from "@/rdx/actions";

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
        init: (state, action: PayloadAction<Partial<LoginPayload>>) => {
            const {userName} = action.payload
            if (userName !== undefined && userName !== "") {
                state.userName = action.payload.userName
            }
        },
        isLoggingOut: (state, action: PayloadAction<IsLoggingOutPayload>) => {
            state.isLoggingOut = action.payload.isLoggingOut;
        },
        login: (state, action: PayloadAction<LoginPayload>) => {
            const {userName} = action.payload
            if (userName !== undefined && userName !== "") {
                state.userName = action.payload.userName
            }
        },
        logout: (state) => {
            state.userName = undefined
        }
    }
})

export const loading = createAction(ActionTypes.LOADING);
export const clearName = createAction(ActionTypes.CLEAR_NAME);
export const saveName = createAction<LoginPayload>(ActionTypes.SAVE_NAME);

export const {init, isLoggingOut, login, logout} = userSlice.actions

export default userSlice.reducer