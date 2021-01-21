import "regenerator-runtime/runtime.js";
import React, {useCallback} from "react";
import {Redirect, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {Dispatch} from "redux";

import {LoginForm, LoginFormResult} from "@/components/LoginForm";
import {Paths} from "@/Paths";
import {AppState} from "@/rdx/reducers";
import {login} from "@/rdx/features/login";

interface ReduxProps {
    isLoggedIn: boolean
    loginHandler: (userName: string) => void;
}

const RawLoginPage: React.FC<ReduxProps> = (props) => {
    const history = useHistory()
    const submitHandler = useCallback(
        ({login}: LoginFormResult) => {
            props.loginHandler(login)
            history.push(Paths.Game)
        },
        [])
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
    };
}

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(RawLoginPage);