import * as React from 'react';
import styled from 'styled-components';
import {h4StyleProps} from "../../../constants/style-constants";

const H4 = styled.h4`
  ${h4StyleProps};
`;

interface H4CompProps {
  content: string;
}
const H4Comp = (props: H4CompProps) => {
  const { content } = props;
  return (
    <H4>
      {content} 
    </H4>
  );
}

export default H4Comp;
