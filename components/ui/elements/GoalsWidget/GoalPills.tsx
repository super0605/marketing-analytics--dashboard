import * as React from 'react';
import styled from 'styled-components';
import { GoalPill } from "../../../../components";

const GoalPills = styled.div`
  width: 100%;
  display: flex;
`;

const GoalPillsData = [
  {
    title: 'Inspiration',
    descriptoion: '% transactions offsetting carbon footprint',
    value: 23.5,
    conversion: 8.6,
    statVal: 3.4,
    arrow: 'up',
    dividerColor: '#4394C3',
    dividerHeight: 4
  },
  {
    title: 'Education',
    descriptoion: '% transactions offsetting carbon footprint',
    value: 42.5,
    conversion: 6.6,
    statVal: 2.4,
    arrow: 'down',
    dividerColor: '#D2E3F0',
    dividerHeight: 4
  },
  {
    title: 'Education',
    descriptoion: '% transactions offsetting carbon footprint',
    value: 23.5,
    conversion: 8.6,
    statVal: 3.4,
    arrow: 'up',
    dividerColor: '#063062',
    dividerHeight: 4
  },
  {
    title: 'Transaction',
    descriptoion: '% transactions offsetting carbon footprint',
    value: 32.8,
    conversion: 8.6,
    statVal: 3.4,
    arrow: 'down',
    dividerColor: '#DA1717',
    dividerHeight: 4
  },
]

class GoalPillsCompo extends React.Component {

  public render() {
    return (
      <GoalPills>
        {
          GoalPillsData.map((pill, k) => (
            <GoalPill 
              key={k}
              title={pill.title}
              description={pill.descriptoion}
              value={pill.value}
              conversion={pill.conversion}
              statVal={pill.statVal}
              arrow={pill.arrow}
              dividerColor={pill.dividerColor}
              dividerHeight={pill.dividerHeight}
            />
          ))
        }
      </GoalPills>
    );
  }
};

export default GoalPillsCompo;