import React, {useCallback, useState} from "react";
import {SettingsForm, SettingsFormResult} from "./SettingsForm";
import {JumpingCellGame} from "./JumpingCellGame";

export const initialGameSettings: SettingsFormResult = {
    width: 10,
    height: 10,
    frequency: 5000
}as const;

export const GameWithSettings: React.FC<{}> = (() => {
    const [width, setWidth] = useState(initialGameSettings.width);
    const [height, setHeight] = useState(initialGameSettings.height);
    const [frequency, setFrequency] = useState(initialGameSettings.frequency);

    const handleSubmit = useCallback(({width, height, frequency}: SettingsFormResult) => {
        console.log(`handleSubmit: new width=${width}, height=${height}, frequency=${frequency}`)
        setWidth(width);
        setHeight(height);
        setFrequency(frequency);
    }, [width, height, frequency])

    return (
        <>
            <SettingsForm width={width} height={height} frequency={frequency} onSubmit={handleSubmit}/>
            <JumpingCellGame width={width} height={height} frequency={frequency}/>
        </>
    );
});