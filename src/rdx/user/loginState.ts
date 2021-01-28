export interface LoginState {
    user?: string;
    isLoggedIn: boolean;
    isLoggingOut: boolean;
}

export const defaultLoginState: LoginState = {
    isLoggedIn: false,
    isLoggingOut: false,
    user: undefined,
}