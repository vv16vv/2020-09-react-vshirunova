import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {bindActionCreators, Dispatch} from "redux";

import {Paths} from "@/Paths";
import {AppState} from "@/rdx/reducers";
import {GameHalfWindowColumn} from "@/components/Layout";
import {loading} from "@/rdx/login";

interface ReduxProps {
    isLoggedIn: boolean;
    isLoggingOut: boolean;
    loading: () => void;
}

export const RawGamePage: React.FC<ReduxProps> = props => {
    useEffect(() => {
        if (!props.isLoggingOut)
            props.loading()
    })
    return <>{
        props.isLoggedIn
            ? <GameHalfWindowColumn name={"left"}/>
            : <Redirect to={Paths.Root}/>
    }</>;
}

function mapStateToProps(state: AppState) {
    return {
        isLoggedIn: state.loginReducer.isLoggedIn,
        isLoggingOut: state.loginReducer.isLoggingOut,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({
        loading
    }, dispatch)
}

export const GamePage = connect(mapStateToProps, mapDispatchToProps)(RawGamePage);