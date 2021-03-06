import "regenerator-runtime/runtime.js";
import React, {useCallback, useEffect} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {LoginForm, LoginFormResult} from "@/components/LoginForm";
import {Paths} from "@/Paths";
import {AppState} from "@/rdx/reducers";
import {loading, LoginPayload, saveName} from "@/rdx/user/userSlice";
import {isLoggedIn} from "@/rdx/selectors";

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

const mapStateToProps = (state: AppState) => {
    return {
        isLoggedIn: isLoggedIn(state),
        isLoggingOut: state.user.isLoggingOut
    }
}

const mapDispatchToProps = {
    loginHandler: saveName,
    loading,
};

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(RawLoginPage);