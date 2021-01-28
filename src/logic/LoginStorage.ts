export const loginKey = "login"

export const loginStorage = {
    async putNameToStorage(name: string) {
        await global.localStorage.setItem(loginKey, name)
    },

    async isNameSet(): Promise<boolean> {
        const loginValue = await global.localStorage.getItem(loginKey)
        return loginValue !== null && loginValue !== ""
    },

    async getCurrentName(): Promise<string> {
        return global.localStorage.getItem(loginKey) ?? "";
    },

    async clearName() {
        await global.localStorage.removeItem(loginKey)
    }
}