import * as React from 'react';
import styled from 'styled-components';
import {sizes, px} from "../../../../constants/constants";
import {baseFontStyleProps} from "../../../../constants/style-constants";

const MapFilterByMoney = styled.div`
    width: 100%;
    display: flex;
    box-sizing: border-box;
    padding-top: ${px(sizes.junior)};
    padding-bottom: ${px(sizes.fine)};
`;

interface BarWrapperProps {
    barWidth: number;
} 
const BarWrapper = styled.div`
    width: ${(props: BarWrapperProps) => props.barWidth}${"px"};
`;


const MoneyColorBar = styled.div`
    height: ${px(sizes.fine)};
    width: 100%;
    border-radius: 5px;
    background-image: linear-gradient(to right, #dcd6e0, #c2b7c9, #a999b1, #907b9b, #785f84);
`;

const Range = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const RangeValue = styled.div`
    ${baseFontStyleProps};
    font-size: ${px(sizes.little)};
`;

const FilterName = styled.div`
    ${baseFontStyleProps};
    font-size: ${px(sizes.little)};
    padding: 0 ${px(sizes.micro)} ${px(sizes.fine)} ${px(sizes.tiny)};
`;

interface MapFilterByMoneyCompoProps {
    startVal: number;
    endVal: number;
    filter: string;
}
const MapFilterByMoneyCompo = (props: MapFilterByMoneyCompoProps) => {
    return (
        <MapFilterByMoney>
            <BarWrapper barWidth={200}>
                <MoneyColorBar />
                <Range>
                    <RangeValue>{props.startVal}m</RangeValue>
                    <RangeValue>{props.endVal}m</RangeValue>
                </Range>
            </BarWrapper>
            <FilterName>{props.filter}</FilterName>
        </MapFilterByMoney>
    );
}

export default MapFilterByMoneyCompo;
