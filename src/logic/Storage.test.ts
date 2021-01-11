/**
 * @jest-environment jsdom
 */
import {loginKey, LoginStorage} from "@/logic/LoginStorage";

describe("Storage", () => {

    const login = "vitkus";

    it("should be able to add the login", async () => {
        await LoginStorage.putNameToStorage(login)
        expect(await global.localStorage.getItem(loginKey) !== null)
    });

    it("should be able to detect whether no login is added ", async () => {
        expect(await LoginStorage.isNameSet()).toBeFalsy()
    })

    it("should be able to detect whether the login is added ", async () => {
        await LoginStorage.putNameToStorage(login)
        expect(await LoginStorage.isNameSet()).toBeTruthy()
    })

    it("should be able to return the added earlier login ", async () => {
        await LoginStorage.putNameToStorage(login)
        expect(await LoginStorage.getCurrentName()).toBe(login)
    })

    it("should be able to remove the added earlier login ", async () => {
        await LoginStorage.putNameToStorage(login)
        await LoginStorage.clearName()
        expect(await LoginStorage.isNameSet()).toBeFalsy()
    })

    afterEach(async () => {
        await global.localStorage.removeItem(loginKey)
    })

});