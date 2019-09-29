import * as React from 'react';
import styled from 'styled-components';
import {px, sizes, colors} from "../../../constants/constants";
import {labelMicro} from "../../../constants/style-constants";

import iconSearch from "../../../static/media/icons/icon__search.png";

const SearchBarWrapper = styled.div`
  position: relative;
  width: ${px(sizes.extremehuge)};
  height: ${px(sizes.compact)};
`

const SearchBar = styled.input`
  ${labelMicro};
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: ${colors.grayUltraLight};
  border: none;
  border-radius: ${px(sizes.little)};
  box-sizing: border-box;
  padding-left: ${px(sizes.compact)};
`;

const IconImage = styled.img`
  position: absolute;
  top: ${px(sizes.thin)};
  left: ${px(sizes.thin)};
  width: ${px(sizes.little)};
  height: ${px(sizes.little)};
`;

interface SearchBarCompProps {
  placeholder: string;
}
const SearchBarComp = (props: SearchBarCompProps) => {
  const { placeholder } = props;
  return (
    <SearchBarWrapper>
      <SearchBar placeholder={placeholder} />
      <IconImage src={iconSearch} />
    </SearchBarWrapper>
  );
}

export default SearchBarComp;
