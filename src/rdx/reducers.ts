import {combineReducers} from "redux";

import {gameReducer} from "@/rdx/game";
import {userReducer} from "@/rdx/user";

export const rootReducer = combineReducers({
    loginReducer: userReducer,
    gameReducer,
})

export type AppState = ReturnType<typeof rootReducer>