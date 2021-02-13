import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {pick} from "ramda";

import {Paths} from "@/Paths";
import {AppState} from "@/rdx/reducers";
import {GameHalfWindowColumn} from "@/components/Layout";
import {loading} from "@/rdx/user/userSlice";

interface ReduxProps {
    isLoggedIn: boolean;
    isLoggingOut: boolean;
    loading: () => void;
}

export const RawGamePage: React.FC<ReduxProps> = props => {
    useEffect(() => {
        if (!props.isLoggingOut)
            props.loading()
    })
    return <>{
        props.isLoggedIn
            ? <GameHalfWindowColumn name={"left"}/>
            : <Redirect to={Paths.Root}/>
    }</>;
}

const mapStateToProps = ({user}: AppState) => (pick(
    ['isLoggedIn', 'isLoggingOut'],
    user))

const mapDispatchToProps = {
    loading,
};

export const GamePage = connect(mapStateToProps, mapDispatchToProps)(RawGamePage);