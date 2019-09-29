import React from "react";
import styled from "styled-components";
import {colors, fontSizesEmMajorThird} from "../../../constants/constants";
import {baseFontStyleProps} from "../../../constants/style-constants"


const TextLink = styled.a`
  ${baseFontStyleProps};
  color: ${colors.blueViking};
  font-size: ${fontSizesEmMajorThird.small}
`

interface TextLinkCompProps {
  label: string,
}
const TextLinkComp = (props: TextLinkCompProps) => {
  const {label} = props;
  return (
    <TextLink href="#">{label}</TextLink>
  );
};

export default TextLinkComp;