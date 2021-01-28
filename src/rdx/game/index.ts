import {ActionTypes} from "@/rdx/actions";
import {defaultGameState, GameState} from "@/rdx/game/gameState";
import {GameClickAction, gameClickReducer} from "@/rdx/game/gameClick";
import {GameJumpAction, gameJumpReducer} from "@/rdx/game/gameJump";
import {GameEndAction, gameEndReducer} from "@/rdx/game/gameEnd";
import {GameResetAction, gameResetReducer} from "@/rdx/game/gameReset";
import {GameStartAction, gameStartReducer} from "@/rdx/game/gameStart";

type GameActions = GameClickAction
    | GameJumpAction
    | GameEndAction
    | GameStartAction
    | GameResetAction

export const gameReducer = (state: GameState = defaultGameState, action: GameActions): GameState => {
    switch (action.type) {
        case ActionTypes.gameStart:
            return gameStartReducer(state, (action as GameStartAction).payload)
        case ActionTypes.gameEnd:
            return gameEndReducer(state)
        case ActionTypes.gameReset:
            return gameResetReducer(state)
        case ActionTypes.gameClick:
            return gameClickReducer(state, (action as GameClickAction).payload)
        case ActionTypes.gameJump:
            return gameJumpReducer(state, (action as GameJumpAction).payload)
        default:
            return state;
    }
};
