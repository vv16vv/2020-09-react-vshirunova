import {loginKey, LoginStorage} from "@/logic/LoginStorage";

describe("Storage", () => {

    const login = "vitkus";

    it("should be able to add the login", () => {
        LoginStorage.putNameToStorage(login)
        expect(global.localStorage.getItem(loginKey) !== null)
    });

    it("should be able to detect whether no login is added ", () => {
        expect(LoginStorage.isNameSet()).toBeFalsy()
    })

    it("should be able to detect whether the login is added ", () => {
        LoginStorage.putNameToStorage(login)
        expect(LoginStorage.isNameSet()).toBeTruthy()
    })

    it("should be able to return the added earlier login ", () => {
        LoginStorage.putNameToStorage(login)
        expect(LoginStorage.getCurrentName()).toBe(login)
    })

    it("should be able to remove the added earlier login ", () => {
        LoginStorage.putNameToStorage(login)
        LoginStorage.clearName()
        expect(LoginStorage.isNameSet()).toBeFalsy()
    })

    afterEach(() => {
        global.localStorage.removeItem(loginKey)
    })

});