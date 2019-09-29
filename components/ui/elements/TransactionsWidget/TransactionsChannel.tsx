import * as React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { WebsiteTransactionsChannelAction } from '../../../../redux/constants';
import { websiteTransactionsChannelState } from '../../../../redux/types/websiteTransactionChannel';
import { globalFiltersState } from '../../../../redux/types/globalFilters';
import { websiteTransactionsPillsSelectingState } from '../../../../redux/types/websiteTransactionsPillsSelecting';

import { H3, Sunburst } from '../../../../components';
import TransactionsChannelTable from './TransactionsChannelTable';
import { sizes, px, SunburstData, WebsiteTransactionsPillsType, websiteTransactionsPills, globalFiltersQuery, GlobalFiltersQueryType, SunburstChildren } from "../../../../constants/constants";
import { websiteTransactionsPillsKeys, globalFiltersQueryKeys, websiteTransactionsPillsLabels } from '../../../../constants/valuesByType';
import { globalFiltersQueryObjType } from '../../../../constants/interfaces';
import { WebsiteTransactionsChannelModel, Value } from '~/models';


const TransactionsChannel = styled.div`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: ${px(-Math.abs(sizes.little))};
  margin-right: ${px(-Math.abs(sizes.little))};
  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;

function getWidthString(span, specified?) {
  if (!span) return;

  let width = span / (specified || 12) * 100;
  return `flex: 0 0 ${width}%`;
}

interface ColumnProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  specified?: number;
}
const Column = styled.div`
  padding-right: ${px(sizes.little)};
  padding-left: ${px(sizes.little)};
  ${(props: ColumnProps) => (props.xs ? getWidthString(props.xs, props.specified) : "width: 100%")};

  @media only screen and (min-width: 768px) {
    ${(props: ColumnProps) => (props.sm ? getWidthString(props.sm, props.specified) : "width: 100%")};
  }

  @media only screen and (min-width: 992px) {
    ${(props: ColumnProps) => (props.md ? getWidthString(props.md, props.specified) : "width: 100%")};
  }

  @media only screen and (min-width: 1200px) {
    ${(props: ColumnProps) => (props.lg ? getWidthString(props.lg, props.specified) : "width: 100%")};
  }
`;

interface SpaceDividerProps {
  height: number;
}
const SpaceDivider = styled.div`
  width: 100%;
  height: ${(props: SpaceDividerProps) => props.height}px;
`;

interface TransactionsChannelCompoPrpos {
  width: number;
  data?: SunburstData;
  websiteTransactionsChannelState: websiteTransactionsChannelState;
  getWebsiteTransactionsChannel: (brand: string, metric: string, query: string) => void;
  globalFiltersState: globalFiltersState;
  websiteTransactionsPillsSelectingState: websiteTransactionsPillsSelectingState;
}
interface TransactionsChannelCompoState {
  newTransactionsPill: WebsiteTransactionsPillsType;
}
class TransactionsChannelCompo extends React.Component<TransactionsChannelCompoPrpos, TransactionsChannelCompoState> {
  constructor(props: TransactionsChannelCompoPrpos) {
    super(props);
    this.state = {
      newTransactionsPill: websiteTransactionsPills.Revenue,
    };
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

    this.props.getWebsiteTransactionsChannel(brand, metric, query);
  }

  componentWillReceiveProps({ globalFiltersState, websiteTransactionsPillsSelectingState }) {
    const brand = "tb1";
    const metric = websiteTransactionsPillsKeys.get(this.state.newTransactionsPill);
    let query = null;
    query = this.getQuery(globalFiltersState, true);
    if (query) {
      this.props.getWebsiteTransactionsChannel(brand, metric, query);
    }

    if (websiteTransactionsPillsSelectingState.selectedWebsiteTransactionsPillData !== this.state.newTransactionsPill) {
      this.setState({ newTransactionsPill: websiteTransactionsPillsSelectingState.selectedWebsiteTransactionsPillData });
      this.getWebsiteTransactionsChannel(websiteTransactionsPillsSelectingState.selectedWebsiteTransactionsPillData);
    }

  }

  getWebsiteTransactionsChannel = (choice: WebsiteTransactionsPillsType) => {
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

    this.props.getWebsiteTransactionsChannel(brand, metric, query);
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

  handleSunburstData = (websiteTransactionsChannelState: websiteTransactionsChannelState) => {
    let sunburstData: SunburstData = null;
    let sunburstChildData: SunburstChildren = null;
    let sunburstChildArray = [];
    const selectedTransactionPill = 'Revenue';
    const channelsData: WebsiteTransactionsChannelModel = websiteTransactionsChannelState.websiteTransactionsChannel.websiteTransactionsChannelData;
    if (channelsData) {
      const channelsDataKeys = Object.keys(channelsData) !== undefined ? Object.keys(channelsData) : [];
      channelsDataKeys.map((channelDataKey) => {
        const channelData: Value = channelsData[channelDataKey];
        sunburstChildData = {
          name: channelDataKey,
          children: [
            {
              name: 'current',
              value: channelData.current,
            },
            {
              name: 'previous',
              value: channelData.previous,
            },
            {
              name: 'change',
              value: channelData.change,
            },
          ]
        };
        sunburstChildArray.push(sunburstChildData);
        sunburstChildData = null;
      });
      sunburstData = {
        name: selectedTransactionPill,
        children: sunburstChildArray,
      };
      sunburstChildArray = [];
    }
    return sunburstData
  }

  render() {
    const { width } = this.props;
    const sunburstData = this.handleSunburstData(this.props.websiteTransactionsChannelState);
    const { newTransactionsPill } = this.state;
    const metric = websiteTransactionsPillsLabels.get(newTransactionsPill);
    return (
      <TransactionsChannel>
        <Row>
          <Column>
            <H3 content={`Total ${metric} by channel`} />
          </Column>
        </Row>
        <SpaceDivider height={sizes.petite} />
        <Row>
          <Column lg={6} md={6} sm={6} xs={6}>
            <TransactionsChannelTable />
          </Column>
          <Column lg={6} md={6} sm={6} xs={6}>
            <Sunburst width={width} data={sunburstData} />
          </Column>
        </Row>
      </TransactionsChannel>
    );
  }
}

const mapStateToProps = (state) => ({
  websiteTransactionsChannelState: state.websiteTransactionsChannelState,
  globalFiltersState: state.globalFiltersState,
  websiteTransactionsPillsSelectingState: state.websiteTransactionsPillsSelectingState,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getWebsiteTransactionsChannel: (brand: string, metric: string, query: string) => dispatch({ type: WebsiteTransactionsChannelAction.GET_WEBSITE_TRANSACTIONS_CHANNEL_REQUEST, payload: { brand, metric, query } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsChannelCompo);