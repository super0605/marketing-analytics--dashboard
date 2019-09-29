import * as React from 'react';
import styled from 'styled-components';
import TimelineFilter from './TimelineFilter';
import { TimelineChart, CustomLegend, RangeGradientBar } from "../../../../components";
import { CustomLegendItem } from "../../../../constants/interfaces";
import { colors } from "../../../../constants/constants";

const Timeline = styled.div`
  width: 100%;
`;

const CustomLegendData: CustomLegendItem[] = [
  {
    name: "Primary period",
    color: colors.purpleLight,
  },
  {
    name: "Target",
    color: colors.purpleDark,
  },
];

const CustomLegendContainer = styled.div`
  display: flex;
`;

const timelineData = [
  {
    "name": "A",
    "uv": 1560,
    "pv": 2400,
    "fu": [null, null],
    "fb": [null, null],
    "fc": [null, null],
  },
  {
    "name": "B",
    "uv": 3000,
    "pv": 1398,
    "fu": [null, null],
    "fb": [null, null],
    "fc": [null, null],
  },
  {
    "name": "C",
    "uv": 2000,
    "pv": 9800,
    "fu": [null, null],
    "fb": [null, null],
    "fc": [null, null],
  },
  {
    "name": "D",
    "uv": 2780,
    "pv": 3908,
    "fu": [null, null],
    "fb": [null, null],
    "fc": [null, null],
  },
  {
    "name": "E",
    "uv": 4100,
    "pv": 4800,
    "fu": [null, null],
    "fb": [null, null],
    "fc": [null, null],
  },
  {
    "name": "F",
    "uv": 2390,
    "pv": 3800,
    "fu": [null, null],
    "fb": [null, null],
    "fc": [null, null],
  },
  {
    "name": "G",
    "uv": 1652,
    "pv": 4300,
    "fu": [null, null],
    "fb": [null, null],
    "fc": [null, null],
  },
  {
    "name": "H",
    "uv": 2369,
    "pv": 4300,
    "amt": 2369,
    "fv": 3000,
    "fu": [2370, 2370],
    "fb": [2370, 2370],
    "fc": [2370, 3600],
  },
  {
    "name": "I",
    "pv": 4300,
    "amt": 6600,
    "fv": 3000,
    "fu": [2400, 2800],
    "fb": [2200, 3000],
    "fc": [2369, 3600],
  },
  {
    "name": "J",
    "pv": 4300,
    "amt": 3300,
    "fv": 3000,
    "fu": [2500, 3200],
    "fb": [2268, 3435],
    "fc": [2369, 3600],
  },
  {
    "name": "K",
    "pv": 4300,
    "amt": 1200,
    "fv": 3000,
    "fu": [2600, 3600],
    "fb": [2180, 3900],
    "fc": [2369, 3600],
  },
  {
    "name": "L",
    "pv": 4300,
    "amt": 4400,
    "fv": 3000,
    "fu": [2700, 4000],
    "fb": [2000, 4300],
    "fc": [2369, 3600],
  },
]

class TimelineCompo extends React.Component {

  public render() {
    return (
      <div>
        <Timeline>
          <TimelineFilter />
          <TimelineChart
            timelineData={timelineData}
            chartHeight={300}
            yAxisName="Sessions"
          />
          <CustomLegendContainer>
            <CustomLegend legendData={CustomLegendData} />
            <RangeGradientBar
              startVal="Low"
              endVal="High"
              gradient="background-image: linear-gradient(to right, #8284d8, #7064b2, #5d468d, #4a296a, #350b48);"
              name="Forecast performance"
            />
          </CustomLegendContainer>
        </Timeline>
      </div>
    );
  }
};

export default TimelineCompo;