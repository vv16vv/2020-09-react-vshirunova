import React from "react";
import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";

import {StyledButton} from "@/components/styled/StyledComponents";
import {clearName} from "@/rdx/saga";

interface ReduxProps {
    onLogout: () => void
}

const RawLogoutButton: React.FC<ReduxProps> = props => <StyledButton onClick={props.onLogout}>Log out</StyledButton>

function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({
        onLogout: clearName,
    }, dispatch)
}

export const LogoutButton = connect(null, mapDispatchToProps)(RawLogoutButton);
