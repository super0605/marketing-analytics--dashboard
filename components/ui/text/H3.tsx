import * as React from 'react'
import styled from 'styled-components';
import {h3StyleProps} from "../../../constants/style-constants";

const H3 = styled.h3`
  ${h3StyleProps};
`

interface H3CompProps {
  content: string;
}
const H3Comp = (props: H3CompProps) => {
  const { content } = props;
  return (
    <H3>
      {content} 
    </H3>
  );
}

export default H3Comp