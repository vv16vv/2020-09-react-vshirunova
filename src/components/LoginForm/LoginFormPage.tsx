import React, {useCallback} from "react";
import {LoginForm, LoginFormResult} from "cmp/LoginForm/LoginForm";
import {loginStorage} from "@/logic/LoginStorage";
import {useHistory} from "react-router-dom";
import {Paths} from "@/Paths";

export const LoginFormPage: React.FC<{}> = () => {
    const history = useHistory()
    const submitHandler = useCallback(({login}: LoginFormResult) => {
        loginStorage.putNameToStorage(login)
        history.push(Paths.Game)
    }, [])
    return <LoginForm onSubmit={submitHandler}/>
}
