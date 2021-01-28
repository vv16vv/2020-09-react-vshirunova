import {Action} from "redux";

import {GameState} from "@/rdx/game/gameState";
import {ActionTypes} from "@/rdx/actions";

export interface GameStartPayload {
    width: number;
    height: number;
    frequency: number;
}

export interface GameStartAction extends Action {
    payload: GameStartPayload
}

export const gameStartReducer = (state: GameState, payload: GameStartPayload): GameState => {
    const {width, height, frequency} = payload
    return {
        ...state,
        width: width,
        height: height,
        initFrequency: frequency,
        currFrequency: frequency,
        clicks: 0,
        jumps: 0,
    }
}

export function gameStart(payload: GameStartPayload): GameStartAction {
    return {
        type: ActionTypes.GAME_START,
        payload: payload
    }
}