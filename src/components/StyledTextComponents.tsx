import styled from "@emotion/styled";
import {css} from "@emotion/react";
import {CurrentTheme} from "./StyledColors";

const BaseFont = css`
  font-family: Tahoma, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 15px;
  color: ${CurrentTheme.mainForeColor};
`;

const SelectedFontSmall = css`
  font-family: Tahoma, serif;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
`;

export const RangeLabel = styled.span`
  ${BaseFont};
  display: inline;
  vertical-align: top;
  width: 10%;
  color: ${CurrentTheme.backForeColor};
  background-color: ${CurrentTheme.backgroundColor};
`;

export const CenteredLabel = styled.legend`
  ${SelectedFontSmall};
  text-align: center;
  width: 100%;
  color: ${CurrentTheme.accentForeColor};
  background-color: ${CurrentTheme.backgroundColor};
`;
