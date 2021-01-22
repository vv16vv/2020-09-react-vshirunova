import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {Paths} from "@/Paths";
import {AppState} from "@/rdx/reducers";
import {GameHalfWindowColumn} from "@/components/Layout";
import {Dispatch} from "redux";
import {loading} from "@/rdx/features/login";

interface ReduxProps {
    isLoggedIn: boolean;
    loading: () => void;
}

export const RawGamePage: React.FC<ReduxProps> = props => {
    useEffect(() => props.loading())
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

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        loading: () => dispatch(loading()),
    };
}

export const GamePage = connect(mapStateToProps, mapDispatchToProps)(RawGamePage);