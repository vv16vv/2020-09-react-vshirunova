import {combineReducers} from "redux";

import {gameReducer} from "@/rdx/game";
import {loginReducer} from "@/rdx/login";

export const rootReducer = combineReducers({
    loginReducer,
    gameReducer,
})

export type AppState = ReturnType<typeof rootReducer>