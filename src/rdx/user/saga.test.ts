/**
 * @jest-environment jsdom
 */
import {clearNameGen, loadingGen, saveName, saveNameGen} from "@/rdx/user/saga";
import {expectSaga} from "redux-saga-test-plan";

import userSlice from "@/rdx/user/userSlice";
import {testedUser, userLoggedIn} from "@/rdx/testConstants";
import {defaultLoginState} from "@/rdx/user/loginState";
import {loginKey, loginStorage} from "@/logic/LoginStorage";

describe("User Saga", () => {

    afterEach(async () => {
        await global.localStorage.removeItem(loginKey)
    })

    it("Clear name should transfer state from logged in one to logged out", () => {
        return expectSaga(clearNameGen)
            .withReducer(userSlice)
            .withState(userLoggedIn)
            .hasFinalState(defaultLoginState)
            .run()
    })

    it("Save name should transfer state from logged out one to logged in", () => {
        const sagaArgs = {
            type: saveName.type,
            payload: {
                userName: testedUser
            }
        }
        return expectSaga(saveNameGen, sagaArgs)
            .withReducer(userSlice)
            .withState(defaultLoginState)
            .hasFinalState(userLoggedIn)
            .run()
    })

    it("Loading should detect 'logged out' state if no name is set", () => {
        return expectSaga(loadingGen)
            .withState(defaultLoginState)
            .withReducer(userSlice)
            .hasFinalState(defaultLoginState)
            .run()
    })

    it("Loading should detect 'logged out' state if empty name is set", async () => {
        await loginStorage.putNameToStorage("")
        return expectSaga(loadingGen)
            .withState(defaultLoginState)
            .withReducer(userSlice)
            .hasFinalState(defaultLoginState)
            .run()
    })

    it("Loading should detect 'logged in' state if a name is set", async () => {
        await loginStorage.putNameToStorage(testedUser)
        return expectSaga(loadingGen)
            .withState(defaultLoginState)
            .withReducer(userSlice)
            .hasFinalState(userLoggedIn)
            .run()
    })
})