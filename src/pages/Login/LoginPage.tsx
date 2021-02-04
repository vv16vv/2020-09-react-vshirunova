import "regenerator-runtime/runtime.js";
import React, {useCallback, useEffect} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {Dispatch} from "redux";

import {LoginForm, LoginFormResult} from "@/components/LoginForm";
import {Paths} from "@/Paths";
import {AppState} from "@/rdx/reducers";
import {loading, saveName} from "@/rdx/user/saga";
import {LoginPayload} from "@/rdx/user/userSlice";

interface ReduxProps {
    isLoggedIn: boolean;
    isLoggingOut: boolean;
    loginHandler: (payload: LoginPayload) => void;
    loading: () => void;
}

const RawLoginPage: React.FC<ReduxProps> = (props) => {
    const submitHandler = useCallback(
        ({login}: LoginFormResult) => {
            props.loginHandler({userName: login})
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

const mapStateToProps = ({user}: AppState) => ({
    isLoggedIn: user.isLoggedIn,
    isLoggingOut: user.isLoggingOut,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    loginHandler: (settings: LoginPayload) => dispatch(saveName(settings)),
    loading: () => dispatch(loading({}))
});

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(RawLoginPage);