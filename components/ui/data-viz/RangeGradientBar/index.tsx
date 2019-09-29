import * as React from 'react';
import styled from 'styled-components';
import { sizes, px, fonts } from "../../../../constants/constants";
import { baseFontStyleProps } from "../../../../constants/style-constants";

interface RangeGradientBarProps {
    display: string;
}
const RangeGradientBar = styled.div`
    width: 100%;
    display: ${(props: RangeGradientBarProps) => props.display };
    box-sizing: border-box;
`;

interface BarWrapperProps {
    barWidth: number;
}
const BarWrapper = styled.div`
    width: ${(props: BarWrapperProps) => props.barWidth}${"px"};
`;

interface RangeGradientColorBarProps {
    gradient: string;
}
const RangeGradientColorBar = styled.div`
    height: ${px(sizes.fine)};
    width: 100%;
    border-radius: 5px;
    ${(props: RangeGradientColorBarProps) => (props.gradient ? props.gradient : "background-image: linear-gradient(to right, #dcd6e0, #c2b7c9, #a999b1, #907b9b, #785f84);")}
`;

const Range = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const RangeValue = styled.div`
    ${baseFontStyleProps};
    font-size: ${px(sizes.fine)};
`;

const FilterName = styled.div`
    ${baseFontStyleProps};
    font-size: ${px(sizes.little)};
    padding: 0 ${px(sizes.micro)} ${px(sizes.fine)} ${px(sizes.tiny)};
`;

const BarTitle = styled.div`
    ${baseFontStyleProps};
    font-size: ${px(sizes.little)};
`;

interface RangeGradientBarCompoProps {
    startVal: string;
    endVal: string;
    name?: string;
    title?: string;
    barWidth?: number;
    gradient?: string;
}
const RangeGradientBarCompo = (props: RangeGradientBarCompoProps) => {
    return (
        <RangeGradientBar display={props.title ? "block" : "flex"}>
            <BarTitle>{props.title}</BarTitle>
            <BarWrapper barWidth={props.barWidth || 200}>
                <RangeGradientColorBar gradient={props.gradient} />
                <Range>
                    <RangeValue>{props.startVal}</RangeValue>
                    <RangeValue>{props.endVal}</RangeValue>
                </Range>
            </BarWrapper>
            <FilterName>{props.name}</FilterName>
        </RangeGradientBar>
    );
}

export default RangeGradientBarCompo;
