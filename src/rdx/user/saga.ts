import {call, put, spawn, takeEvery, takeLatest} from "redux-saga/effects"
import {push} from "react-router-redux";

import {ActionTypes} from "@/rdx/actions";
import {loginStorage} from "@/logic/LoginStorage";
import {init} from "@/rdx/user/init";
import {login, LoginAction} from "@/rdx/user/login";
import {Paths} from "@/Paths";
import {isLoggingOut} from "@/rdx/user/isLoggingOut";
import {logout} from "@/rdx/user/logout";

export function* watchLoading() {
    yield takeLatest(ActionTypes.LOADING, loadingGen)
}

function* waitLogout() {
    yield takeEvery(ActionTypes.CLEAR_NAME, clearNameGen)
}

function* waitLogin() {
    yield takeEvery(ActionTypes.SAVE_NAME, saveNameGen)
}

function* loadingGen() {
    const isNameSet: boolean = yield call(() => loginStorage.isNameSet())
    if (isNameSet) {
        const userName: string = yield call(() => loginStorage.getCurrentName())
        yield put(init(true, userName))
        yield spawn(waitLogout)
    } else {
        yield put(init(false))
        yield spawn(waitLogin)
    }
}

function* saveNameGen(action: LoginAction) {
    const {userName} = action.payload
    yield call(() => loginStorage.putNameToStorage(userName))
    yield put(login(userName))
    yield put(push(Paths.Game))
    yield spawn(waitLogout)
}

function* clearNameGen() {
    yield put(isLoggingOut(true))
    yield call(() => loginStorage.clearName())
    yield put(logout())
    yield put(isLoggingOut(false))
    yield put(push(Paths.Root))
}