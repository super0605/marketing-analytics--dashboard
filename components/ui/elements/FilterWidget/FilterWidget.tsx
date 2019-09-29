import * as React from "react";
import styled from "styled-components";
import _ from 'lodash';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { LookupAction, GlobalFilterAction } from '../../../../redux/constants';
import { lookupState } from '../../../../redux/types/lookup';
import { GlobalFiltersDataType, globalFiltersState } from "../../../../redux/types/globalFilters";

import { DropDownUp } from "../../../../components";
import {
  sizes,
  px,
  globalFiltersQuery,
  GlobalFiltersQueryType,
  // filtersDate,
  // filtersChannel,
  // filtersDevice,
  // filtersRegion,
  // filtersComparison,
  // FilterDateType,
  // FilterChannelType,
  // FilterDeviceType,
  // FilterRegionType,
  // FilterComparisonType,
  // globalFilters,
} from "../../../../constants/constants";
import {
  // filtersDateLabels,
  // filtersChannelLabels,
  // filtersDeviceLabels,
  // filtersRegionLabels,
  // filtersComparisonLabels,
  globalFiltersLabels
} from "../../../../constants/valuesByType";
import { LookupModel } from '../../../../models';
import { globalFiltersQueryObjType, globalFiltersObjType } from "../../../../constants/interfaces";


const FilterWidget = styled.div`
  width: 100%;
  box-sizing: border-box;
`;


const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: ${px(sizes.small)};
  justify-content: space-between;
  padding-bottom: ${px(sizes.fine)};

`;

const Cell = styled.div``;

const query = Array.from(globalFiltersLabels.values());
// const query = ["Channels", "DeviceTypes", "Users", "DateRanges", "ComparisonPeriods"];
const brand = "tb1";

interface FilterWidgetCompProps {
  lookup: lookupState;
  getLookup: any;
  globalFilters: (globalFiltersData: GlobalFiltersDataType) => void;
  globalFiltersState: globalFiltersState;
}
interface FilterWidgetCompState {
  globalFilterQueriesObj: globalFiltersQueryObjType;
  globalFiltersObj: globalFiltersObjType;
  initGlobalFilterFlag: boolean;
}
class FilterWidgetComp extends React.Component<FilterWidgetCompProps, FilterWidgetCompState> {
  constructor(props: FilterWidgetCompProps) {
    super(props);
    this.state = {
      globalFilterQueriesObj: {
        [globalFiltersQuery.Range]: "",
        [globalFiltersQuery.Channel]: "",
        [globalFiltersQuery.Device]: "",
        [globalFiltersQuery.Region]: "",
        [globalFiltersQuery.CompareWith]: "",
      },
      globalFiltersObj: {
        [globalFiltersQuery.Range]: null,
        [globalFiltersQuery.Channel]: null,
        [globalFiltersQuery.Device]: null,
        [globalFiltersQuery.Region]: null,
        [globalFiltersQuery.CompareWith]: null,
      },
      initGlobalFilterFlag: false,
    };
  }

  componentDidMount() {
    this.props.getLookup(brand, query);
  }

  componentDidUpdate() {
    const { initGlobalFilterFlag } = this.state;
    if (!initGlobalFilterFlag && this.props.lookup.lookup.lookupList !== undefined && !_.isEmpty(this.props.lookup.lookup.lookupList)) {
      this.initGlobalFilter(this.props.lookup);
    }
  }

  handleGlobalFilterSelect = (choice: LookupModel, globalFiltersQuery: GlobalFiltersQueryType) => {
    const { globalFilterQueriesObj, globalFiltersObj } = this.state;
    
    const globalFilterQueriesObjTemp = Object.assign({}, globalFilterQueriesObj);
    const globalFiltersObjTemp = Object.assign({}, globalFiltersObj);
    globalFilterQueriesObjTemp[globalFiltersQuery] = choice.key;
    globalFiltersObjTemp[globalFiltersQuery] = choice;

    this.setState({
      globalFilterQueriesObj: globalFilterQueriesObjTemp,
      globalFiltersObj: globalFiltersObjTemp,
    }, () => {
      const { globalFilterQueriesObj, globalFiltersObj } = this.state;
      this.props.globalFilters({ globalFilterQueriesObj, globalFiltersObj });
    });
  }

  initGlobalFilter = (lookupState: lookupState) => {
    const { globalFilterQueriesObj, globalFiltersObj } = this.state;
    const { Countries, Regions, Channels, DeviceTypes, Users, DateRanges, ComparisonPeriods } = lookupState.lookup.lookupList;
    const globalFilterQueriesObjTemp = Object.assign({}, globalFilterQueriesObj);
    const globalFiltersObjTemp = Object.assign({}, globalFiltersObj);
    if (DateRanges !== undefined && DateRanges[3]) {
      globalFilterQueriesObjTemp[globalFiltersQuery.Range] = DateRanges[3].key;
      globalFiltersObjTemp[globalFiltersQuery.Range] = DateRanges[3];
    }
    if (Channels !== undefined && Channels[1]) {
      globalFilterQueriesObjTemp[globalFiltersQuery.Channel] = Channels[1].key;
      globalFiltersObjTemp[globalFiltersQuery.Channel] = Channels[1];
    }
    if (DeviceTypes !== undefined && DeviceTypes[0]) {
      globalFilterQueriesObjTemp[globalFiltersQuery.Device] = DeviceTypes[0].key;
      globalFiltersObjTemp[globalFiltersQuery.Device] = DeviceTypes[0];
    }
    if (Countries !== undefined && Countries[2]) {
      globalFilterQueriesObjTemp[globalFiltersQuery.Region] = Countries[2].key;
      globalFiltersObjTemp[globalFiltersQuery.Region] = Countries[2];
    }
    if (ComparisonPeriods !== undefined && ComparisonPeriods[0]) {
      globalFilterQueriesObjTemp[globalFiltersQuery.CompareWith] = ComparisonPeriods[0].key;
      globalFiltersObjTemp[globalFiltersQuery.CompareWith] = ComparisonPeriods[0];
    }

    this.setState({
      globalFilterQueriesObj: globalFilterQueriesObjTemp,
      globalFiltersObj: globalFiltersObjTemp,
      initGlobalFilterFlag: true,
    }, () => {
      const { globalFilterQueriesObj, globalFiltersObj } = this.state;
      this.props.globalFilters({ globalFilterQueriesObj, globalFiltersObj });
    });

  }

  render() {
    const { globalFiltersObj } = this.state;
    const { Countries, Regions, Channels, DeviceTypes, Users, DateRanges, ComparisonPeriods } = this.props.lookup.lookup.lookupList;
    
    return (
      <FilterWidget>
        <Row>
          <Cell>
            <DropDownUp
              choices={DateRanges !== undefined && DateRanges}
              selectedChoice={globalFiltersObj[globalFiltersQuery.Range] || (DateRanges !== undefined && DateRanges[0])}
              getLabel={(choice: LookupModel) => choice && choice.text || "No label"}
              handleSelect={this.handleGlobalFilterSelect}
              globalFiltersQuery={globalFiltersQuery.Range}
            />
          </Cell>
          <Cell>
            <DropDownUp
              choices={Channels !== undefined && Channels}
              selectedChoice={globalFiltersObj[globalFiltersQuery.Channel] || (Channels !== undefined && Channels[1])}
              getLabel={(choice: LookupModel) => choice && choice.text || "No label"}
              handleSelect={this.handleGlobalFilterSelect}
              globalFiltersQuery={globalFiltersQuery.Channel}
            />
          </Cell>
          <Cell>
            <DropDownUp
              choices={DeviceTypes !== undefined && DeviceTypes}
              selectedChoice={globalFiltersObj[globalFiltersQuery.Device] || (DeviceTypes !== undefined && DeviceTypes[0])}
              getLabel={(choice: LookupModel) => choice && choice.text || "No label"}
              handleSelect={this.handleGlobalFilterSelect}
              globalFiltersQuery={globalFiltersQuery.Device}
            />
          </Cell>
          <Cell>
            <DropDownUp
              choices={Countries !== undefined && Countries}
              selectedChoice={globalFiltersObj[globalFiltersQuery.Region] || (Countries !== undefined && Countries[1])}
              getLabel={(choice: LookupModel) => choice && choice.text || "No label"}
              handleSelect={this.handleGlobalFilterSelect}
              globalFiltersQuery={globalFiltersQuery.Region}
            />
          </Cell>
          <Cell>
            <DropDownUp
              choices={ComparisonPeriods !== undefined && ComparisonPeriods}
              selectedChoice={globalFiltersObj[globalFiltersQuery.CompareWith] || (ComparisonPeriods !== undefined && ComparisonPeriods[0])}
              getLabel={(choice: LookupModel) => choice && choice.text || "No label"}
              handleSelect={this.handleGlobalFilterSelect}
              globalFiltersQuery={globalFiltersQuery.CompareWith}
            />
          </Cell>
        </Row>
      </FilterWidget>
    );
  };
}

const mapStateToProps = (state) => ({
  lookup: state.lookupState,
  globalFiltersState: state.globalFiltersState,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getLookup: (brand: string, query: string) => dispatch({ type: LookupAction.GET_LOOKUP_REQUEST, payload: { brand, query } }),
  globalFilters: (globalFiltersData: GlobalFiltersDataType) => dispatch({ type: GlobalFilterAction.SELECT_GLOBAL_FILTER_START, payload: { globalFiltersData } })
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterWidgetComp);