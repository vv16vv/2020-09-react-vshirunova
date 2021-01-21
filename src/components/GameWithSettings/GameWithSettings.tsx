import React from "react";

import {SettingsForm} from "@/components/SettingsForm";
import {JumpingCellGame} from "@/components/JumpingCellGame";
import {LogoutButton} from "@/components/GameWithSettings/LogoutButton";

export const GameWithSettings: React.FC<{}> = (() => {
    return (
        <>
            <SettingsForm/>
            <JumpingCellGame/>
            <LogoutButton/>
        </>
    );
});