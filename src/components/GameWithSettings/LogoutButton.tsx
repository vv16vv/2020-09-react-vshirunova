import React from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";

import {StyledButton} from "@/components/styled/StyledComponents";
import {clearName} from "@/rdx/user/saga";

interface ReduxProps {
    onLogout: () => void
}

const RawLogoutButton: React.FC<ReduxProps> = props => <StyledButton onClick={props.onLogout}>Log out</StyledButton>

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onLogout: () => dispatch(clearName({})),
});

export const LogoutButton = connect(null, mapDispatchToProps)(RawLogoutButton);
