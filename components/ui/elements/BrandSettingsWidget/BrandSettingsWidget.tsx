import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { times } from "lodash";
import { InputField, H4, DropDownUp, Toggle } from "../../../../components/";
import {
  px,
  sizes,
  zIndices,
  MonthType,
  WeekModeType,
  weekModes
} from "../../../../constants/constants";
import { monthProps, weekModeLabels } from "../../../../constants/valuesByType";

const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-top: ${px(sizes.hefty)};
  margin-bottom: ${px(sizes.hefty)};
`;

// image upload
const FileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;
interface FileInputLabelProps {
  imageUrl: string;
}

const FileInputLabel = styled.label`
  background-image: ${(props: FileInputLabelProps) => `url(${props.imageUrl})`};
  background-size: contain;
  width: ${px(sizes.large)};
  height: ${px(sizes.large)};
  padding: ${px(10)};
  box-sizing: border-box;
  border-radius: ${px(sizes.compact)};
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  outline: none;
  cursor: pointer;
`;

// name input
const NameInputWrapper = styled.div`
  width: 200px;
  margin: 0 ${px(sizes.hefty)} 0 ${px(sizes.fine)};
`;

// date picker and toggle
const HeadedInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: ${px(sizes.hefty)};
  height: ${px(sizes.wide)};
  justify-content: space-between;
`;
const DateInputRow = styled.div`
  display: flex;
  flex-direction: row;
  z-index: ${zIndices.zSidebar + 1};
  width: ${px(sizes.mediumhuge)};
`;
const DateInputWrapper = styled.div`
  margin-right: ${px(sizes.fine)};
`;

interface BrandSettingsWidgetCompProps {
  imagePreviewUrl: string;
  activeFinancialMonth: MonthType;
  activeFinancialDay: number;
  activeWeekMode: WeekModeType;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleNameInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDayInput: (day: number) => void;
  handleMonthInput: (month: MonthType) => void;
  handleWeekModeToggle: (weekMode: WeekModeType) => void;
}
const BrandSettingsWidgetComp = (props: BrandSettingsWidgetCompProps) => {
  const {
    imagePreviewUrl,
    activeFinancialMonth,
    activeFinancialDay,
    activeWeekMode,
    handleImageChange,
    handleNameInput,
    handleDayInput,
    handleMonthInput,
    handleWeekModeToggle,
  } = props;
  return (
    <InputRow>
      <div>
        <FileInput
          type="file"
          id="file"
          onChange={handleImageChange}
          accept="image/png, image/jpeg"
          multiple={false}
        />
        <FileInputLabel imageUrl={imagePreviewUrl} htmlFor="file" />
      </div>

      <NameInputWrapper>
        <InputField
          placeholder="Enter name"
          handleInput={handleNameInput}
        />
      </NameInputWrapper>

      <HeadedInput>
        <H4 content="Financial year" />
        <DateInputRow>
          <DateInputWrapper>
            <DropDownUp
              choices={times(monthProps.get(activeFinancialMonth).days)}
              selectedChoice={activeFinancialDay}
              getLabel={item => `${item + 1}`}
              handleSelect={handleDayInput}
            />
          </DateInputWrapper>
          <DateInputWrapper>
            <DropDownUp
              choices={Array.from(monthProps.keys())}
              selectedChoice={activeFinancialMonth}
              getLabel={month => monthProps.get(month).labelShort}
              handleSelect={handleMonthInput}
            />
          </DateInputWrapper>
        </DateInputRow>
      </HeadedInput>

      <HeadedInput>
        <H4 content="Week mode" />
        <Toggle
          items={[weekModes.satSun, weekModes.sunSat]}
          getLabel={(weekMode: WeekModeType) => weekModeLabels.get(weekMode)}
          activeItem={activeWeekMode}
          handleToggle={handleWeekModeToggle}
        />
      </HeadedInput>
    </InputRow>
  );
};

export default BrandSettingsWidgetComp;
