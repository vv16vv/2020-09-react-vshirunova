import {Action} from "redux";

interface GameState {
    field_width: number;
    field_height: number;
    field_frequency: number;
}

const defaultGameState: GameState = {
    field_width: 10,
    field_height: 10,
    field_frequency: 2
}

interface GamePayload {
}

export interface GameAction extends Action {
    payload: GamePayload
}

export function gameReducer(state: GameState = defaultGameState, action: GameAction): GameState {
    return state
}
