import React, {useCallback} from "react";
import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";

import {StyledButton} from "@/components/styled/StyledComponents";
import {AppState} from "@/rdx/reducers";
import {clearNameGen} from "@/saga/first";

interface ReduxProps {
    onLogout: () => void
}

const RawLogoutButton: React.FC<ReduxProps> = props => {
    const logout = useCallback(() => {
        props.onLogout()
    }, [])
    return <StyledButton onClick={logout}>Log out</StyledButton>
}

function mapStateToProps(state: AppState) {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({
        onLogout: clearNameGen,
    }, dispatch)
}

export const LogoutButton = connect(mapStateToProps, mapDispatchToProps)(RawLogoutButton);
