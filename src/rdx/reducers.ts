import {combineReducers} from "redux";

import userSlice from "@/rdx/user/userSlice";
import gameSlice from "@/rdx/game/gameSlice";

export const rootReducer = combineReducers({
    user: userSlice,
    game: gameSlice,
})

export type AppState = ReturnType<typeof rootReducer>
