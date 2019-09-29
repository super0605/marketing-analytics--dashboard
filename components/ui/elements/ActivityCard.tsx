import * as React from 'react';
import styled from 'styled-components';
import { Avatar } from '../../../components';
import { labelMicroAccented, labelMicro } from '../../../constants/style-constants';
import { Activity } from '../../../constants/interfaces';
import { px, sizes } from '../../../constants/constants';

const ActivityCard = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${px(sizes.fine)};
`

const NameAndDate = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${px(sizes.thin)};
`

const Name = styled.div`
  ${labelMicroAccented};
`

const Date = styled.div`
  ${labelMicro};
  text-align: right;
`

const Message = styled.div`
  ${labelMicro};
`

interface ActivityCardCompProps {
  activity: Activity
}
const ActivityCardComp = (props: ActivityCardCompProps) => {
  const { activity } = props;

  return (
    <ActivityCard>
      <Avatar avatar={activity.content.user.avatar} />
      <ContentArea>
        <NameAndDate>
          <Name>{activity.content.user.name}</Name>
          <Date>{activity.time}</Date>
        </NameAndDate>
        <Message>{activity.content.message}</Message>
      </ContentArea>
    </ActivityCard>
  );
}

export default ActivityCardComp;
