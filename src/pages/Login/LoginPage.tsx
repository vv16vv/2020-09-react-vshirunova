import "regenerator-runtime/runtime.js";
import React, {useCallback, useEffect} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";

import {LoginForm, LoginFormResult} from "@/components/LoginForm";
import {Paths} from "@/Paths";
import {AppState} from "@/rdx/reducers";
import {saveName} from "@/rdx/user/login";
import {loading} from "@/rdx/user/init";

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
        if (!props.isLoggingOut)
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
        isLoggedIn: state.userReducer.isLoggedIn,
        isLoggingOut: state.userReducer.isLoggingOut,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({
        loginHandler: saveName,
        loading: loading,
    }, dispatch)
}

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(RawLoginPage);