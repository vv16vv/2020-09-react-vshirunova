import React, {useCallback, useState} from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";

import {Range} from "cmp/Range";
import {FieldTitle, TableTitle} from "styled/StyledTextComponents";
import {LayoutTable, LayoutTd, LayoutTr, StyledButton, StyledFieldSet} from "styled/StyledComponents";
import {settingsSubmit, SettingsSubmitPayload} from "@/rdx/features/settings";
import {AppState} from "@/rdx/reducers";

interface ReduxProps {
    width: number;
    height: number;
    frequency: number;
    userName?: string;
    onSubmit: (settings: SettingsSubmitPayload) => void;
}

const milliInSecond = 1000;

const calculateTitle = (userName: string | undefined): string => {
    return userName && userName !== "" ? `for ${userName}` : ""
}

const calculateFrequency = (frequency: number): number => {
    return frequency / milliInSecond
}

const RawSettingsForm: React.FC<ReduxProps> = props => {
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


function mapStateToProps(state: AppState) {
    return {
        width: state.settingsReducer.width,
        height: state.settingsReducer.height,
        frequency: state.settingsReducer.frequency,
        userName: state.loginReducer.user
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        onSubmit: (settings: SettingsSubmitPayload) => dispatch(settingsSubmit(settings)),
    };
}

export const SettingsForm = connect(mapStateToProps, mapDispatchToProps)(RawSettingsForm);
