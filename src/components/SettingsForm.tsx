import React from "react";
import {Form, Formik} from "formik";
import {Range} from "./Range";
import {FieldTitle, TableTitle} from "./StyledTextComponents";
import {LayoutTable, LayoutTd, LayoutTr, StyledButton, StyledFieldSet} from "./StyledComponents";

export interface SettingsFormResult {
    width: number;
    height: number;
    frequency: number;
}

const initialFormProps: SettingsFormResult = {
    width: 10,
    height: 10,
    frequency: 5
} as const;

export interface SettingsFormProps {
    onSubmit: (settings: SettingsFormResult) => void;
}

export class SettingsForm extends React.Component<SettingsFormProps, SettingsFormResult> {

    constructor(props: SettingsFormProps) {
        super(props);
        this.state = {
            ...initialFormProps
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

    render() {
        return (
            <Formik initialValues={initialFormProps} onSubmit={this.props.onSubmit}>
                <Form id={"settingsForm"}>
                    <StyledFieldSet>
                        <TableTitle>Game Settings</TableTitle>
                        <LayoutTable>
                            <tbody>
                            <LayoutTr>
                                <LayoutTd><FieldTitle>Width</FieldTitle></LayoutTd>
                                <LayoutTd><Range max={50} value={initialFormProps.width}
                                                 changeHandler={this.changeWidth}/></LayoutTd>
                            </LayoutTr>
                            <LayoutTr>
                                <LayoutTd><FieldTitle>Height</FieldTitle></LayoutTd>
                                <LayoutTd><Range max={50} value={initialFormProps.height}
                                                 changeHandler={this.changeHeight}/></LayoutTd>
                            </LayoutTr>
                            <LayoutTr>
                                <LayoutTd><FieldTitle>Frequency, sec</FieldTitle></LayoutTd>
                                <LayoutTd><Range max={10} min={2} step={0.5} value={initialFormProps.frequency}
                                                 changeHandler={this.changeFrequency}/></LayoutTd>
                            </LayoutTr>
                            </tbody>
                        </LayoutTable>
                    </StyledFieldSet>
                    <StyledButton>Apply</StyledButton>
                </Form>
            </Formik>
        );
    }
}
