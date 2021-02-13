import React, {useCallback, useEffect, useState} from "react";
import {connect} from "react-redux";

import {Field} from "@/components/Field";
import {StyledBlock, StyledButton} from "@/components/styled/StyledComponents";
import {CenteredLabel} from "@/components/styled/StyledTextComponents";
import {AppState} from "@/rdx/reducers";
import {GameClickPayload, click, reset, jump} from "@/rdx/game/gameSlice";

interface ReduxProps {
    frequency: number;
    width: number;
    height: number;
    x: number;
    y: number;
    jumps: number;
    clicks: number;

    onClick: (payload: GameClickPayload) => void;
    onJump: () => void;
    onReset: () => void;
}

export const RawJumpingCellGame: React.FC<ReduxProps> = props => {

    const handleClick = useCallback((clickX: number, clickY: number) => {
        props.onClick({clickX, clickY})
        if (props.x === clickX && props.y === clickY) {
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

const mapDispatchToProps = {
    onClick: click,
    onJump: jump,
    onReset: reset,
};

export const JumpingCellGame = connect(mapStateToProps, mapDispatchToProps)(RawJumpingCellGame);
