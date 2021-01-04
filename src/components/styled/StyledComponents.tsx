import styled from "@emotion/styled";
import {css} from "@emotion/core";
import {CurrentTheme} from "./StyledColors";
import {SelectedFontSmall} from "./StyledTextComponents";
import React from "react";

const TableBorder = css`
  border-width: 1px;
  border-style: solid;
  border-color: ${CurrentTheme.mainForeColor};
`;

const NoBorderTable = css`
  border-style: none;
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  ${TableBorder};
`;

export const LayoutTable = styled.table`
  border-collapse: collapse;
  ${NoBorderTable};
`;

export const StyledTr = styled.tr`
  ${TableBorder};
`;

export const LayoutTr = styled.tr`
  ${NoBorderTable};
`;

interface StyledCellProp {
  filled: boolean;
  id: string;
  onClick: () => void;
  children?: string;
}

const CommonCell = css`
  text-align: center;
  width: 1.5em;
  height: 1.5em;
`;

const EmptyCell = css`
  background-color: ${CurrentTheme.backgroundColor};
  color: ${CurrentTheme.accentForeColor};
`;

const FilledCell = css`
  background-color: ${CurrentTheme.accentForeColor};
  color: ${CurrentTheme.backgroundColor};
`;

export const LayoutTd = styled.td`
  ${CommonCell};
  ${NoBorderTable};
  height: 80px;
`;

export const StyledTd = styled.td`
  ${TableBorder};
  text-align: center;
  ${({filled}: StyledCellProp) => (filled ? FilledCell : EmptyCell)};
  height: 20px;
  width: 20px;
`;

export const StyledInput = styled.input`
  border-width: 1px;
  border-radius: 4px;
  border-style: solid;
  color: ${CurrentTheme.mainForeColor};
  background-color: ${CurrentTheme.backgroundColor};
`;

export const StyledRange = styled.input`
  width: 85%;
  color: ${CurrentTheme.mainForeColor};
  background-color: ${CurrentTheme.backgroundColor};
`;

export const RangeBlock = styled.div`
  display: inline-block;
  width: 400px;
  height: 15px;
  background-color: ${CurrentTheme.backgroundColor};
`;

export const ColumnBlockFC: React.FC<{ width: string, name: string }> = ({width, name, children}) => {
  const Cmp = styled.div`
    display: inline-block;
    width: ${width};
    background-color: ${CurrentTheme.backgroundColor};
  `;

  return <Cmp data-name={name}>
    {children}
  </Cmp>;
}

export const StyledButton = styled.button`
  ${SelectedFontSmall};
  width: 200px;
  height: 40px;
  border-radius: 8px;
  background: ${CurrentTheme.accentForeColor};
  color: ${CurrentTheme.backgroundColor};
  margin-top: 20px;
  border-style: none;
`;

export const StyledFieldSet = styled.fieldset`
  border-color: ${CurrentTheme.accentForeColor};
  border-width: 1px;
  border-radius: 8px;
  border-style: solid;
  width: 500px;
`;

export const StyledBlock = styled.div`
  display: inline-block;
  margin-top: 10px;
  margin-right: 10px;
  vertical-align: top;
`;