import * as React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { mapTableHoverAction } from '../../../redux/constants';
import { countryData } from '../../../redux/reducer/mapTableHover';

import { colors, sizes, elementSizes, px } from "../../../constants/constants";
import { labelBase } from "../../../constants/style-constants";
import { MapAnalyticsData } from "../../../constants/interfaces";

const CustomTable = styled.div`
    width: 100%;
    position: relative;
`

const TableHeader = styled.div`
    display: flex;
    margin-right: ${px(-Math.abs(sizes.little))};
    margin-left: ${px(-Math.abs(sizes.little))};
`;

const TableBody = styled.div`
    width: 100%;
`;

interface THProps {
    thWidth: number;
}
const TH = styled.div`
    width: ${(props: THProps) => props.thWidth}${"%"};
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
    width: ${(props: TDProps) => props.tdWidth}${"%"};
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

const CountryVal = styled.div`
    width: 100%;
    ${labelBase};
`;

const Currency = styled.div`
    position: absolute;
    left: ${px(sizes.little)};
    ${labelBase};
`;

const RevenueVal = styled.div`
    ${labelBase};
    width: 100%;
    text-align: center;
`;

const ChangeVal = styled.div`
    ${labelBase};
`;

const Percent = styled.div`
    ${labelBase};
`;

const ChangeSignal = styled.div`
    ${labelBase};
    padding-left: ${px(sizes.micro)};
`;

interface DropdownCompProps {
    mapAnalyticsData: MapAnalyticsData[];
    mapTableHover?: any;
}
interface DropDownCompState {

}
class CustomTableComp extends React.Component<DropdownCompProps, DropDownCompState> {
    constructor(props: DropdownCompProps) {
        super(props);
        this.state = {
        };
    }

    handleHover = (countyData: MapAnalyticsData) => {
        this.props.mapTableHover(countyData);
    }

    render() {
        const { mapAnalyticsData } = this.props;
        
        return (
            <CustomTable>
                <TableHeader>
                    <TH thWidth={50}>Country<BottomLine /></TH>
                    <TH thWidth={25}>Revenue<BottomLine /></TH>
                    <TH thWidth={25}>Change<BottomLine /></TH>
                </TableHeader>
                <TableBody>
                    {mapAnalyticsData.map((data, k) => (
                        <TR key={k} onMouseEnter={this.handleHover.bind(this, data)} >
                            <TD tdWidth={50}>
                                <CountryVal>{data.country}</CountryVal>
                            </TD>
                            <TD tdWidth={25}>
                                <Currency>$</Currency>
                                <RevenueVal>{data.revenue}m</RevenueVal>
                            </TD>
                            <TD tdWidth={25}>
                                <ChangeVal>{Math.sign(data.change) == -1 ? '- ' : '+ '}{data.change}</ChangeVal>
                                <Percent>%</Percent>
                                <ChangeSignal>yoy</ChangeSignal>
                            </TD>
                        </TR>
                    ))}
                </TableBody>
            </CustomTable>
        );
    }
}

const mapStateToProps = (state) => ({
    hoverCountryData: state.mapTableHover.countryData,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    mapTableHover: (countryData: countryData) => dispatch({ type: mapTableHoverAction.MAP_TABLE_HOVER_START, payload: countryData }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomTableComp);
