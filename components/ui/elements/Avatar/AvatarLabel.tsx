import * as React from 'react';
import styled from 'styled-components';
import {px, sizes, colors} from "../../../../constants/constants"
import {labelBase, labelMicro} from "../../../../constants/style-constants"

const AvatarLabelWrapper = styled.div`
`

interface AvatarLabelProps {
  size?: "small" | "medium",
  alignment?: "left" | "right",
}
const AvatarLabel = styled.div`
  ${(props: AvatarLabelProps) =>
    props.size && props.size === "small" ? labelMicro : labelBase};
  
  text-align: right;
  margin: ${(props: AvatarLabelProps) =>
    props.size && props.size === "small" ? `0 ${px(sizes.tiny)}` : `0 ${px(sizes.fine)}`};
`;

const AvatarSubLabel = styled.div`
  ${labelMicro};
  color: ${colors.grayShady};
  margin: 0 ${px(sizes.fine)};
`;

interface AvatarLabelCompProps {
  label: string;
  sublabel?: string;
  size?: "small" | "medium";
  alignment?: "left" | "right";
}
const AvatarLabelComp = (props: AvatarLabelCompProps) => {
  const { label, sublabel, size, alignment } = props;
  return (
    <AvatarLabelWrapper>
      <AvatarLabel size={size} alignment={alignment} >
        {label} 
      </AvatarLabel>
      
      {sublabel &&
        <AvatarSubLabel>
          {sublabel}
        </AvatarSubLabel>
      }
    </AvatarLabelWrapper>
  );
}

export default AvatarLabelComp;
