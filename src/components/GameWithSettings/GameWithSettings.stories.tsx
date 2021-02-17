import React from "react";
import {Provider} from "react-redux";

import {GameWithSettings} from "./GameWithSettings";
import {userLoggedIn} from "@/rdx/testConstants";
import {defaultGameState} from "@/rdx/game/gameState";
import {mockStore} from "@/rdx/mockStore";
import {AppState} from "@/rdx/reducers";

export default {
    title: "Jumping Cell Game with Settings Story",
}

export const GameWithSettingsStory: React.FC<{}> = () => {
    const store = mockStore({
        user: userLoggedIn,
        game: defaultGameState
    } as AppState)

    return <Provider store={store}>
        <GameWithSettings/>
    </Provider>
};