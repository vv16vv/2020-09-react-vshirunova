import {Action} from "redux";

import {GameState} from "@/rdx/game/gameState";
import {GameEndAction} from "@/rdx/game/gameEnd";
import {ActionTypes} from "@/rdx/actions";

export interface GameResetAction extends Action {
}

export const gameResetReducer = (state: GameState): GameState => ({
    ...state,
    currFrequency: state.initFrequency,
    clicks: 0,
    jumps: 0,
    x: 0,
    y: 0,
})

export function gameReset(): GameEndAction {
    return {
        type: ActionTypes.GAME_RESET,
    }
}