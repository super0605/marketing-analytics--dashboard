import * as React from 'react';
import styled from 'styled-components';
import {h1StyleProps} from "../../../constants/style-constants";

const H1 = styled.h1`
  ${h1StyleProps};
`

interface H1CompProps {
  content: string;
}
const H1Comp = (props: H1CompProps) => {
  const { content } = props;
  return (
    <H1>
      {content} 
    </H1>
  );
}

export default H1Comp;
