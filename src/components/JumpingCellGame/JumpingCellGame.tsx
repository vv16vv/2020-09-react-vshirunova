import React, {useCallback, useEffect, useState} from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";

import {Field} from "@/components/Field";
import {StyledBlock, StyledButton} from "@/components/styled/StyledComponents";
import {CenteredLabel} from "@/components/styled/StyledTextComponents";
import {AppState} from "@/rdx/reducers";
import {click as gameClick, jump as gameJump, reset as gameReset} from "@/rdx/game/gameSlice";

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

    const {width, height, x, y, jumps, clicks, onReset} = props

    return <>
        <StyledBlock>
            <Field
                width={width}
                height={height}
                filledCells={[{x, y}]}
                clickHandler={handleClick}
            />
        </StyledBlock>
        <StyledBlock>
            <CenteredLabel>{`Jumps: ${jumps}`}</CenteredLabel>
            <CenteredLabel>{`Clicks: ${clicks}`}</CenteredLabel>
            <StyledButton onClick={onReset}>Reset</StyledButton>
        </StyledBlock>
    </>;
}

function mapStateToProps({game}: AppState) {
    return {
        width: game.width,
        height: game.height,
        frequency: game.currFrequency,
        x: game.x,
        y: game.y,
        jumps: game.jumps,
        clicks: game.clicks,
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
