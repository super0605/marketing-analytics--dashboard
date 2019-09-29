import * as React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { WebsiteBehaviourChannelsAction, WebsiteBehaviourPillsSelectingAction } from '../../../../redux/constants';
import { websiteBehaviourChannelsState } from '../../../../redux/types/websiteBehaviourChannels';
import { globalFiltersState } from '../../../../redux/types/globalFilters';
import { websiteBehaviourPillsSelectingState } from '../../../../redux/types/websiteBehaviourPillsSelecting';

import BehaviourChannelChartFilter from './BehaviourChannelChartFilter';
import { ChannelChart, CustomLegend } from "../../../../components";
import { CustomLegendItem, globalFiltersQueryObjType, websiteBehaviourChannelChartObjType } from "../../../../constants/interfaces";
import { sizes, px, globalFiltersQuery, GlobalFiltersQueryType, WebsiteBehaviourPillsType, websiteBehaviourPills } from "../../../../constants/constants";
import { globalFiltersQueryKeys, websiteBehaviourPillsKeys, websiteBehaviourPillsLabels } from '../../../../constants/valuesByType';
import { WebsiteBehaviourChannelsModel, Value } from '~/models';


const BehaviourChannelChart = styled.div`
  width: 100%;
  padding-bottom: ${px(sizes.junior)};
`;

const CustomLegendWrapper = styled.div`
  width: 100%;
  padding-left: ${px(sizes.junior)}
`;

const colors = ['#350B48', '#9A85A4'];

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

interface BehaviourChannelChartCompoProps {
  websiteBehaviourChannelsState: websiteBehaviourChannelsState;
  getWebsiteBehaviourChannels: (brand: string, metric: string, query: string) => void;
  globalFiltersState: globalFiltersState;
  websiteBahaviourPillsSelecting: (selectedPill: WebsiteBehaviourPillsType) => void;
  websiteBehaviourPillsSelectingState: websiteBehaviourPillsSelectingState;
}
interface BehaviourChannelChartCompoState {
  newBehaviourPill: WebsiteBehaviourPillsType;
}
class BehaviourChannelChartCompo extends React.Component<BehaviourChannelChartCompoProps, BehaviourChannelChartCompoState> {
  constructor(props: BehaviourChannelChartCompoProps) {
    super(props);
    this.state = {
      newBehaviourPill: websiteBehaviourPills.Sessions,
    };
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

    this.props.getWebsiteBehaviourChannels(brand, metric, query);
  }

  componentWillReceiveProps({ globalFiltersState, websiteBehaviourPillsSelectingState }) {
    const brand = "tb1";
    const metric = websiteBehaviourPillsKeys.get(this.state.newBehaviourPill);
    let query = null;
    query = this.getQuery(globalFiltersState, true);
    if (query) {
      this.props.getWebsiteBehaviourChannels(brand, metric, query);
    }

    if (websiteBehaviourPillsSelectingState.selectedWebsiteBehaviourPillData !== this.state.newBehaviourPill) {
      this.setState({ newBehaviourPill: websiteBehaviourPillsSelectingState.selectedWebsiteBehaviourPillData });
      this.handleMetric(websiteBehaviourPillsSelectingState.selectedWebsiteBehaviourPillData);
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
        if (index + 1 == Array.from(globalFiltersQueryKeys.keys()).length) {
          query = `${query}${queryKey}=${queryObj[key]}`;
        } else {
          query = `${query}${queryKey}=${queryObj[key]}&`;
        }
      }
    })

    return query;
  }

  handleMetric = (choice: WebsiteBehaviourPillsType) => {
    const metric = websiteBehaviourPillsKeys.get(choice);
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
      newBehaviourPill: choice,
    });
    this.props.websiteBahaviourPillsSelecting(choice);

    this.props.getWebsiteBehaviourChannels(brand, metric, query);
  }

  handleChannelData = (websiteBehaviourChannelsState: websiteBehaviourChannelsState) => {
    let channelChartData: websiteBehaviourChannelChartObjType[][] = [];
    let channelChartCoupleEleData: websiteBehaviourChannelChartObjType[] = [];
    let channelChartEleData: websiteBehaviourChannelChartObjType = null;
    const channelsData: WebsiteBehaviourChannelsModel = websiteBehaviourChannelsState.websiteBehaviourChannels.websiteBehaviourChannelsData;
    if (channelsData) {
      const channelsDataKeys = Object.keys(channelsData) !== undefined ? Object.keys(channelsData) : [];
      channelsDataKeys.map((channelDataKey, index) => {
        const channelData: Value = channelsData[channelDataKey];
        channelChartEleData = {
          x: 25 * (index + 1),
          y: channelData.current,
          z: "current",
          text: channelDataKey
        }
        channelChartCoupleEleData.push(channelChartEleData);
        channelChartEleData = {
          x: 25 * (index + 1),
          y: channelData.previous,
          z: "previous",
          text: channelDataKey
        }
        channelChartCoupleEleData.push(channelChartEleData);
        channelChartData.push(channelChartCoupleEleData);
        channelChartCoupleEleData = [];
      })
    }
    return channelChartData
  }

  public render() {
    const { newBehaviourPill } = this.state;
    const metric = websiteBehaviourPillsLabels.get(newBehaviourPill);
    return (
      <BehaviourChannelChart>
        <BehaviourChannelChartFilter
          handleSelect={this.handleMetric}
          selectedPill={newBehaviourPill}
        />
        <ChannelChart
          channelChartsData={this.handleChannelData(this.props.websiteBehaviourChannelsState)}
          colors={colors}
          fillColor="350B48"
          chartHeight={300}
          metric={websiteBehaviourPillsKeys.get(newBehaviourPill)}
          yAxisName={metric}
        />
        <CustomLegendWrapper>
          <CustomLegend legendData={CustomLegendData} shape='circle' />
        </CustomLegendWrapper>
      </BehaviourChannelChart>
    );
  }
};


const mapStateToProps = (state) => ({
  websiteBehaviourChannelsState: state.websiteBehaviourChannelsState,
  globalFiltersState: state.globalFiltersState,
  websiteBehaviourPillsSelectingState: state.websiteBehaviourPillsSelectingState,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getWebsiteBehaviourChannels: (brand: string, metric: string, query: string) => dispatch({ type: WebsiteBehaviourChannelsAction.GET_WEBSITE_BEHAVIOUR_CHANNELS_REQUEST, payload: { brand, metric, query } }),
  websiteBahaviourPillsSelecting: (selectedPill: WebsiteBehaviourPillsType) => dispatch({ type: WebsiteBehaviourPillsSelectingAction.SELECT_WEBSITE_BEHAVIOUR_PILLS_START, payload: selectedPill }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BehaviourChannelChartCompo);