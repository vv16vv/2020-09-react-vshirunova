import React, {useCallback} from "react";
import {LoginForm, LoginFormResult} from "cmp/LoginForm/LoginForm";
import {LoginStorage} from "@/logic/LoginStorage";
import {useHistory} from "react-router-dom";
import {Paths} from "@/Paths";

export const LoginFormPage: React.FC<{}> = () => {
    const history = useHistory()
    const submitHandler = useCallback(({login}: LoginFormResult) => {
        LoginStorage.putNameToStorage(login)
        history.push(Paths.Game)
    }, [])
    return <LoginForm onSubmit={submitHandler}/>
}
