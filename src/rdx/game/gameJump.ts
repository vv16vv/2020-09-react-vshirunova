import {Action} from "redux";

import {ActionTypes} from "@/rdx/actions";
import {GameState} from "@/rdx/game/gameState";

export interface GameJumpPayload {
    seedX: number;
    seedY: number;
}

export interface GameJumpAction extends Action {
    payload: GameJumpPayload
}

const nextJumpCoord = (seed: number, quantity: number): number => {
    return Math.floor(seed * quantity + 1)
}

export const gameJumpReducer = (state: GameState, payload: GameJumpPayload): GameState => {
    const {width, height} = state;
    const {seedX, seedY} = payload
    const newX = nextJumpCoord(seedX, width);
    const newY = nextJumpCoord(seedY, height);
    return {
        ...state,
        x: newX,
        y: newY
    }
}

export function gameJump(): GameJumpAction {
    return {
        type: ActionTypes.GAME_JUMP,
        payload: {
            seedX: Math.random(),
            seedY: Math.random()
        }
    }
}