import {Action} from "redux";
import {call, put, take, takeLatest} from "redux-saga/effects"
import {push} from "react-router-redux";

import {ActionTypes} from "@/rdx/actions";
import {LoginStorage} from "@/logic/LoginStorage";
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
    while (true) {
        console.log("watch loading")
        yield takeLatest("loading", loadingGen)
    }
}

export function* watchLogout() {
    while (true) {
        yield take(ActionTypes.clearName, clearNameGen)
    }
}

export function* watchSaveName() {
    while (true) {
        yield take(ActionTypes.saveName, saveNameGen)
    }
}

export function* loadingGen() {
    console.log("loading gen")
    // const isNameSet: boolean = yield call(() => LoginStorage.isNameSet())
    // console.log("loading gen: isNameSet = ", isNameSet)
    // if (isNameSet) {
    //     const userName: string = yield call(() => LoginStorage.getCurrentName())
    //     if (userName !== "")
    //         yield put(init(true, userName))
    //     else
            yield put(init(false))
    // } else yield put(init(false))
}

export function* saveNameGen(action: LoginAction) {
    const {userName} = action.payload
    yield call(() => LoginStorage.putNameToStorage(userName))
    yield put(login(userName))
    yield put(push(Paths.Game))
}

export function* clearNameGen() {
    yield put(isLoggingOut(true))
    yield call(() => LoginStorage.clearName())
    yield put(logout())
    yield put(isLoggingOut(false))
    yield put(push(Paths.Root))
}