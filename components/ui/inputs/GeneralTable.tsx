import * as React from 'react';
import styled from 'styled-components';

import { colors, sizes, elementSizes, px, fonts } from "../../../constants/constants";
import { labelBase } from "../../../constants/style-constants";
import { GeneralTH } from "../../../constants/interfaces";

const GeneralTable = styled.div`
    width: 100%;
    position: relative;
`

const TableHeader = styled.div`
    display: flex;
    margin-right: ${px(-Math.abs(sizes.little))};
    margin-left: ${px(-Math.abs(sizes.little))};
    font-weight: ${fonts.weightSemiBold};
`;

const TableBody = styled.div`
    width: 100%;
`;

interface THProps {
  thWidth: number;
}
const TH = styled.div`
    width: ${(props: THProps) => props.thWidth || 100}%;
    height: ${px(elementSizes.inputHeight)};
    padding-right: ${px(sizes.little)};
    padding-left: ${px(sizes.little)};
`;

const TR = styled.div`
    margin-right: ${px(-Math.abs(sizes.little))};
    margin-left: ${px(-Math.abs(sizes.little))};
    display: flex;
    padding-top: ${px(sizes.micro)};
    min-height: ${px(elementSizes.inputHeight)};

    :hover {
        cursor: pointer;
        background-color: #eee;
    }
`;

interface TDProps {
  tdWidth: number;
}
const TD = styled.div`
    width: ${(props: TDProps) => props.tdWidth || 100}%;
    display: flex;
    position: relative;
    padding-right: ${px(sizes.little)};
    padding-left: ${px(sizes.little)};
`;

const BottomLine = styled.div`
  height: ${px(sizes.dblhair)};
  width: 100%;
  left: 0;
  bottom: ${-px(sizes.dblhair)};
  background-color: ${colors.blueDatavizPrimary};
`

const TDValue = styled.div`
    width: 100%;
    ${labelBase};
`;

interface DropdownCompProps<TD> {
  theaderData: GeneralTH[];
  tbodyData: TD[];
}
interface DropDownCompState {

}
class GeneralTableComp<TD> extends React.Component<DropdownCompProps<TD>, DropDownCompState> {
  constructor(props: DropdownCompProps<TD>) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { theaderData, tbodyData } = this.props;

    return (
      <GeneralTable>
        <TableHeader>
          {
            theaderData.map((th, k) => (
              <TH key={`th-${k}`} thWidth={th.width}>{th.value}<BottomLine /></TH>
            ))
          }
        </TableHeader>
        <TableBody>
          {
            tbodyData ?
              tbodyData.map((data, k) => (
                <TR key={`tr-${k}`}>
                  {
                    theaderData.map((th, i) => (
                      <TD key={`trtd-${i}`} tdWidth={th.width}>
                        {
                          (data[th.key] !== undefined && data[th.key]) ?
                          <TDValue>{th.formatter ? th.formatter(data[th.key]) : data[th.key]}</TDValue> :
                          <TDValue>no value</TDValue>
                        }
                      </TD>
                    ))
                  }
                </TR>
              )) :
              <TR>No data</TR>
          }
        </TableBody>
      </GeneralTable>
    );
  }
}

export default GeneralTableComp;

