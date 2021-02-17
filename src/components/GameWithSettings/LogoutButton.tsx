import React from "react";
import {connect} from "react-redux";

import {StyledButton} from "@/components/styled/StyledComponents";
import {clearName} from "@/rdx/user/userSlice";

interface ReduxProps {
    onLogout: () => void
}

const RawLogoutButton: React.FC<ReduxProps> = props => <StyledButton onClick={props.onLogout}>Log out</StyledButton>

const mapDispatchToProps = {
    onLogout: clearName,
};

export const LogoutButton = connect(null, mapDispatchToProps)(RawLogoutButton);
