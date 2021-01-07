import React from "react";
import {Range} from "cmp/Range";
import {FieldTitle, TableTitle} from "styled/StyledTextComponents";
import {LayoutTable, LayoutTd, LayoutTr, StyledButton, StyledFieldSet} from "styled/StyledComponents";

export interface SettingsFormResult {
    width: number;
    height: number;
    frequency: number;
    userName?: string;
}

export interface SettingsFormProps extends SettingsFormResult {
    onSubmit: (settings: SettingsFormResult) => void;
}

const milliInSecond = 1000;

export class SettingsForm extends React.Component<SettingsFormProps, SettingsFormResult> {

    constructor(props: SettingsFormProps) {
        super(props);
        this.state = {
            ...props,
            userName: this.calculateUserName(props.userName),
            frequency: this.calculateFrequency(props.frequency)
        };
    }

    changeValue = (field: string, newValue: number) => {
        this.setState({
            [field]: newValue
        } as Pick<SettingsFormResult, "width" | "height" | "frequency">)
    }

    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        this.props.onSubmit({
            width: this.state.width,
            height: this.state.height,
            frequency: this.state.frequency * milliInSecond,
        });
    }

    calculateUserName = (userName: string | undefined): string => {
        return userName && userName !== "" ? `for ${userName}` : ""
    }

    calculateFrequency = (frequency: number):number => {
        return frequency / milliInSecond
    }

    shouldComponentUpdate(nextProps: Readonly<SettingsFormProps>, nextState: Readonly<SettingsFormResult>): boolean {
        if(nextProps.userName !== this.props.userName) {
            this.setState({
                userName: this.calculateUserName(nextProps.userName)
            })
        }
        if(nextProps.width !== this.props.width) {
            this.setState({
                width: nextProps.width
            })
        }
        if(nextProps.height !== this.props.height) {
            this.setState({
                height: nextProps.height
            })
        }
        if(nextProps.frequency !== this.props.frequency) {
            this.setState({
                frequency: this.calculateFrequency(nextProps.frequency)
            })
        }
        return true;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <StyledFieldSet>
                    <TableTitle>{`Game Settings ${this.state.userName}`}</TableTitle>
                    <LayoutTable>
                        <tbody>
                        <LayoutTr>
                            <LayoutTd><FieldTitle>Width</FieldTitle></LayoutTd>
                            <LayoutTd><Range
                                name={"width"}
                                max={50}
                                value={this.state.width}
                                changeHandler={this.changeValue}/></LayoutTd>
                        </LayoutTr>
                        <LayoutTr>
                            <LayoutTd><FieldTitle>Height</FieldTitle></LayoutTd>
                            <LayoutTd><Range
                                name={"height"}
                                max={50}
                                value={this.state.height}
                                changeHandler={this.changeValue}/></LayoutTd>
                        </LayoutTr>
                        <LayoutTr>
                            <LayoutTd><FieldTitle>Frequency, sec</FieldTitle></LayoutTd>
                            <LayoutTd><Range
                                name={"frequency"}
                                max={10} min={2} step={0.5}
                                value={this.state.frequency}
                                changeHandler={this.changeValue}/></LayoutTd>
                        </LayoutTr>
                        </tbody>
                    </LayoutTable>
                </StyledFieldSet>
                <StyledButton>Apply</StyledButton>
            </form>
        );
    }
}
