import React from "react";
import {GameHalfWindowColumn} from "cmp/Layout";
import {Redirect} from "react-router-dom";

import {Paths} from "@/Paths";
import {LoginStorage} from "@/logic/LoginStorage";

export class GamePage extends React.Component<{}> {

  shouldComponentUpdate(): boolean {
    return false;
  }

  render() {
    return <>{
      LoginStorage.isNameSet()
          ? <GameHalfWindowColumn name={"left"}/>
          : <Redirect to={Paths.Root}/>
    }</>;
  }
}