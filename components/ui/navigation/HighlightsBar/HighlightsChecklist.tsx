import * as React from 'react';
import styled from 'styled-components';
import {labelMicro} from "../../../../constants/style-constants";
import {px, sizes, colors} from "../../../../constants/constants";
import {Task} from "../../../../constants/interfaces";

import iconCheck from "../../../../static/media/icons/icon__checkmark.png";

const List = styled.div`
  
`;
const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${px(sizes.tiny)};
`;

interface ListItemCheckboxProps {
  checked: boolean;
}
const ListItemCheckbox = styled.div`
  width: ${px(sizes.little)};
  height: ${px(sizes.little)};
  flex-shrink: 0;
  background-color: ${(props: ListItemCheckboxProps) => props.checked
    ? colors.orangeVivid
    : "none"};
  background-image: ${(props: ListItemCheckboxProps) => props.checked
    ? `url(${iconCheck})`
    : "none"};
  background-size: contain;
  margin-right: ${px(sizes.tiny)};
  border-radius: ${px(sizes.little / 2)};
  border: ${`${px(sizes.hair)} solid ${colors.orangeVivid}`};
`;
const ListItemText = styled.div`
  ${labelMicro};
`;

interface HighlightsChecklistCompProps {
  tasks: Task[];
}
const HighlightsChecklistComp = (props: HighlightsChecklistCompProps) => {
  const {tasks} = props;
  return (
    <List>
      {tasks.map((task, i) => (
        <ListItem key={`checklist-item-${i}`} >
          <ListItemCheckbox checked={task.completed} />
          <ListItemText>{task.name}</ListItemText>
        </ListItem>  
      ))}
    </List>
  );
}

export default HighlightsChecklistComp;
