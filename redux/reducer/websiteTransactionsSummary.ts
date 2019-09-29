import * as iassign from 'immutable-assign';
import {
  WebsiteTransactionsSummaryAction,
} from '../constants';
import {
  websiteTransactionsSummaryState,
  getWebsiteTransactionsSummaryRequest,
  getWebsiteTransactionsSummarySuccess,
  getWebsiteTransactionsSummaryFailure,

} from '../types/websiteTransactionsSummary';

export type WebsiteTransactionsSummaryActionType = getWebsiteTransactionsSummaryRequest | getWebsiteTransactionsSummarySuccess | getWebsiteTransactionsSummaryFailure ;

const initialState: websiteTransactionsSummaryState = {
  websiteTransactionsSummary: {
    loading: false,
    websiteTransactionsSummaryData: null,
    error: null,
  },
}

const websiteTransactionsSummaryReducer = (state = initialState, action: WebsiteTransactionsSummaryActionType) => {
  switch (action.type) {
    case WebsiteTransactionsSummaryAction.GET_WEBSITE_TRANSACTIONS_SUMMARY_REQUEST:
      return iassign(
        state,
        state => state.websiteTransactionsSummary.loading,
        () => true,
      );
    case WebsiteTransactionsSummaryAction.GET_WEBSITE_TRANSACTIONS_SUMMARY_SUCCESS:
      const getWebsiteTransactionsSummarySuccessAction: getWebsiteTransactionsSummarySuccess = action as getWebsiteTransactionsSummarySuccess;
      return iassign(
        state,
        (s) => {
          s.websiteTransactionsSummary = {
            loading: false,
            websiteTransactionsSummaryData: getWebsiteTransactionsSummarySuccessAction && getWebsiteTransactionsSummarySuccessAction.websiteTransactionsSummaryData,
          }
          
          return s;
        },
      );
    case WebsiteTransactionsSummaryAction.GET_WEBSITE_TRANSACTIONS_SUMMARY_FAILURE:
      const getWebsiteTransactionsSummaryFailureAction: getWebsiteTransactionsSummaryFailure = action as getWebsiteTransactionsSummaryFailure;
      return iassign(
        state,
        (s) => {
          s.websiteTransactionsSummary = {
            loading: false,
            websiteTransactionsSummaryData: {},
            error: getWebsiteTransactionsSummaryFailureAction && getWebsiteTransactionsSummaryFailureAction.error,
          }

          return s;
        },
      );

    default:
      return state;
  }
}

export default websiteTransactionsSummaryReducer