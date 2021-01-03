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

export const SelectedFontSmall = css`
  font-family: Tahoma, serif;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
`;

export const SelectedFontMedium = css`
  font-family: Tahoma, serif;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
`;

export const NormalFontLarge = css`
  font-family: Tahoma, serif;
  font-style: normal;
  font-size: 22px;
  color: ${CurrentTheme.mainForeColor};
`;

export const StyledP = styled.p`
  ${NormalFontLarge}
`;

export const ErrorLabel = styled.span`
  color: ${CurrentTheme.errorForeColor};
`;

export const RangeLabel = styled.span`
  ${BaseFont};
  vertical-align: top;
  width: 10%;
  color: ${CurrentTheme.backForeColor};
  background-color: ${CurrentTheme.backgroundColor};
`;

export const CenteredLabel = styled.span`
  ${SelectedFontSmall};
  display: inline-block;
  text-align: center;
  width: 100%;
  color: ${CurrentTheme.accentForeColor};
  background-color: ${CurrentTheme.backgroundColor};
`;

export const FieldTitle = styled.span`
  ${SelectedFontSmall};
  color: ${CurrentTheme.accentForeColor};
  background-color: ${CurrentTheme.backgroundColor};
`;

export const TableTitle = styled.legend`
  ${SelectedFontMedium};
  color: ${CurrentTheme.accentForeColor};
  background-color: ${CurrentTheme.backgroundColor};
`;

