import {Action} from "redux";
import {call, put, takeEvery, takeLatest} from "redux-saga/effects"
import {push} from "react-router-redux";

import {ActionTypes} from "@/rdx/actions";
import {loginStorage} from "@/logic/LoginStorage";
import {init} from "@/rdx/user/init";
import {login, LoginAction} from "@/rdx/user/login";
import {Paths} from "@/Paths";
import {isLoggingOut} from "@/rdx/user/isLoggingOut";
import {logout} from "@/rdx/user/logout";


export const loading = (): Action => ({
    type: ActionTypes.loading,
});

export const saveName = (userName: string): LoginAction => ({
    type: ActionTypes.saveName,
    payload: {
        userName
    }
});

export const clearName = (): Action => ({
    type: ActionTypes.clearName,
});

export function* watchLoading() {
    yield takeLatest(ActionTypes.loading, loadingGen)
}

export function* watchLogout() {
    yield takeEvery(ActionTypes.clearName, clearNameGen)
}

export function* watchSaveName() {
    yield takeEvery(ActionTypes.saveName, saveNameGen)
}

export function* loadingGen() {
    console.log("loading gen")
    const isNameSet: boolean = yield call(() => loginStorage.isNameSet())
    console.log("loading gen: isNameSet = ", isNameSet)
    if (isNameSet) {
        const userName: string = yield call(() => loginStorage.getCurrentName())
        if (userName !== "")
            yield put(init(true, userName))
        else
            yield put(init(false))
    } else yield put(init(false))
}

export function* saveNameGen(action: LoginAction) {
    console.log("saveName gen, action = ", action)
    const {userName} = action.payload
    yield call(() => loginStorage.putNameToStorage(userName))
    yield put(login(userName))
    yield put(push(Paths.Game))
}

export function* clearNameGen() {
    console.log("clearName gen")
    yield put(isLoggingOut(true))
    yield call(() => loginStorage.clearName())
    yield put(logout())
    yield put(isLoggingOut(false))
    yield put(push(Paths.Root))
}