import {loginKey, loginStorage} from "@/logic/LoginStorage";

describe("Storage", () => {

    const login = "vitkus";

    it("should be able to add the login", () => {
        loginStorage.putNameToStorage(login)
        expect(global.localStorage.getItem(loginKey) !== null)
    });

    it("should be able to detect whether no login is added ", () => {
        expect(loginStorage.isNameSet()).toBeFalsy()
    })

    it("should be able to detect whether the login is added ", () => {
        loginStorage.putNameToStorage(login)
        expect(loginStorage.isNameSet()).toBeTruthy()
    })

    it("should be able to return the added earlier login ", () => {
        loginStorage.putNameToStorage(login)
        expect(loginStorage.getCurrentName()).toBe(login)
    })

    it("should be able to remove the added earlier login ", () => {
        loginStorage.putNameToStorage(login)
        loginStorage.clearName()
        expect(loginStorage.isNameSet()).toBeFalsy()
    })

    afterEach(() => {
        global.localStorage.removeItem(loginKey)
    })

});