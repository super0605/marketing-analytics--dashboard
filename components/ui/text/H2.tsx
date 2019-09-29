import * as React from 'react';
import styled from 'styled-components';
import {h2StyleProps} from "../../../constants/style-constants";

const H2 = styled.h2`
  ${h2StyleProps};
`

interface H2CompProps {
  content: string;
}
const H2Comp = (props: H2CompProps) => {
  const { content } = props;
  return (
    <H2>
      {content} 
    </H2>
  );
}

export default H2Comp;
