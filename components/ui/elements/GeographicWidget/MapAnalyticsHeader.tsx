import * as React from 'react';
import styled from 'styled-components';
import {sizes, fonts, colors, px} from "../../../../constants/constants";
import {baseFontStyleProps} from "../../../../constants/style-constants";

const MapFilterByMoney = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-top: ${px(sizes.junior)};
    padding-bottom: ${px(sizes.fine)};
`;

const HeaderText = styled.div`
    ${baseFontStyleProps};
    line-height: 2.2em;
    font-weight: ${fonts.weightSemiBold};
`;

const Dot3 = styled.div`
    ${baseFontStyleProps};
    font-size: ${px(sizes.medium)};
    line-height: 2.2em;
    font-weight: ${fonts.weightBold};
    color: ${colors.blueViking};
`;

interface MapFilterByMoneyCompoProps {
    Text: String;
}
const MapFilterByMoneyCompo = (props: MapFilterByMoneyCompoProps) => {
    return (
        <MapFilterByMoney>
            <HeaderText>{props.Text}</HeaderText>
            <Dot3>...</Dot3>
        </MapFilterByMoney>
    );
}

export default MapFilterByMoneyCompo;
