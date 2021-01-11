import "regenerator-runtime/runtime.js";
import React, {useCallback, useEffect, useState} from "react";
import {Redirect, useHistory} from "react-router-dom";

import {LoginForm, LoginFormResult} from "cmp/LoginForm";
import {LoginStorage} from "@/logic/LoginStorage";
import {Paths} from "@/Paths";

export const LoginPage: React.FC<{}> = () => {
    const history = useHistory()
    const submitHandler = useCallback(({login}: LoginFormResult) => {
        LoginStorage
            .putNameToStorage(login)
            .then(() => history.push(Paths.Game))
    }, [])
    const [isLoggedIn, setLoggedIn] = useState(false)
    useEffect(() => {
        async function isLoggedIn() {
            const result = await LoginStorage.isNameSet()
            setLoggedIn(result)
        }
        isLoggedIn()
    })
    return <>{
        isLoggedIn
            ? <Redirect to={Paths.Game}/>
            : <LoginForm onSubmit={submitHandler}/>
    }</>
}
