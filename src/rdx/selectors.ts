import {AppState} from "@/rdx/reducers";
import {createSelector} from "@reduxjs/toolkit";

const userNameSelector = ({user: {userName}}: AppState) => userName

export const isLoggedIn = createSelector(
    userNameSelector,
    userName => userName !== undefined && userName !== ""
)
