import React from "react";
import {ColumnBlockFC} from "@/components/styled/StyledComponents";
import {GameWithSettings} from "@/components/GameWithSettings";

type ColQuantity = 1 | 2 | 3 | 4;

interface ColumnLayoutProps {
  name: string;
  col_quantity: ColQuantity;
}

class ColumnLayout extends React.Component<ColumnLayoutProps> {

  shouldComponentUpdate(): boolean {
    return false;
  }

  render() {
    const width = Math.round(100 / this.props.col_quantity) + "%"
    return <ColumnBlockFC width={width} name={this.props.name}>
      {this.props.children}
    </ColumnBlockFC>;
  }
}

function columnLayoutHoc(cq: ColQuantity, Component: React.ComponentType) {
  return ({name}: { name: string }) => <ColumnLayout name={name} col_quantity={cq}><Component/></ColumnLayout>
}

export const GameHalfWindowColumn = columnLayoutHoc(2, GameWithSettings);
