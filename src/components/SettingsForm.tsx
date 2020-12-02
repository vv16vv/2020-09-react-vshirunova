import React from "react";
import {Range} from "./Range";
import {FieldTitle, TableTitle} from "./StyledTextComponents";
import {LayoutTable, LayoutTd, LayoutTr, StyledButton, StyledFieldSet} from "./StyledComponents";

export interface SettingsFormResult {
    width: number;
    height: number;
    frequency: number;
}

export const initialFormProps: SettingsFormResult = {
    width: 10,
    height: 10,
    frequency: 5000
} as const;

export interface SettingsFormProps {
    onSubmit: (settings: SettingsFormResult) => void;
}

const milliInSecond = 1000;

export class SettingsForm extends React.Component<SettingsFormProps, SettingsFormResult> {

    constructor(props: SettingsFormProps) {
        super(props);
        this.state = {
            ...initialFormProps,
            frequency: initialFormProps.frequency / milliInSecond
        };
    }

    changeWidth = (newValue: number) => {
        this.setState({
            width: newValue
        })
    }

    changeHeight = (newValue: number) => {
        this.setState({
            height: newValue
        })
    }

    changeFrequency = (newValue: number) => {
        this.setState({
            frequency: newValue
        })
    }

    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        this.props.onSubmit({
            width: this.state.width,
            height: this.state.height,
            frequency: this.state.frequency * milliInSecond,
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <StyledFieldSet>
                    <TableTitle>Game Settings</TableTitle>
                    <LayoutTable>
                        <tbody>
                        <LayoutTr>
                            <LayoutTd><FieldTitle>Width</FieldTitle></LayoutTd>
                            <LayoutTd><Range
                                name={"Width"}
                                max={50}
                                value={this.state.width}
                                changeHandler={this.changeWidth}/></LayoutTd>
                        </LayoutTr>
                        <LayoutTr>
                            <LayoutTd><FieldTitle>Height</FieldTitle></LayoutTd>
                            <LayoutTd><Range
                                name={"Height"}
                                max={50}
                                value={this.state.height}
                                changeHandler={this.changeHeight}/></LayoutTd>
                        </LayoutTr>
                        <LayoutTr>
                            <LayoutTd><FieldTitle>Frequency, sec</FieldTitle></LayoutTd>
                            <LayoutTd><Range
                                name={"Frequency"}
                                max={10} min={2} step={0.5}
                                value={this.state.frequency}
                                changeHandler={this.changeFrequency}/></LayoutTd>
                        </LayoutTr>
                        </tbody>
                    </LayoutTable>
                </StyledFieldSet>
                <StyledButton>Apply</StyledButton>
            </form>
        );
    }
}
