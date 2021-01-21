import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {Paths} from "@/Paths";
import {AppState} from "@/rdx/reducers";
import {GameHalfWindowColumn} from "@/components/Layout";

interface ReduxProps {
    isLoggedIn: boolean
}

export const RawGamePage: React.FC<ReduxProps> = props => {
    return <>{
        props.isLoggedIn
            ? <GameHalfWindowColumn name={"left"}/>
            : <Redirect to={Paths.Root}/>
    }</>;
}

function mapStateToProps(state: AppState) {
    return {
        isLoggedIn: state.loginReducer.isLoggedIn
    };
}

export const GamePage = connect(mapStateToProps)(RawGamePage);