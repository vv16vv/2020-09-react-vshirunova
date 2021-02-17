import {LoginState} from "@/rdx/user/loginState";
import {GameState} from "@/rdx/game/gameState";

export const testedUser = "vitkus"

export const userLoggedIn: LoginState = {
    isLoggingOut: false,
    userName: testedUser
}

export const gameAfterSeveralClicks: GameState = {
    width: 10,
    height: 10,
    initFrequency: 2000,
    currFrequency: 250,
    x: 8,
    y: 7,
    jumps: 3,
    clicks: 4
}

