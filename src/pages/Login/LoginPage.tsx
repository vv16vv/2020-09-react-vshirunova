import React, {useCallback} from "react";
import {Redirect, useHistory} from "react-router-dom";

import {LoginForm, LoginFormResult} from "cmp/LoginForm";
import {LoginStorage} from "@/logic/LoginStorage";
import {Paths} from "@/Paths";

export const LoginPage: React.FC<{}> = () => {
    const history = useHistory()
    const submitHandler = useCallback(({login}: LoginFormResult) => {
        LoginStorage.putNameToStorage(login)
        history.push(Paths.Game)
    }, [])
    return <>{
        LoginStorage.isNameSet()
            ? <Redirect to={Paths.Game}/>
            : <LoginForm onSubmit={submitHandler}/>
    }</>
}
