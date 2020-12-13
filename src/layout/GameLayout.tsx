import React from "react";
import {GameWithSettings} from "../components/GameWithSettings";
import {ColumnLayout} from "./ColumnLayout";

export class GameLayout extends React.Component<{}> {

  shouldComponentUpdate(): boolean {
    return false;
  }

  render() {
    return (<>
      <ColumnLayout><GameWithSettings/></ColumnLayout>
      <ColumnLayout><GameWithSettings/></ColumnLayout>
    </>);
  }
}