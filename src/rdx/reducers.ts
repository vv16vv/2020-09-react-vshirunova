import {combineReducers} from "redux";

import {gameReducer} from "@/rdx/features/game";
import {loginReducer} from "@/rdx/features/login";
import {settingsReducer} from "@/rdx/features/settings";

export const rootReducer = combineReducers({
    loginReducer,
    gameReducer,
    settingsReducer,
})

export type AppState = ReturnType<typeof rootReducer>