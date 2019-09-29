import React from "react";
import styled from "styled-components";
import Sparkline from "./SparkLine";
import SparkProgress from "./SparkProgress";
import {Avatar, ActivityCard} from "../../../../../components";
import { px, colors, sizes, elevation} from "../../../../../constants/constants";
import { ClientSummary } from "../../../../../constants/interfaces";

import clientLogoEmpty from "../../../../../static/media/avatar__client__default.png";


const ClientRow = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${colors.grayLight};
  padding: ${px(sizes.little)} ${px(sizes.junior)};

  :hover {
    cursor: pointer;
    box-shadow: ${elevation.dp1};
  }
`;

const AvatarWrapper = styled.div`
  flex-basis: ${px(sizes.extremehuge)};
  flex-shrink: 0;
`;

const SparklineWrapper = styled.div`
  flex-grow: 1;
`;

const SparkProgressWrapper = styled.div`
  flex-grow: 1;
`;

const ActivityCardWrapper = styled.div`
  flex-basis: ${px(sizes.extremehuge + sizes.huge)};
`;

interface ClientRowCompProps {
  summary: ClientSummary,
}
const ClientRowComp = (props: ClientRowCompProps) => {
  const {summary} = props;
  const {client, activity, sparkProgress} = summary;
  return (
    <ClientRow>
      <AvatarWrapper>
        <Avatar name={client.name} avatar={client.logo ? client.logo : clientLogoEmpty} />
      </AvatarWrapper>

      <SparklineWrapper>
        <Sparkline trend={5.2} metric="Website traffic" />
      </SparklineWrapper>

      <SparkProgressWrapper>
        <SparkProgress trend={5.2} metric="Website traffic" value={sparkProgress} />
      </SparkProgressWrapper>
      
      <ActivityCardWrapper>
        {activity && 
          <ActivityCard activity={activity} />
        }
      </ActivityCardWrapper>
    </ClientRow>
  );
};

export default ClientRowComp;