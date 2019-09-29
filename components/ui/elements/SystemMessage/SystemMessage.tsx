import * as React from 'react';
import styled from 'styled-components';
import {colors, px, sizes} from "../../../../constants/constants";
import {labelMicro} from "../../../../constants/style-constants";

const SystemMessage = styled.div`
  ${labelMicro};
  background-color: ${colors.orangeVividAlpha5};
  border-left: ${px(sizes.dblhair)} solid ${colors.orangeVivid};
  padding: ${px(sizes.tiny)};
  margin-bottom: ${px(sizes.tiny)};
`;

interface SystemMessageCompProps {
  text: string;
}
const SystemMessageComp = (props: SystemMessageCompProps) => {
  const { text } = props;
  return (
    <SystemMessage>
      {text} 
    </SystemMessage>
  );
}

export default SystemMessageComp;
