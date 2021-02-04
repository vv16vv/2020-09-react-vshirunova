import React, {useCallback, useState} from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";

import {start as gameStart, GameStartPayload} from "@/rdx/game/gameSlice";
import {AppState} from "@/rdx/reducers";
import {Range} from "@/components/Range";
import {LayoutTable, LayoutTd, LayoutTr, StyledButton, StyledFieldSet} from "@/components/styled/StyledComponents";
import {FieldTitle, TableTitle} from "@/components/styled/StyledTextComponents";

interface ReduxProps {
    width: number;
    height: number;
    frequency: number;
    userName?: string;
    onSubmit: (settings: GameStartPayload) => void;
}

const milliInSecond = 1000;

const calculateTitle = (userName: string | undefined): string => {
    return userName && userName !== "" ? `for ${userName}` : ""
}

const calculateFrequency = (frequency: number): number => {
    return frequency / milliInSecond
}

export const RawSettingsForm: React.FC<ReduxProps> = props => {
    const [width, setWidth] = useState(props.width)
    const [height, setHeight] = useState(props.height)
    const [frequency, setFrequency] = useState(calculateFrequency(props.frequency))
    const [title] = useState(calculateTitle(props.userName))

    const changeValue = useCallback((field: string, newValue: number) => {
        switch (field) {
            case "width": {
                setWidth(newValue);
                break
            }
            case "height": {
                setHeight(newValue);
                break
            }
            case "frequency": {
                setFrequency(newValue);
                break
            }
        }
    }, [width, height, frequency])

    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        props.onSubmit({
            width: width,
            height: height,
            frequency: frequency * milliInSecond,
        });
    }, [width, height, frequency])

    return (
        <form onSubmit={handleSubmit}>
            <StyledFieldSet>
                <TableTitle>{`Game Settings ${title}`}</TableTitle>
                <LayoutTable>
                    <tbody>
                    <LayoutTr>
                        <LayoutTd><FieldTitle>Width</FieldTitle></LayoutTd>
                        <LayoutTd><Range
                            name={"width"}
                            max={50}
                            value={width}
                            changeHandler={changeValue}/></LayoutTd>
                    </LayoutTr>
                    <LayoutTr>
                        <LayoutTd><FieldTitle>Height</FieldTitle></LayoutTd>
                        <LayoutTd><Range
                            name={"height"}
                            max={50}
                            value={height}
                            changeHandler={changeValue}/></LayoutTd>
                    </LayoutTr>
                    <LayoutTr>
                        <LayoutTd><FieldTitle>Frequency, sec</FieldTitle></LayoutTd>
                        <LayoutTd><Range
                            name={"frequency"}
                            max={10} min={2} step={0.5}
                            value={frequency}
                            changeHandler={changeValue}/></LayoutTd>
                    </LayoutTr>
                    </tbody>
                </LayoutTable>
            </StyledFieldSet>
            <StyledButton>Apply</StyledButton>
        </form>
    );
}


const mapStateToProps = ({game, user}: AppState) => ({
    width: game.width,
    height: game.height,
    frequency: game.initFrequency,
    userName: user.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onSubmit: (settings: GameStartPayload) => dispatch(gameStart(settings)),
});

export const SettingsForm = connect(mapStateToProps, mapDispatchToProps)(RawSettingsForm);
