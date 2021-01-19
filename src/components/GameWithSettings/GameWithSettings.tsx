import React from "react";

import {SettingsForm} from "cmp/SettingsForm";
import {JumpingCellGame} from "cmp/JumpingCellGame";
import {LogoutButton} from "cmp/GameWithSettings/LogoutButton";

export const GameWithSettings: React.FC<{}> = (() => {
    return (
        <>
            <SettingsForm/>
            <JumpingCellGame/>
            <LogoutButton/>
        </>
    );
});