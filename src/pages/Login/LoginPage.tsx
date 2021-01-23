import "regenerator-runtime/runtime.js";
import React, {useCallback, useEffect} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {Dispatch} from "redux";

import {LoginForm, LoginFormResult} from "@/components/LoginForm";
import {Paths} from "@/Paths";
import {AppState} from "@/rdx/reducers";
import {loading, saveName} from "@/rdx/features/login";

interface ReduxProps {
    isLoggedIn: boolean;
    isLoggingOut: boolean;
    loginHandler: (userName: string) => void;
    loading: () => void;
}

const RawLoginPage: React.FC<ReduxProps> = (props) => {
    const submitHandler = useCallback(
        ({login}: LoginFormResult) => {
            props.loginHandler(login)
        },
        [])
    useEffect(() => {
        if(!props.isLoggingOut)
            props.loading()
    })
    return <>{
        props.isLoggedIn
            ? <Redirect to={Paths.Game}/>
            : <LoginForm onSubmit={submitHandler}/>
    }</>
}

function mapStateToProps(state: AppState) {
    return {
        isLoggedIn: state.loginReducer.isLoggedIn,
        isLoggingOut: state.loginReducer.isLoggingOut,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        loginHandler: (userName: string) => dispatch(saveName(userName)),
        loading: () => dispatch(loading()),
    };
}

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(RawLoginPage);