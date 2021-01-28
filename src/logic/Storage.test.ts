/**
 * @jest-environment jsdom
 */
import {loginKey, loginStorage} from "@/logic/LoginStorage";

describe("Storage", () => {

    const login = "vitkus";

    it("should be able to add the login", async () => {
        await loginStorage.putNameToStorage(login)
        expect(await global.localStorage.getItem(loginKey) !== null)
    });

    it("should be able to detect whether no login is added ", async () => {
        expect(await loginStorage.isNameSet()).toBeFalsy()
    })

    it("should be able to detect whether the login is added ", async () => {
        await loginStorage.putNameToStorage(login)
        expect(await loginStorage.isNameSet()).toBeTruthy()
    })

    it("should be able to return the added earlier login ", async () => {
        await loginStorage.putNameToStorage(login)
        expect(await loginStorage.getCurrentName()).toBe(login)
    })

    it("should be able to remove the added earlier login ", async () => {
        await loginStorage.putNameToStorage(login)
        await loginStorage.clearName()
        expect(await loginStorage.isNameSet()).toBeFalsy()
    })

    afterEach(async () => {
        await global.localStorage.removeItem(loginKey)
    })

});