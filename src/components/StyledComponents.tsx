import styled from "@emotion/styled";
import {css} from "@emotion/core";

const TableBorder = css`
  border-width: 1px;
  border-style: solid;
  border-color: black;
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
  background-color: white;
  color: darkblue;
`;

const FilledCell = css`
  background-color: darkblue;
  color: white;
`;

export const StyledTd = styled.td`
  ${CommonCell};
  ${({filled}: StyledCellProp) => (filled ? FilledCell : EmptyCell)};
`;