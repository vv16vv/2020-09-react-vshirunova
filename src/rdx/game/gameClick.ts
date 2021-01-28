import {Action} from "redux";
import {ActionTypes} from "@/rdx/actions";
import {GameState} from "@/rdx/game/gameState";

interface GameClickPayload {
    clickX: number;
    clickY: number;
}

export interface GameClickAction extends Action {
    payload: GameClickPayload
}

const increaseFrequency = (oldFrequency: number): number => {
    return Math.max(10, Math.round(oldFrequency / 2))
}

export const gameClickReducer = (state: GameState, payload: GameClickPayload): GameState => {
    const {clicks, x, y} = state
    const {clickX, clickY} = payload
    let jumps = state.jumps
    let fieldFrequency = state.currFrequency
    if (x === clickX && y === clickY) {
        fieldFrequency = increaseFrequency(fieldFrequency)
        jumps++
    }
    return {
        ...state,
        clicks: clicks + 1,
        jumps: jumps,
        currFrequency: fieldFrequency
    }
};

export const gameClick = (payload: GameClickPayload): GameClickAction => ({
    type: ActionTypes.GAME_CLICK,
    payload
});