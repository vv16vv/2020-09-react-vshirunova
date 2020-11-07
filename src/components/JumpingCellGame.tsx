import React from "react";
import {Field} from "./Field";

interface GameProp {
    width: number;
    height: number;
}

interface GameState {
    frequency: number;
    x: number;
    y: number;
    timerId?: ReturnType<typeof setInterval>;
}

export class JumpingCellGame extends React.Component<GameProp, GameState> {
    constructor(props: GameProp) {
        super(props);
        console.log(`JumpingCellGame - constructor: props = ${JSON.stringify(props)}`);
        this.state = {
            frequency: 2000,
            x: 1,
            y: 1,
        };

        this.handleClick = this.handleClick.bind(this);
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

    increaseFrequency = () => {
        console.log(`JumpingCellGame - increaseFrequency`);
        const {frequency} = this.state;
        this.setState({
                frequency: Math.max(10, Math.round(frequency / 2))
            }
        )
    }

    componentDidMount = () => {
        console.log(`JumpingCellGame - componentDidMount`);
        if (this.state.timerId === undefined) {
            const timerId = setInterval(this.handleJump, this.state.frequency);
            this.setState({
                timerId: timerId
            })
        }
    }

    componentWillUnmount = () => {
        console.log(`JumpingCellGame - componentWillUnmount`);
        if (this.state.timerId !== undefined) {
            clearInterval(this.state.timerId);
            this.setState({
                timerId: undefined
            })
        }
    }

    shouldComponentUpdate = (nextProps: Readonly<GameProp>, nextState: Readonly<GameState>, nextContext: any): boolean => {
        console.log(`JumpingCellGame - shouldComponentUpdate: nextProps = ${JSON.stringify(nextProps)}, nextState = ${JSON.stringify(nextState)}, nextContext = ${nextContext}`);
        const {x: currX, y: currY} = this.state;
        const {x: newX, y: newY} = nextState;
        return currX !== newX || currY !== newY;
    }

    componentDidUpdate = (prevProps: Readonly<GameProp>, prevState: Readonly<GameState>, snapshot?: any) => {
        console.log(`JumpingCellGame - componentDidUpdate: prevProps = ${JSON.stringify(prevProps)}, prevState = ${JSON.stringify(prevState)}, snapshot = ${snapshot}`);
        const {frequency: oldFreq} = prevState;
        const {frequency: currFreq, timerId: currTimeId} = this.state;
        if(oldFreq !== currFreq && currTimeId !== undefined){
            clearInterval(currTimeId)
            const timerId = setInterval(this.handleJump, currFreq);
            this.setState({
                timerId: timerId
            })
        }

    }

    render = () => {
        console.log(`JumpingCellGame - render`);
        return <Field
            width={this.props.width}
            height={this.props.height}
            filledCells={[{x: this.state.x, y: this.state.y}]}
            clickHandler={this.handleClick}
        />;
    }
}
