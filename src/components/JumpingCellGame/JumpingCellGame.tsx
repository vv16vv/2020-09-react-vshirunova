import React, {useCallback, useEffect, useState} from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";

import {Field} from "cmp/Field";
import {StyledBlock, StyledButton} from "styled/StyledComponents";
import {CenteredLabel} from "styled/StyledTextComponents";
import {AppState} from "@/rdx/reducers";
import {gameClick, gameJump, gameReset} from "@/rdx/features/game";

interface ReduxProps {
    frequency: number;
    width: number;
    height: number;
    x: number;
    y: number;
    jumps: number;
    clicks: number;

    onClick: (x: number, y: number) => void;
    onJump: () => void;
    onReset: () => void;
}

export const RawJumpingCellGame: React.FC<ReduxProps> = props => {

    const handleClick = useCallback((x: number, y: number) => {
        props.onClick(x, y)
        if (props.x === x && props.y === y) {
            props.onJump()
        }
    }, [])

    const [timerId, setTimerId] = useState<ReturnType<typeof setInterval> | undefined>(undefined)
    useEffect(() => {
        if (timerId === undefined) {
            setTimerId(setInterval(props.onJump, props.frequency))
        }
        return () => {
            if (timerId !== undefined) {
                clearInterval(timerId)
                setTimerId(undefined)
            }
        }
    })

    return <>
        <StyledBlock>
            <Field
                width={props.width}
                height={props.height}
                filledCells={[{x: props.x, y: props.y}]}
                clickHandler={handleClick}
            />
        </StyledBlock>
        <StyledBlock>
            <CenteredLabel>{`Jumps: ${props.jumps}`}</CenteredLabel>
            <CenteredLabel>{`Clicks: ${props.clicks}`}</CenteredLabel>
            <StyledButton onClick={props.onReset}>Reset</StyledButton>
        </StyledBlock>
    </>;
}

function mapStateToProps(state: AppState) {
    return {
        width: state.gameReducer.fieldWidth,
        height: state.gameReducer.fieldHeight,
        frequency: state.gameReducer.fieldFrequency,
        x: state.gameReducer.x,
        y: state.gameReducer.y,
        jumps: state.gameReducer.jumps,
        clicks: state.gameReducer.clicks,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        onClick: (x: number, y: number) => dispatch(gameClick({clickX: x, clickY: y})),
        onJump: () => dispatch(gameJump()),
        onReset: () => dispatch(gameReset()),
    };
}

export const JumpingCellGame = connect(mapStateToProps, mapDispatchToProps)(RawJumpingCellGame);
