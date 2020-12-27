import React from "react";
import {GameHalfWindowColumn} from "./ColumnLayout";

export class GameLayout extends React.Component<{}> {

  shouldComponentUpdate(): boolean {
    return false;
  }

  render() {
    return (<>
      <GameHalfWindowColumn name={"left"}/>
      <GameHalfWindowColumn name={"right"}/>
    </>);
  }
}