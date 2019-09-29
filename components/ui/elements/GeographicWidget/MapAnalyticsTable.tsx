import * as React from 'react';
import styled from 'styled-components';
import { CustomTable } from "../../../../components";
import {sizes, px} from "../../../../constants/constants";
import { MapAnalyticsData } from "../../../../constants/interfaces";

const MapAnalyticsTable = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-bottom: ${px(sizes.fine)};
`;

const MapAnalyticsDummyData: Array<MapAnalyticsData> = [
    {
        country: 'Australia',
        countryCode: 'AUS',
        revenue: 110.5,
        change: 2.5
    },
    {
        country: 'Russian Federation',
        countryCode: 'RUS',
        revenue: 110.5,
        change: 3
    },
    {
        country: 'United States',
        countryCode: 'USA',
        revenue: 110.5,
        change: 2
    },
    {
        country: 'China',
        countryCode: 'CHN',
        revenue: 110.5,
        change: 1.1
    },
    {
        country: 'Canada',
        countryCode: 'CAN',
        revenue: 110.5,
        change: 1.1
    },
    {
        country: 'Brazil',
        countryCode: 'BRA',
        revenue: 110.5,
        change: 1.1
    },
];

const MapAnalyticsTableCompo = () => {
    return (
        <MapAnalyticsTable>
            <CustomTable mapAnalyticsData={MapAnalyticsDummyData} />
        </MapAnalyticsTable>
    );
}

export default MapAnalyticsTableCompo;
