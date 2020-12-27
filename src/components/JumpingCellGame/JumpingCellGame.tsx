import React from "react";
import {Field} from "cmp/Field";
import {SettingsFormResult} from "cmp/SettingsForm";
import {StyledBlock, StyledButton} from "styled/StyledComponents";
import {CenteredLabel} from "styled/StyledTextComponents";

interface GameState {
    frequency: number;
    width: number;
    height: number;
    x: number;
    y: number;
    jumps: number;
    clicks: number;
    timerId?: ReturnType<typeof setInterval>;
}

class NegativeCoord extends Error {
    constructor(coord: number) {
        super(`Coordinate ${coord} cannot be 0 or negative`);
    }
}

class TooBigCoord extends Error {
    constructor(coord: number, max: number) {
        super(`Coordinate ${coord} bigger than a maximum ${max}`);
    }
}

const initialState: GameState = {
    x: 1,
    y: 1,
    width: 10,
    height: 10,
    jumps: 0,
    clicks: 0,
    frequency: 1000
} as const;

export class JumpingCellGame extends React.Component<SettingsFormResult, GameState> {
    constructor(props: SettingsFormResult) {
        super(props);
        console.log(`JumpingCellGame - constructor: props = ${JSON.stringify(props)}`);
        this.state = {
            ...initialState,
            ...props,
        };
    }

    handleClick = (x: number, y: number) => {
        console.log(`JumpingCellGame - handleClick: x = ${x}, y = ${y}`);
        this.incrementClicks()
        if (this.state.x === x && this.state.y === y) {
            this.increaseFrequency()
            this.incrementJumps()
            this.handleJump()
        }
    }

    handleJump = () => {
        console.log(`JumpingCellGame - handleJump`);
        const {width, height} = this.state;
        const newX = this.nextRandomCoord(width);
        const newY = this.nextRandomCoord(height);
        this.setState({
            x: newX,
            y: newY
        })
    }

    nextRandomCoord = (quantity: number): number => {
        return Math.floor(Math.random() * quantity + 1)
    }

    assertCoordIsOk = (coord: number, max: number): number => {
        if (coord <= 0) throw new NegativeCoord(coord);
        if (coord > max) throw new TooBigCoord(coord, max);
        return coord
    }

    increaseFrequency = () => {
        console.log(`JumpingCellGame - increaseFrequency`);
        const {frequency} = this.state;
        this.setState({
                frequency: Math.max(10, Math.round(frequency / 2))
            }
        )
    }

    incrementClicks = () => {
        console.log(`JumpingCellGame - incrementClicks`);
        const {clicks} = this.state;
        this.setState({
                clicks: clicks + 1
            }
        )
    }

    incrementJumps = () => {
        console.log(`JumpingCellGame - incrementJumps`);
        const {jumps} = this.state;
        this.setState({
                jumps: jumps + 1
            }
        )
    }

    resetHandle = () => {
        console.log(`JumpingCellGame - resetHandle`);
        this.setState({
                ...initialState,
                frequency: this.props.frequency,
                width: this.props.width,
                height: this.props.height,
            }
        )
    }

    componentDidMount() {
        console.log(`JumpingCellGame - componentDidMount`);
        if (this.state.timerId === undefined) {
            const timerId = setInterval(this.handleJump, this.state.frequency);
            this.setState({
                timerId: timerId
            })
        }
    }

    componentWillUnmount() {
        console.log(`JumpingCellGame - componentWillUnmount`);
        if (this.state.timerId !== undefined) {
            clearInterval(this.state.timerId);
            this.setState({
                timerId: undefined
            })
        }
    }

    checkFieldWidth = (newWidth: number, oldWidth: number) => {
        const {x} = this.state;
        if (newWidth < oldWidth && x > newWidth) {
            this.setState({
                x: newWidth,
                width: newWidth,
            })
        }
    }

    checkFieldHeight = (newHeight: number, oldHeight: number) => {
        const {y} = this.state;
        if (newHeight < oldHeight && y > newHeight) {
            this.setState({
                y: newHeight,
                height: newHeight,
            })
        }
    }

    checkFrequencyReset = (newFreq: number, oldFreq: number) => {
        if (newFreq !== oldFreq) {
            const {timerId: currTimeId} = this.state;
            clearInterval(currTimeId as NodeJS.Timeout)
            const timerId = setInterval(this.handleJump, newFreq);
            this.setState({
                frequency: newFreq,
                timerId: timerId
            })
        }
    }

    checkFrequencyChange = (newFreq: number, oldFreq: number) => {
        const {timerId: currTimeId} = this.state;
        if (newFreq !== oldFreq && currTimeId !== undefined) {
            clearInterval(currTimeId as NodeJS.Timeout)
            const timerId = setInterval(this.handleJump, newFreq);
            this.setState({
                timerId: timerId
            })
        }
    }

    componentDidUpdate(prevProps: Readonly<SettingsFormResult>, prevState: Readonly<GameState>) {
        console.log(`JumpingCellGame - componentDidUpdate: prevProps = ${JSON.stringify(prevProps)}, prevState = ${JSON.stringify(prevState)}`);
        this.checkFieldWidth(this.props.width, prevState.width)
        this.checkFieldHeight(this.props.height, prevState.height)
        this.checkFrequencyReset(this.props.frequency, prevProps.frequency)
        this.checkFrequencyChange(this.state.frequency, prevState.frequency)
    }

    getSnapshotBeforeUpdate(prevProps: Readonly<SettingsFormResult>, prevState: Readonly<GameState>): any | null {
        console.log(`JumpingCellGame - getSnapshotBeforeUpdate: prevProps = ${JSON.stringify(prevProps)}`)
        console.log(`JumpingCellGame - getSnapshotBeforeUpdate: ${JSON.stringify(prevState)}`)
        return null;
    }

    render() {
        const {width, height} = this.state;
        const x = this.assertCoordIsOk(this.state.x, width)
        const y = this.assertCoordIsOk(this.state.y, height)
        console.log(`JumpingCellGame - render`);
        return <>
            <StyledBlock>
                <Field
                    width={width}
                    height={height}
                    filledCells={[{x: x, y: y}]}
                    clickHandler={this.handleClick}
                />
            </StyledBlock>
            <StyledBlock>
                <CenteredLabel>{`Jumps: ${this.state.jumps}`}</CenteredLabel>
                <CenteredLabel>{`Clicks: ${this.state.clicks}`}</CenteredLabel>
                <StyledButton onClick={this.resetHandle}>Reset</StyledButton>
            </StyledBlock>
        </>;
    }
}
