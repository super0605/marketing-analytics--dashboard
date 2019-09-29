import * as React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { WebsiteTransactionsProductsAction } from '../../../../redux/constants';
import { websiteTransactionsProductsState } from '../../../../redux/types/websiteTransactionsProducts';
import { globalFiltersState } from '../../../../redux/types/globalFilters';
import { websiteTransactionsPillsSelectingState } from '../../../../redux/types/websiteTransactionsPillsSelecting';

import { StackedBarChart, H3 } from "../../../../components";
import { sizes, px, WebsiteTransactionsPillsType, websiteTransactionsPills, globalFiltersQuery, GlobalFiltersQueryType, WebsiteTransactionProductsMetricsType, websiteTransactionProductsMetrics, } from "../../../../constants/constants";
import { StackedBarRevenueData, globalFiltersQueryObjType, websiteTransactionsProductData } from "../../../../constants/interfaces";
// import StackedBarFilter from './StackedBarFilter';
import { websiteTransactionsPillsKeys, globalFiltersQueryKeys, websiteTransactionProductsKeys } from '../../../../constants/valuesByType';
import { Value } from '~/models';


const TransactionsStackedBar = styled.div`
  width: 100%;
  padding-top: ${px(sizes.junior)};
  padding-bottom: ${px(sizes.junior)};
`;

interface TransactionsStackedBarCompoProps {
  websiteTransactionsProductsState: websiteTransactionsProductsState;
  getWebsiteTransactionsProducts: (brand: string, metric: string, query: string) => void;
  globalFiltersState: globalFiltersState;
  websiteTransactionsPillsSelectingState: websiteTransactionsPillsSelectingState;
}
interface TransactionsStackedBarCompoState {
  newTransactionsPill: WebsiteTransactionsPillsType;
  currentTransactionProductsMetric: WebsiteTransactionProductsMetricsType;
}
class TransactionsStackedBarCompo extends React.Component<TransactionsStackedBarCompoProps, TransactionsStackedBarCompoState> {
  constructor(props: TransactionsStackedBarCompoProps) {
    super(props);
    this.state = {
      newTransactionsPill: websiteTransactionsPills.Revenue,
      currentTransactionProductsMetric: websiteTransactionProductsMetrics.Revenue,
    };
  }

  componentDidMount() {
    const brand = "tb1";
    const metric = websiteTransactionProductsKeys.get(this.state.currentTransactionProductsMetric);
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

    this.props.getWebsiteTransactionsProducts(brand, metric, query);
  }

  componentWillReceiveProps({ globalFiltersState, websiteTransactionsPillsSelectingState }) {
    const brand = "tb1";
    const metric = websiteTransactionProductsKeys.get(this.state.currentTransactionProductsMetric);
    let query = null;
    query = this.getQuery(globalFiltersState, true);
    if (query) {
      this.props.getWebsiteTransactionsProducts(brand, metric, query);
    }
    
    if (websiteTransactionsPillsSelectingState.selectedWebsiteTransactionsPillData !== this.state.newTransactionsPill) {
      this.setState({ newTransactionsPill: websiteTransactionsPillsSelectingState.selectedWebsiteTransactionsPillData });
      // Because websiteTransactionProductsMetrics is restrict with 3 values so later let's do refine again.
      // this.getWebsiteTransactionsProducts(websiteTransactionsPillsSelectingState.selectedWebsiteBehaviourPillData);
    }
  }

  // Because websiteTransactionProductsMetrics is restrict with 3 values so later let's do refine again.
  // getWebsiteTransactionsProducts = (selectedPill: WebsiteTransactionProductsMetricsType) => {
  //   let metric = websiteTransactionProductsKeys.get(selectedPill);
  //   // if (metric == undefined || metric == null) {
  //   //   metric = websiteTransactionProductsKeys.get(websiteTransactionsPills.Revenue)
  //   // }
  //   const brand = "tb1";
  //   const global = false;
  //   let query = this.getQuery(this.props.globalFiltersState, global);
  //   if (query == null) {
  //     const queryObj = {
  //       [globalFiltersQuery.Range]: "LastMonth",
  //       [globalFiltersQuery.Channel]: "",
  //       [globalFiltersQuery.Device]: "",
  //       [globalFiltersQuery.Region]: "",
  //       [globalFiltersQuery.CompareWith]: "PreviousPeriod",
  //     }
  //     query = this.handleQuery(queryObj)
  //   }
  //   // this.setState({
  //   //   newTransactionsPill: selectedPill,
  //   // });
  //   this.props.getWebsiteTransactionsProducts(brand, metric, query);
  // }

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

  handleProductsData = (websiteTransactionsProductsState: websiteTransactionsProductsState) => {
    let proudctsData: websiteTransactionsProductData[] = [];
    let productData: websiteTransactionsProductData = null;
    const colors = ["#B3DF8C", "#33A02B", "#FD8003", "#CAB2D5", "#6A3D99", "#67011E", "#350B48", "#B3DF8C", "#33A02B", "#FD8003",];
    const metric = websiteTransactionProductsKeys.get(this.state.currentTransactionProductsMetric);
    const TransactionsProductsData: WebsiteTransactionsProductsModel = websiteTransactionsProductsState.websiteTransactionsProducts.websiteTransactionsProductsData;
    if (TransactionsProductsData) {
      const TransactionsProductsDataKeys = Object.keys(TransactionsProductsData) !== undefined ? Object.keys(TransactionsProductsData) : [];
      TransactionsProductsDataKeys.map((transactionsProductDataKey, key) => {
        const TransactionsProductData: Value = TransactionsProductsData[transactionsProductDataKey];
        productData = {
          name: transactionsProductDataKey,
          title: transactionsProductDataKey,
          [metric]: TransactionsProductData.current,
          change: TransactionsProductData.change,
          color: colors[key],
        }
        proudctsData.push(productData);
        productData = null;
      })
    }
    return proudctsData;
  }

  public render() {
    const productsData = this.handleProductsData(this.props.websiteTransactionsProductsState);
    const metric = websiteTransactionProductsKeys.get(this.state.currentTransactionProductsMetric);
    return (
      <TransactionsStackedBar>
        {/* <StackedBarFilter /> */}
        <H3 content={`Total ${metric} by product`} />
        <StackedBarChart
          // barData={ProductData}
          metric={metric}
          barData={productsData}
          totalRevenue={200000}
        />
      </TransactionsStackedBar>
    );
  }
};


const mapStateToProps = (state) => ({
  websiteTransactionsProductsState: state.websiteTransactionsProductsState,
  globalFiltersState: state.globalFiltersState,
  websiteTransactionsPillsSelectingState: state.websiteTransactionsPillsSelectingState,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getWebsiteTransactionsProducts: (brand: string, metric: string, query: string) => dispatch({ type: WebsiteTransactionsProductsAction.GET_WEBSITE_TRANSACTIONS_PRODUCTS_REQUEST, payload: { brand, metric, query } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsStackedBarCompo);