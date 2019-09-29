import * as React from "react";
import styled from "styled-components";
import { HighlightsChecklist } from "../../../../components";
import { colors, px, sizes } from "../../../../constants/constants";
import {
  labelSmall,
  labelMicro,
  labelMicroAccented
} from "../../../../constants/style-constants";
import { TaskGroup } from "../../../../constants/interfaces";

import iconCheck from "../../../../static/media/icons/icon__checkmark.png";
import avatarCassandra from "../../../../static/media/avatar__cassandra.png";

const CompletedWrapper = styled.div`
  ${labelSmall};
  background-color: ${colors.orangeVividAlpha5};
  margin-bottom: ${px(sizes.tiny)};
  padding: ${px(sizes.tiny)};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const CompletedBig = styled.div`
  background-color: ${colors.orangeVivid};
  background-image: url(${iconCheck});
  background-size: contain;
  width: ${px(sizes.small)};
  height: ${px(sizes.small)};
  border-radius: 50%;
`;

const Message = styled.div`
  background-color: ${colors.orangeVividAlpha5};
  padding: ${px(sizes.fine)} ${px(sizes.tiny)};
  margin-top: ${px(sizes.little)};
`;
const MessageHeadline = styled.div`
  ${labelMicroAccented};
  margin-bottom: ${px(sizes.tiny)};
`;
const TaskListColumnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const TaskListColumn = styled.div`
  margin-right: ${px(sizes.small)};
`;
const TaskListTitle = styled.div`
  ${labelMicro};
  margin-bottom: ${px(sizes.tiny)};
`;

const BotRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${px(sizes.thin)};
`;
const Bot = styled.img`
  width: ${px(sizes.big)};
  height: ${px(sizes.big)};
  margin-right: ${px(sizes.tiny)};
`;
const BotName = styled.div`
  ${labelMicro};
`;

interface TaskListCompProps {
  taskGroups: TaskGroup[];
}
const TaskListComp = (props: TaskListCompProps) => {
  const { taskGroups } = props;

  const completedGroups = taskGroups.filter(group => group.groupCompleted);

  const firstIncompleteGroup = taskGroups.find(group => !group.groupCompleted);

  const completedElements = completedGroups.map((group, i) => (
    <CompletedWrapper key={`completed-${i}`}>
      {group.name}
      <CompletedBig />
    </CompletedWrapper>
  ));

  return (
    <div>
      {completedElements}

      <Message>
        <BotRow>
          <Bot src={avatarCassandra} alt={"avatar of cassandra"} />
          <BotName>Cassandra</BotName>
        </BotRow>

        <MessageHeadline>{firstIncompleteGroup.message}</MessageHeadline>
        {firstIncompleteGroup.tasks &&
          firstIncompleteGroup.tasks.length > 0 && (
            <HighlightsChecklist tasks={firstIncompleteGroup.tasks} />
          )}
        {firstIncompleteGroup.taskLists &&
          firstIncompleteGroup.taskLists.length > 0 && (
            <TaskListColumnWrapper>
              {firstIncompleteGroup.taskLists.map((taskList, i) => (
                <TaskListColumn key={`task-list-col-${i}`}>
                  <TaskListTitle>{taskList.title}</TaskListTitle>
                  <HighlightsChecklist tasks={taskList.tasks} />
                </TaskListColumn>
              ))}
            </TaskListColumnWrapper>
          )}
      </Message>
    </div>
  );
};

export default TaskListComp;
