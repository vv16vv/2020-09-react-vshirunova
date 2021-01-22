import "regenerator-runtime/runtime.js";
import React, {useCallback, useEffect} from "react";
import {Redirect, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {Dispatch} from "redux";

import {LoginForm, LoginFormResult} from "@/components/LoginForm";
import {Paths} from "@/Paths";
import {AppState} from "@/rdx/reducers";
import {loading, login} from "@/rdx/features/login";

interface ReduxProps {
    isLoggedIn: boolean
    loginHandler: (userName: string) => void;
    loading: () => void;
}

const RawLoginPage: React.FC<ReduxProps> = (props) => {
    const history = useHistory()
    const submitHandler = useCallback(
        ({login}: LoginFormResult) => {
            props.loginHandler(login)
            history.push(Paths.Game)
        },
        [])
    useEffect(()=>{
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
        isLoggedIn: state.loginReducer.isLoggedIn
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        loginHandler: (userName: string) => dispatch(login({userName: userName})),
        loading: () => dispatch(loading()),
    };
}

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(RawLoginPage);