import React, {useCallback} from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {StyledButton} from "@/components/styled/StyledComponents";
import {clearName} from "@/rdx/features/login";
import {AppState} from "@/rdx/reducers";

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
    return {
        onLogout: () => dispatch(clearName()),
    };
}

export const LogoutButton = connect(mapStateToProps, mapDispatchToProps)(RawLogoutButton);
