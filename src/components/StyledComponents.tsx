import styled from "@emotion/styled";
import {css} from "@emotion/core";
import {CurrentTheme} from "./StyledColors";

const TableBorder = css`
  border-width: 1px;
  border-style: solid;
  border-color: ${CurrentTheme.mainForeColor};
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  ${TableBorder};
`;

export const StyledTr = styled.tr`
  ${TableBorder};
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
  ${TableBorder};
`;

const EmptyCell = css`
  background-color: ${CurrentTheme.backgroundColor};
  color: ${CurrentTheme.accentForeColor};
`;

const FilledCell = css`
  background-color: ${CurrentTheme.accentForeColor};
  color: ${CurrentTheme.backgroundColor};
`;

export const StyledTd = styled.td`
  ${CommonCell};
  ${({filled}: StyledCellProp) => (filled ? FilledCell : EmptyCell)};
`;

export const StyledRange = styled.input`
  width: 85%;
  color: ${CurrentTheme.mainForeColor};
  background-color: ${CurrentTheme.backgroundColor};
`;

export const RangeBlock = styled.div`
  width: 200px;
  height: 15px;
  background-color: ${CurrentTheme.backgroundColor};
`;

