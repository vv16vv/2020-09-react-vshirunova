import React from "react";
import {Field} from "./Field";

interface GameProp {
    width: number;
    height: number;
    frequency?:number;
}

interface GameState {
    frequency: number;
    x: number;
    y: number;
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

export class JumpingCellGame extends React.Component<GameProp, GameState> {
    constructor(props: GameProp) {
        super(props);
        console.log(`JumpingCellGame - constructor: props = ${JSON.stringify(props)}`);
        this.state = {
            frequency: this.props.frequency || 2000,
            x: 1,
            y: 1,
        };
    }

    handleClick = (x: number, y: number) => {
        console.log(`JumpingCellGame - handleClick: x = ${x}, y = ${y}`);
        if (this.state.x === x && this.state.y === y) {
            this.increaseFrequency()
        }
    }

    handleJump = () => {
        console.log(`JumpingCellGame - handleJump`);
        const {width, height} = this.props;
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

    componentDidUpdate(prevProps: Readonly<GameProp>, prevState: Readonly<GameState>) {
        console.log(`JumpingCellGame - componentDidUpdate: prevProps = ${JSON.stringify(prevProps)}, prevState = ${JSON.stringify(prevState)}`);
        const {frequency: oldFreq} = prevState;
        const {frequency: currFreq, timerId: currTimeId} = this.state;
        if (oldFreq !== currFreq && currTimeId !== undefined) {
            clearInterval(currTimeId)
            const timerId = setInterval(this.handleJump, currFreq);
            this.setState({
                timerId: timerId
            })
        }

    }

    getSnapshotBeforeUpdate(prevProps: Readonly<GameProp>, prevState: Readonly<GameState>): any | null {
        console.log(`JumpingCellGame - getSnapshotBeforeUpdate: prevProps = ${JSON.stringify(prevProps)}`)
        console.log(`JumpingCellGame - getSnapshotBeforeUpdate: ${JSON.stringify(prevState)}`)
        return null;
    }

    render() {
        const x = this.assertCoordIsOk(this.state.x, this.props.width)
        const y = this.assertCoordIsOk(this.state.y, this.props.height)
        console.log(`JumpingCellGame - render`);
        return <Field
            width={this.props.width}
            height={this.props.height}
            filledCells={[{x: x, y: y}]}
            clickHandler={this.handleClick}
        />;
    }
}
