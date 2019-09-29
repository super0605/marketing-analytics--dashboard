import * as iassign from 'immutable-assign';
import {
  WebsiteSummaryAction
} from '../constants';
import {
  websiteSummaryState,
  getWebsiteSummaryRequest,
  getWebsiteSummarySuccess,
  getWebsiteSummaryFailure,

} from '../types/websiteSummary';

export type WebsiteSummaryActionType = getWebsiteSummaryRequest | getWebsiteSummarySuccess | getWebsiteSummaryFailure ;

const initialState: websiteSummaryState = {
  websiteSummary: {
    loading: false,
    websiteSummaryData: null,
    error: null,
  },
}

const websiteSummaryReducer = (state = initialState, action: WebsiteSummaryActionType) => {
  switch (action.type) {
    case WebsiteSummaryAction.GET_WEBSITE_SUMMARY_REQUEST:
      return iassign(
        state,
        state => state.websiteSummary.loading,
        () => true,
      );
    case WebsiteSummaryAction.GET_WEBSITE_SUMMARY_SUCCESS:
      const getWebsiteSummarySuccessAction: getWebsiteSummarySuccess = action as getWebsiteSummarySuccess;
      return iassign(
        state,
        (s) => {
          s.websiteSummary = {
            loading: false,
            websiteSummaryData: getWebsiteSummarySuccessAction && getWebsiteSummarySuccessAction.websiteSummaryData,
          }
          
          return s;
        },
      );
    case WebsiteSummaryAction.GET_WEBSITE_SUMMARY_FAILURE:
      const getWebsiteSummaryFailureAction: getWebsiteSummaryFailure = action as getWebsiteSummaryFailure;
      return iassign(
        state,
        (s) => {
          s.websiteSummary = {
            loading: false,
            websiteSummaryData: {},
            error: getWebsiteSummaryFailureAction && getWebsiteSummaryFailureAction.error,
          }

          return s;
        },
      );

    default:
      return state;
  }
}

export default websiteSummaryReducer