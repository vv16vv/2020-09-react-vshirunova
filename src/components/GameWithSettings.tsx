import React, {useCallback, useState} from "react";
import {SettingsForm, SettingsFormResult} from "./SettingsForm";
import {JumpingCellGame} from "./JumpingCellGame";

export const GameWithSettings: React.FC<{}> = (() => {
    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(10);
    const [frequency, setFrequency] = useState(2000);

    const handleSubmit = useCallback(({width, height, frequency}: SettingsFormResult) => {
        setWidth(width);
        setHeight(height);
        setFrequency(frequency);
    }, [width, height, frequency])

    return (
        <>
            <SettingsForm onSubmit={handleSubmit}/>
            <JumpingCellGame width={width} height={height} frequency={frequency}/>
        </>
    );
});