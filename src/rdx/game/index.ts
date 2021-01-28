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
        case ActionTypes.GAME_START:
            return gameStartReducer(state, (action as GameStartAction).payload)
        case ActionTypes.GAME_END:
            return gameEndReducer(state)
        case ActionTypes.GAME_RESET:
            return gameResetReducer(state)
        case ActionTypes.GAME_CLICK:
            return gameClickReducer(state, (action as GameClickAction).payload)
        case ActionTypes.GAME_JUMP:
            return gameJumpReducer(state, (action as GameJumpAction).payload)
        default:
            return state;
    }
};
