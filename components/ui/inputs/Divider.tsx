import * as React from 'react';
import styled from 'styled-components';
import { colors } from "../../../constants/constants";

interface DividerProps {
  width: string;
  height: string;
  bgColor: string;
}
const Divider = styled.div`
  width: ${(props: DividerProps) => props.width};
  height: ${(props: DividerProps) => props.height};
  background-color: ${(props: DividerProps) => props.bgColor};
`;

interface DividerCompoProps {
  width?: string;
  height?: string;
  bgColor?: string;
}
const DividerCompo = (props: DividerCompoProps) => {
  const { width = '100%', height = '1px', bgColor = colors.grayMedium } = props;
  return (
    <Divider
      width={width}
      height={height}
      bgColor={bgColor}
    />
  );
}

export default DividerCompo;
