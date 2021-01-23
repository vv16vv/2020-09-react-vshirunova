import {ActionTypes} from "@/rdx/actions";
import {Action} from "redux";
import {GameState} from "@/rdx/game/gameState";

export interface GameEndAction extends Action {
}

export const gameEndReducer = (state: GameState): GameState => state

export function gameEnd(): GameEndAction {
    return {
        type: ActionTypes.gameEnd,
    }
}