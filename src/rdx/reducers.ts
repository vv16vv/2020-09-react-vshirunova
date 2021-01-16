import {combineReducers} from "redux";

import {gameReducer} from "@/rdx/features/game";
import {loginReducer} from "@/rdx/features/login";

export const rootReducer = combineReducers({
    loginReducer,
    gameReducer
})

export type AppState = ReturnType<typeof rootReducer>