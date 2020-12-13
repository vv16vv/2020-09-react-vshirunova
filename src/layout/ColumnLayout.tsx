import React from "react";
import {ColumnBlock} from "../components/StyledComponents";

export class ColumnLayout extends React.Component<{}> {

  shouldComponentUpdate(): boolean {
    return false;
  }

  render() {
    return <ColumnBlock>
      {this.props.children}
    </ColumnBlock>;
  }
}