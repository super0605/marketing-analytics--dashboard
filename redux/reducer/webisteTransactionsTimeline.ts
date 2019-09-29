import * as iassign from 'immutable-assign';
import {
  WebsiteTransactionsTimelineAction,
} from '../constants';
import {
  websiteTransactionsTimelineState,
  getWebsiteTransactionsTimelineRequest,
  getWebsiteTransactionsTimelineSuccess,
  getWebsiteTransactionsTimelineFailure,

} from '../types/webisteTransactionsTimeline';

export type websiteTransactionsTimelineActionType = getWebsiteTransactionsTimelineRequest | getWebsiteTransactionsTimelineSuccess | getWebsiteTransactionsTimelineFailure;

const initialState: websiteTransactionsTimelineState = {
  websiteTransactionsTimeline: {
    loading: false,
    websiteTransactionsTimelineData: null,
    error: null,
  },
}

const websiteTransactionsTimelineReducer = (state = initialState, action: websiteTransactionsTimelineActionType) => {
  switch (action.type) {
    case WebsiteTransactionsTimelineAction.GET_WEBSITE_TRANSACTIONS_TIMELINE_REQUEST:
      return iassign(
        state,
        state => state.websiteTransactionsTimeline.loading,
        () => true,
      );
    case WebsiteTransactionsTimelineAction.GET_WEBSITE_TRANSACTIONS_TIMELINE_SUCCESS:
      const getWebsiteTransactionsTimelineSuccessAction: getWebsiteTransactionsTimelineSuccess = action as getWebsiteTransactionsTimelineSuccess;
      return iassign(
        state,
        (s) => {
          s.websiteTransactionsTimeline = {
            loading: false,
            websiteTransactionsTimelineData: getWebsiteTransactionsTimelineSuccessAction && getWebsiteTransactionsTimelineSuccessAction.websiteTransactionsTimelineData,
          }

          return s;
        },
      );
    case WebsiteTransactionsTimelineAction.GET_WEBSITE_TRANSACTIONS_TIMELINE_FAILURE:
      const getWebsiteTransactionsTimelineFailureAction: getWebsiteTransactionsTimelineFailure = action as getWebsiteTransactionsTimelineFailure;
      return iassign(
        state,
        (s) => {
          s.websiteTransactionsTimeline = {
            loading: false,
            websiteTransactionsTimelineData: {},
            error: getWebsiteTransactionsTimelineFailureAction && getWebsiteTransactionsTimelineFailureAction.error,
          }

          return s;
        },
      );

    default:
      return state;
  }
}

export default websiteTransactionsTimelineReducer