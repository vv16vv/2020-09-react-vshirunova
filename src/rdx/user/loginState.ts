export interface LoginState {
    userName?: string;
    isLoggingOut: boolean;
}

export const defaultLoginState: LoginState = {
    isLoggingOut: false,
    userName: undefined,
}