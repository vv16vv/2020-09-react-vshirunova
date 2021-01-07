import React, {useCallback, useEffect, useState} from "react";
import {SettingsForm, SettingsFormResult} from "cmp/SettingsForm";
import {JumpingCellGame} from "cmp/JumpingCellGame";
import {LoginStorage} from "@/logic/LoginStorage";
import {useHistory} from "react-router-dom";
import {Paths} from "@/Paths";
import {StyledButton} from "styled/StyledComponents";

export const initialGameSettings: SettingsFormResult = {
    width: 10,
    height: 10,
    frequency: 5000
} as const;

const LogoutButton: React.FC<{}> = () => {
    const history = useHistory()
    const logout = useCallback(() => {
        LoginStorage.clearName()
        history.push(Paths.Root)
    }, [])
    return <StyledButton onClick={logout}>Log out</StyledButton>
}

export const GameWithSettings: React.FC<{}> = (() => {
    const [width, setWidth] = useState(initialGameSettings.width);
    const [height, setHeight] = useState(initialGameSettings.height);
    const [frequency, setFrequency] = useState(initialGameSettings.frequency);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const getLogin = () => {
            const login = LoginStorage.isNameSet() ? LoginStorage.getCurrentName() : ""
            console.log(`GameWithSettings.useEffect1: login = '${login}'`)
            setUserName(login)
        }
        getLogin()
        return () => {
            const login = LoginStorage.isNameSet() ? LoginStorage.getCurrentName() : ""
            console.log(`GameWithSettings.useEffect2: login = '${login}'`)
            setUserName(login)
        }
    }, [userName])

    const handleSubmit = useCallback(({width, height, frequency}: SettingsFormResult) => {
        console.log(`handleSubmit: new width=${width}, height=${height}, frequency=${frequency}`)
        setWidth(width);
        setHeight(height);
        setFrequency(frequency);
    }, [width, height, frequency])

    return (
        <>
            <SettingsForm
                width={width}
                height={height}
                frequency={frequency}
                userName={userName}
                onSubmit={handleSubmit}/>
            <JumpingCellGame width={width} height={height} frequency={frequency}/>
            <LogoutButton/>
        </>
    );
});