import * as React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { WebsiteBehaviourTimelineAction } from '../../../../redux/constants';
import { websiteBehaviourTimelineState } from '../../../../redux/types/websiteBehaviourTimeline';
import { globalFiltersState } from '../../../../redux/types/globalFilters';
import { websiteBehaviourPillsSelectingState } from '../../../../redux/types/websiteBehaviourPillsSelecting';

import { GeneralTimelineChart, CustomLegend, H3 } from "../../../../components";
import { sizes, px, websiteBehaviourPills, WebsiteBehaviourPillsType, globalFiltersQuery, GlobalFiltersQueryType } from "../../../../constants/constants";
import { CustomLegendItem, websiteBahaviourTimelineChartObjType, globalFiltersQueryObjType } from "../../../../constants/interfaces";
import { websiteBehaviourPillsKeys, globalFiltersQueryKeys, websiteBehaviourPillsLabels } from '../../../../constants/valuesByType';
import { WebsiteBehaviourTimelineModel, Value } from '~/models';


const BehaviourTimeline = styled.div`
  width: 100%;
  padding-top: ${px(sizes.junior)};
  padding-bottom: ${px(sizes.junior)};
`;

const CustomLegendWrapper = styled.div`
  width: 100%;
  padding-left: ${px(sizes.junior)}
`;

const CustomLegendData: CustomLegendItem[] = [
  {
    name: "Primary period",
    color: '#350B48',
  },
  {
    name: "Comparison period",
    color: '#9A85A4',
  },
];

interface BehaviourTimelineChartCompoProps {
  websiteBehaviourTimelineState: websiteBehaviourTimelineState;
  getWebsiteBehaviourTimeline: (brand: string, metric: string, query: string) => void;
  globalFiltersState: globalFiltersState;
  websiteBehaviourPillsSelectingState: websiteBehaviourPillsSelectingState;
}
interface BehaviourTimelineChartCompoState {
  newBehaviourPill: WebsiteBehaviourPillsType;
}
class BehaviourTimelineCompo extends React.Component<BehaviourTimelineChartCompoProps, BehaviourTimelineChartCompoState> {
  constructor(props: BehaviourTimelineChartCompoProps) {
    super(props);
    this.state = {
      newBehaviourPill: websiteBehaviourPills.Sessions,
    }
  }

  componentDidMount() {
    const brand = "tb1";
    const metric = websiteBehaviourPillsKeys.get(this.state.newBehaviourPill);
    let query = null;

    if (this.props.globalFiltersState.globalFiltersData !== undefined && !_.isEmpty(this.props.globalFiltersState.globalFiltersData.globalFilterQueriesObj) && this.props.globalFiltersState.globalFiltersData.globalFilterQueriesObj[globalFiltersQuery.Range]) {
      const queryObj = this.props.globalFiltersState.globalFiltersData.globalFilterQueriesObj;
      query = this.handleQuery(queryObj)
    } else {
      const queryObj = {
        [globalFiltersQuery.Range]: "LastMonth",
        [globalFiltersQuery.Channel]: "",
        [globalFiltersQuery.Device]: "",
        [globalFiltersQuery.Region]: "",
        [globalFiltersQuery.CompareWith]: "PreviousPeriod",
      }
      query = this.handleQuery(queryObj);
    }

    this.props.getWebsiteBehaviourTimeline(brand, metric, query);
  }

  componentWillReceiveProps({ globalFiltersState, websiteBehaviourPillsSelectingState }) {
    const brand = "tb1";
    const metric = websiteBehaviourPillsKeys.get(this.state.newBehaviourPill);
    let query = null;
    query = this.getQuery(globalFiltersState, true);
    if (query) {
      this.props.getWebsiteBehaviourTimeline(brand, metric, query);
    }

    if (websiteBehaviourPillsSelectingState.selectedWebsiteBehaviourPillData !== this.state.newBehaviourPill) {
      this.setState({ newBehaviourPill: websiteBehaviourPillsSelectingState.selectedWebsiteBehaviourPillData });
      this.getWebsiteBehaviourTimeline(websiteBehaviourPillsSelectingState.selectedWebsiteBehaviourPillData);
    }
  }

  getWebsiteBehaviourTimeline = (selectedPill: WebsiteBehaviourPillsType) => {
    const metric = websiteBehaviourPillsKeys.get(selectedPill);
    const brand = "tb1";
    const global = false;
    let query = this.getQuery(this.props.globalFiltersState, global);
    if (query == null) {
      const queryObj = {
        [globalFiltersQuery.Range]: "LastMonth",
        [globalFiltersQuery.Channel]: "",
        [globalFiltersQuery.Device]: "",
        [globalFiltersQuery.Region]: "",
        [globalFiltersQuery.CompareWith]: "PreviousPeriod",
      }
      query = this.handleQuery(queryObj)
    }
    this.setState({
      newBehaviourPill: selectedPill,
    });
    this.props.getWebsiteBehaviourTimeline(brand, metric, query);
  }

  getQuery = (globalFiltersState, global: boolean = true) => {
    let query = null;
    const globalFiltersStateOld: globalFiltersState = this.props.globalFiltersState;
    if (global) {
      if (!_.isEqual(globalFiltersState, globalFiltersStateOld)) {
        if (globalFiltersState && globalFiltersState.globalFiltersData.globalFiltersData !== undefined) {
          if (globalFiltersState.globalFiltersData.globalFiltersData.globalFilterQueriesObj !== undefined && globalFiltersState.globalFiltersData.globalFiltersData.globalFilterQueriesObj[globalFiltersQuery.Range]) {
            const queryObj = globalFiltersState.globalFiltersData.globalFiltersData.globalFilterQueriesObj;

            const queryObjTemp = Object.assign({}, queryObj);
            queryObjTemp[globalFiltersQuery.Region] = 'NA'; // test mode for the region: always region is NA

            query = this.handleQuery(queryObjTemp);
          }
        }
      }
    } else {
      if (globalFiltersState && globalFiltersState.globalFiltersData.globalFiltersData !== undefined) {
        if (globalFiltersState.globalFiltersData.globalFiltersData.globalFilterQueriesObj !== undefined && globalFiltersState.globalFiltersData.globalFiltersData.globalFilterQueriesObj[globalFiltersQuery.Range]) {
          const queryObj = globalFiltersState.globalFiltersData.globalFiltersData.globalFilterQueriesObj;

          const queryObjTemp = Object.assign({}, queryObj);
          queryObjTemp[globalFiltersQuery.Region] = 'NA'; // test mode for the region: always region is NA

          query = this.handleQuery(queryObjTemp);
        }
      }
    }

    return query;
  }

  handleQuery = (queryObj: globalFiltersQueryObjType) => {
    let query: string = "?";
    Array.from(globalFiltersQueryKeys.keys()).map((key: GlobalFiltersQueryType, index: number) => {
      const queryKey = globalFiltersQueryKeys.get(key);
      if (queryObj[key] !== undefined && queryObj[key]) {
        if (index < Array.from(globalFiltersQueryKeys.keys()).length) {
          query = `${query}${queryKey}=${queryObj[key]}&`;
        } else {
          query = `${query}${queryKey}=${queryObj[key]}`;
        }
      }
    })

    return query;
  }

  handleTimelineData = (websiteBehaviourTimelineState: websiteBehaviourTimelineState) => {
    let TimelineChartData: websiteBahaviourTimelineChartObjType[] = [];
    let TimelineChartEleData: websiteBahaviourTimelineChartObjType = null;
    const timelineData: WebsiteBehaviourTimelineModel = websiteBehaviourTimelineState.websiteBehaviourTimeline.websiteBehaviourTimelineData;
    if (timelineData) {
      const timelineDataKeys = Object.keys(timelineData) !== undefined ? Object.keys(timelineData) : [];
      timelineDataKeys.map((timelineDataKey) => {
        const timelineEleData: Value = timelineData[timelineDataKey];
        TimelineChartEleData = {
          name: timelineDataKey,
          current: timelineEleData.current,
          previous: timelineEleData.previous,
        }
        TimelineChartData.push(TimelineChartEleData);
        TimelineChartEleData = null;
      })
    }
    return TimelineChartData;
  }

  public render() {
    const metric = websiteBehaviourPillsLabels.get(this.state.newBehaviourPill);
    return (
      <BehaviourTimeline>
        <H3 content={`${metric} over time`} />
        <GeneralTimelineChart
          timelineData={this.handleTimelineData(this.props.websiteBehaviourTimelineState)}
          chartHeight={300}
          yAxisName={metric}
        />
        <CustomLegendWrapper>
          <CustomLegend legendData={CustomLegendData} shape='line' />
        </CustomLegendWrapper>
      </BehaviourTimeline>
    );
  }
};


const mapStateToProps = (state) => ({
  websiteBehaviourTimelineState: state.websiteBehaviourTimelineState,
  globalFiltersState: state.globalFiltersState,
  websiteBehaviourPillsSelectingState: state.websiteBehaviourPillsSelectingState,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getWebsiteBehaviourTimeline: (brand: string, metric: string, query: string) => dispatch({ type: WebsiteBehaviourTimelineAction.GET_WEBSITE_BEHAVIOUR_TIMELINE_REQUEST, payload: { brand, metric, query } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BehaviourTimelineCompo);