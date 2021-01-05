export const loginKey = "login"

export class LoginStorage {
    static putNameToStorage(name: string) {
        global.localStorage.setItem(loginKey, name)
    }

    static isNameSet(): boolean {
        return global.localStorage.getItem(loginKey) !== null
    }

    static getCurrentName(): string {
        return global.localStorage.getItem(loginKey)!!
    }

    static clearName() {
        global.localStorage.removeItem(loginKey)
    }
}