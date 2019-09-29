import * as React from 'react';
import styled from 'styled-components';
import { InputField, H4, Toggle } from "../../../../components";
import { px, sizes, weekModes, WeekModeType } from "../../../../constants/constants";

import avatarPersona from "../../../../static/media/avatar__persona.png";
import { weekModeLabels } from '../../../../constants/valuesByType';

const CalendarWidget = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ClientImage = styled.img`
  width: ${px(sizes.large)};
  margin-right: ${px(sizes.little)};
`;

const InputWrapper = styled.div`
  width: ${px(268)};
`;

const ToggleWrapper = styled.div`
  margin-left: ${px(sizes.medium)};
  display: flex;
  flex-direction: column;
`

const CalendarWidgetComp = () => {
  return (
    <CalendarWidget>
      <ClientImage src={avatarPersona} alt="persona icon" />

      <InputWrapper>
        <InputField placeholder="Type user name" />
      </InputWrapper>

      <ToggleWrapper>
        <H4 content="Week mode" />
        <Toggle
          items={[weekModes.satSun, weekModes.sunSat]}
          getLabel={(weekMode: WeekModeType) => weekModeLabels.get(weekMode)}
          activeItem={weekModes.satSun}
          handleToggle={() => null}
        />
      </ToggleWrapper>

      <ToggleWrapper>
        <H4 content="Calendar mode" />
        {/* <MultiToggle items={allWeekModes} activeItem={weekModes.calendar} /> */}
      </ToggleWrapper>
    </CalendarWidget>
  );
}

export default CalendarWidgetComp;
