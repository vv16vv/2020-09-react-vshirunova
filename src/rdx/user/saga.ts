import {call, put, spawn, takeEvery, takeLatest} from "redux-saga/effects"
import {push} from "react-router-redux";
import {createAction, PayloadAction} from "@reduxjs/toolkit";

import {ActionTypes} from "@/rdx/actions";
import {loginStorage} from "@/logic/LoginStorage";
import {Paths} from "@/Paths";
import {init, login, logout, isLoggingOut, LoginPayload} from "@/rdx/user/userSlice"

export const loading = createAction<{}>(ActionTypes.LOADING);
export const clearName = createAction<{}>(ActionTypes.CLEAR_NAME);
export const saveName = createAction<LoginPayload>(ActionTypes.SAVE_NAME);

export function* watchLoading() {
    yield takeLatest(loading.type, loadingGen)
}

function* waitLogout() {
    yield takeEvery(clearName.type, clearNameGen)
}

function* waitLogin() {
    yield takeEvery(saveName.type, saveNameGen)
}

export function* loadingGen() {
    const isNameSet: boolean = yield call(() => loginStorage.isNameSet())
    if (isNameSet) {
        const userName: string = yield call(() => loginStorage.getCurrentName())
        yield put(init({isLoggedIn: true, user: userName}))
        yield spawn(waitLogout)
    } else {
        yield put(init({isLoggedIn: false}))
        yield spawn(waitLogin)
    }
}

export function* saveNameGen(action: PayloadAction<LoginPayload>) {
    const {userName} = action.payload
    yield call(() => loginStorage.putNameToStorage(userName))
    yield put(login({userName}))
    yield put(push(Paths.Game))
    yield spawn(waitLogout)
}

export function* clearNameGen() {
    yield put(isLoggingOut({isLoggingOut: true}))
    yield call(() => loginStorage.clearName())
    yield put(logout())
    yield put(isLoggingOut({isLoggingOut: false}))
    yield put(push(Paths.Root))
}