import {Action, combineReducers} from "redux";

import {gameReducer} from "@/rdx/game";
import {userReducer} from "@/rdx/user";
import {ThunkAction} from "redux-thunk";

export const rootReducer = combineReducers({
    userReducer,
    gameReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>
