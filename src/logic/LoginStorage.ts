export const loginKey = "login"

export const loginStorage = {
    "putNameToStorage": (name: string) => {
        global.localStorage.setItem(loginKey, name)
    },

    "isNameSet": () => {
        return global.localStorage.getItem(loginKey) !== null
    },

    "getCurrentName": () => {
        return global.localStorage.getItem(loginKey)!!
    },

    "clearName": () => {
        global.localStorage.removeItem(loginKey)
    }
}