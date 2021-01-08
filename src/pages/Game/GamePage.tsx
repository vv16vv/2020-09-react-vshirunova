import React from "react";
import {GameHalfWindowColumn} from "cmp/Layout";

export class GamePage extends React.Component<{}> {

  shouldComponentUpdate(): boolean {
    return false;
  }

  render() {
    return (<>
      <GameHalfWindowColumn name={"left"}/>
    </>);
  }
}