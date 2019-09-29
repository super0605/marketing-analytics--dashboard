import * as React from 'react';
import styled from 'styled-components';
import GoalPills from './GoalPills';
import { H2 } from "../../../../components";

const CurrentGoals = styled.div`
    width: 100%;
`;

const CurrentGoalsCompo = () => {
  return (
    <CurrentGoals>
      <H2 content="Current Goals" />
      <GoalPills />
    </CurrentGoals>
  );
}

export default CurrentGoalsCompo;
