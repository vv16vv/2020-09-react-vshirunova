import React from "react";
import {GameHalfWindowColumn} from "cmp/Layout";
import {Redirect} from "react-router-dom";

import {Paths} from "@/Paths";
import {LoginStorage} from "@/logic/LoginStorage";

interface GameState {
    isLoggedIn: boolean
}

export class GamePage extends React.Component<{}, GameState> {
    state = {
        isLoggedIn: true
    }

    componentDidMount() {
        LoginStorage
            .isNameSet()
            .then((result) => this.setState({isLoggedIn: result}))
    }

    shouldComponentUpdate(nextProps: Readonly<{}>, nextState: Readonly<GameState>): boolean {
        return this.state.isLoggedIn !== nextState.isLoggedIn
    }

    render() {
        return <>{
            this.state.isLoggedIn
                ? <GameHalfWindowColumn name={"left"}/>
                : <Redirect to={Paths.Root}/>
        }</>;
    }

}