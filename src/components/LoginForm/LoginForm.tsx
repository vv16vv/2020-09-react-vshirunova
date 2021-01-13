import React, {ChangeEvent} from "react";
import {LayoutTable, LayoutTd, LayoutTr, StyledButton, StyledFieldSet, StyledInput} from "styled/StyledComponents";
import {FieldTitle, TableTitle} from "styled/StyledTextComponents";

export interface LoginFormResult {
    login: string;
}

export const initialFormProps: LoginFormResult = {
    login: "vitkus",
} as const;

interface LoginFormProps {
    onSubmit: (settings: LoginFormResult) => void;
}

export class LoginForm extends React.Component<LoginFormProps, LoginFormResult> {

    state = {...initialFormProps}

    changeLogin = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            login: e.target.value ?? ""
        })
    }

    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        this.props.onSubmit({
            login: this.state.login,
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <StyledFieldSet>
                    <TableTitle>Enter your name to play</TableTitle>
                    <LayoutTable>
                        <tbody>
                        <LayoutTr>
                            <LayoutTd><FieldTitle>Name</FieldTitle></LayoutTd>
                            <LayoutTd><StyledInput
                                name={"name"}
                                value={this.state.login}
                                onChange={this.changeLogin}
                            /></LayoutTd>
                        </LayoutTr>
                        </tbody>
                    </LayoutTable>
                </StyledFieldSet>
                <StyledButton>Apply</StyledButton>
            </form>
        );
    }
}
