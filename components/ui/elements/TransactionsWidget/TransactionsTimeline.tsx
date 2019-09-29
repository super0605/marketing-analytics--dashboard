import * as React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { WebsiteTransactionsTimelineAction, WebsiteTransactionsPillsSelectingAction } from '../../../../redux/constants';
import { websiteTransactionsTimelineState } from '../../../../redux/types/webisteTransactionsTimeline';
import { globalFiltersState } from '../../../../redux/types/globalFilters';
import { websiteTransactionsPillsSelectingState } from '../../../../redux/types/websiteTransactionsPillsSelecting';

import { GeneralTimelineChart, CustomLegend, H3 } from "../../../../components";
import TransactionsTimelineFilter from './TimelineFilter';
import { sizes, px, WebsiteTransactionsPillsType, websiteTransactionsPills, globalFiltersQuery, GlobalFiltersQueryType } from "../../../../constants/constants";
import { CustomLegendItem, globalFiltersQueryObjType, websiteBahaviourTimelineChartObjType } from "../../../../constants/interfaces";
import { websiteTransactionsPillsKeys, globalFiltersQueryKeys, websiteTransactionsPillsLabels } from '../../../../constants/valuesByType';
import { WebsiteTransactionsTimelineModel, Value } from '~/models';


const TransactionsTimeline = styled.div`
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
    name: "Primary perdion",
    color: '#350B48',
  },
  {
    name: "Comparison period",
    color: '#9A85A4',
  },
];

interface TransactionsTimelineCompoProps {
  websiteTransactionsTimelineState: websiteTransactionsTimelineState;
  getWebsiteTransactionsTimeline: (brand: string, metric: string, query: string) => void;
  globalFiltersState: globalFiltersState;
  websiteTransactionsPillsSelecting: (selectedPill: WebsiteTransactionsPillsType) => void;
  websiteTransactionsPillsSelectingState: websiteTransactionsPillsSelectingState;
}
interface TransactionsTimelineCompoState {
  newTransactionsPill: WebsiteTransactionsPillsType;
}
class TransactionsTimelineCompo extends React.Component<TransactionsTimelineCompoProps, TransactionsTimelineCompoState> {
  constructor(props: TransactionsTimelineCompoProps) {
    super(props);
    this.state = {
      newTransactionsPill: websiteTransactionsPills.Revenue,
    }
  }

  componentDidMount() {
    const brand = "tb1";
    const metric = websiteTransactionsPillsKeys.get(this.state.newTransactionsPill);
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

    this.props.getWebsiteTransactionsTimeline(brand, metric, query);
  }

  componentWillReceiveProps({ globalFiltersState, websiteTransactionsPillsSelectingState }) {
    const brand = "tb1";
    const metric = websiteTransactionsPillsKeys.get(this.state.newTransactionsPill);
    let query = null;
    query = this.getQuery(globalFiltersState, true);
    if (query) {
      this.props.getWebsiteTransactionsTimeline(brand, metric, query);
    }
    
    if (websiteTransactionsPillsSelectingState.selectedWebsiteTransactionsPillData !== this.state.newTransactionsPill) {
      this.setState({ newTransactionsPill: websiteTransactionsPillsSelectingState.selectedWebsiteTransactionsPillData });
      this.handleMetric(websiteTransactionsPillsSelectingState.selectedWebsiteTransactionsPillData);
    }
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

  handleTimelineData = (websiteTransactionsTimelineState: websiteTransactionsTimelineState) => {
    
    let TimelineChartData: websiteBahaviourTimelineChartObjType[] = [];
    let TimelineChartEleData: websiteBahaviourTimelineChartObjType = null;
    const timelineData: WebsiteTransactionsTimelineModel = websiteTransactionsTimelineState.websiteTransactionsTimeline.websiteTransactionsTimelineData;
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

  handleMetric = (choice: WebsiteTransactionsPillsType) => {
    const metric = websiteTransactionsPillsKeys.get(choice);
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
      newTransactionsPill: choice,
    });

    this.props.websiteTransactionsPillsSelecting(choice);
    this.props.getWebsiteTransactionsTimeline(brand, metric, query);
  }

  public render() {
    const { newTransactionsPill } = this.state;
    const metric = websiteTransactionsPillsLabels.get(newTransactionsPill);
    return (
      <TransactionsTimeline>
        <TransactionsTimelineFilter
          handleSelect={this.handleMetric}
          selectedPill={newTransactionsPill}
        />
        <GeneralTimelineChart
          timelineData={this.handleTimelineData(this.props.websiteTransactionsTimelineState)}
          chartHeight={300}
          yAxisName={metric}
        />
        <CustomLegendWrapper>
          <CustomLegend legendData={CustomLegendData} shape='line' />
        </CustomLegendWrapper>
      </TransactionsTimeline>
    );
  }
};

const mapStateToProps = (state) => ({
  websiteTransactionsTimelineState: state.websiteTransactionsTimelineState,
  globalFiltersState: state.globalFiltersState,
  websiteTransactionsPillsSelectingState: state.websiteTransactionsPillsSelectingState,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getWebsiteTransactionsTimeline: (brand: string, metric: string, query: string) => dispatch({ type: WebsiteTransactionsTimelineAction.GET_WEBSITE_TRANSACTIONS_TIMELINE_REQUEST, payload: { brand, metric, query } }),
  websiteTransactionsPillsSelecting: (selectedPill: WebsiteTransactionsPillsType) => dispatch({ type: WebsiteTransactionsPillsSelectingAction.SELECT_WEBSITE_TRANSACTIONS_PILLS_START, payload: selectedPill }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsTimelineCompo);