import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {Paths} from "@/Paths";
import {AppState} from "@/rdx/reducers";
import {GameHalfWindowColumn} from "@/components/Layout";
import {loading} from "@/rdx/user/saga";
import {Dispatch} from "redux";

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

const mapStateToProps = ({user}: AppState) => ({
    isLoggedIn: user.isLoggedIn,
    isLoggingOut: user.isLoggingOut,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    loading: () => dispatch(loading({})),
});

export const GamePage = connect(mapStateToProps, mapDispatchToProps)(RawGamePage);