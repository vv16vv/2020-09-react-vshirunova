import {Action} from "redux";
import {ActionTypes} from "@/rdx/actions";

interface GameState {
    width: number;
    height: number;
    initFrequency: number;
    currFrequency: number;
    x: number;
    y: number;
    jumps: number;
    clicks: number;
}

const defaultGameState: GameState = {
    width: 10,
    height: 10,
    initFrequency: 2000,
    currFrequency: 2000,
    x: 0,
    y: 0,
    jumps: 0,
    clicks: 0,
}

interface GameClickPayload {
    clickX: number;
    clickY: number;
}

export interface GameClickAction extends Action {
    payload: GameClickPayload
}

export interface GameJumpAction extends Action {
}

export interface GameEndAction extends Action {
}

export interface GameResetAction extends Action {
}

export interface GameStartPayload {
    width: number;
    height: number;
    frequency: number;
}

export interface GameStartAction extends Action {
    payload: GameStartPayload
}

type GameAction = GameClickAction
    | GameJumpAction
    | GameEndAction
    | GameStartAction
    | GameResetAction

const nextRandomCoord = (quantity: number): number => {
    return Math.floor(Math.random() * quantity + 1)
}

const increaseFrequency = (oldFrequency: number): number => {
    return Math.max(10, Math.round(oldFrequency / 2))
}

export function gameReducer(state: GameState = defaultGameState, action: GameAction): GameState {
    switch (action.type) {
        case ActionTypes.gameStart: {
            const {width, height, frequency} = (action as GameStartAction).payload
            return {
                ...state,
                width: width,
                height: height,
                initFrequency: frequency,
                currFrequency: frequency,
            }
        }
        case ActionTypes.gameEnd: {
            return {
                ...state
            }
        }
        case ActionTypes.gameReset: {
            return {
                ...state,
                currFrequency: state.initFrequency,
                clicks: 0,
                jumps: 0,
                x: 0,
                y: 0,
            }
        }
        case ActionTypes.gameClick: {
            const {clicks, x, y} = state
            const {clickX, clickY} = (action as GameClickAction).payload
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
        }
        case ActionTypes.gameJump: {
            const {width, height} = state;
            const newX = nextRandomCoord(width);
            const newY = nextRandomCoord(height);
            return {
                ...state,
                x: newX,
                y: newY
            }
        }
        default:
            return state;
    }
}

export function gameStart(payload: GameStartPayload): GameStartAction {
    return {
        type: ActionTypes.gameStart,
        payload: payload
    }
}

export function gameEnd(): GameEndAction {
    return {
        type: ActionTypes.gameEnd,
    }
}

export function gameReset(): GameEndAction {
    return {
        type: ActionTypes.gameReset,
    }
}

export function gameClick(payload: GameClickPayload): GameClickAction {
    return {
        type: ActionTypes.gameClick,
        payload: payload
    }
}

export function gameJump(): GameJumpAction {
    return {
        type: ActionTypes.gameJump,
    }
}
