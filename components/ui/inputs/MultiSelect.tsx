import * as React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { px, sizes, colors } from '../../../constants/constants';

const MultiSelectWrap = styled.div`
  width: 100%;
`;

const multiSelectStyle = {
  control: (base, state) => ({
    ...base,
    borderTop: "0 !important",
    borderLeft: "0 !important",
    borderRight: "0 !important",
    boxShadow: "0 !important",
    borderColor: "#53B0BF !important",
    borderRadius: "0 !important",
    minHeight: "30px !important",
    "&:hover": {
      borderTop: "0 !important",
      borderLeft: "0 !important",
      borderRight: "0 !important",
      borderColor: "#53B0BF !important",
      borderRadius: "0 !important",
      minHeight: "30px !important",
    }
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    transition: 'all .2s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
    height: "32px !important",
  }),
  menuList: (base, state) => ({
    ...base,
    backgroundColor: "#ffffff",
    lineHeight: "1.25em !important",
    cursor: "pointer",
    borderBottom: "1px solid #F0F0F0 !important",
    fontFamily: "Open Sans',Helvetica,Arial,serif !important",
    fontSize: "0.8em",
    color: "#343434",
    fontWeight: "400 !important",
    textAlign: "left !important",
    "&:hover": {
      backgroundColor: "#eee !important",
    }
  }),
  valueContainer: (base, state) => ({
    ...base,
    padding: "0 8px !important",
  }),
};

const SVG = styled.svg`
  margin-left: ${px(sizes.bristle)};
  top: ${px(sizes.fine)};
  right: ${px(sizes.tiny)};
`

const DropdownIndicator = () => {
  return (
    <div>
      <SVG width="10px" height="6px" viewBox="0 0 10 6">
        <polygon id="Path-12" points="5 6 0 0 10 0" fill={colors.primary}></polygon>
      </SVG>
    </div>
  );
};

interface MultiSelectCompProps {
  options: any
  handleSelect?: (selection: any) => void;
}
interface MultiSelectCompState {
}
class MultiSelectComp extends React.Component<MultiSelectCompProps, MultiSelectCompState> {
  constructor(props: MultiSelectCompProps) {
    super(props);
    this.state = {
    };

  }

  render() {
    const { options, handleSelect } = this.props;

    return (
      <MultiSelectWrap>
        <Select
          isMulti
          options={options}
          styles={multiSelectStyle}
          components={{ DropdownIndicator }}
          onChange={handleSelect && handleSelect}
        />
      </MultiSelectWrap>
    );
  }
}

export default MultiSelectComp;
