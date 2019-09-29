import * as iassign from 'immutable-assign';
import {
  WebsiteTransactionsChannelAction
} from '../constants';
import {
  websiteTransactionsChannelState,
  getWebsiteTransactionsChannelRequest,
  getWebsiteTransactionsChannelSuccess,
  getWebsiteTransactionsChannelFailure,

} from '../types/websiteTransactionChannel';

export type websiteTransactionsChannelActionType = getWebsiteTransactionsChannelRequest | getWebsiteTransactionsChannelSuccess | getWebsiteTransactionsChannelFailure;

const initialState: websiteTransactionsChannelState = {
  websiteTransactionsChannel: {
    loading: false,
    websiteTransactionsChannelData: null,
    error: null,
  },
}

const websiteTransactionsChannelReducer = (state = initialState, action: websiteTransactionsChannelActionType) => {
  switch (action.type) {
    case WebsiteTransactionsChannelAction.GET_WEBSITE_TRANSACTIONS_CHANNEL_REQUEST:
      return iassign(
        state,
        state => state.websiteTransactionsChannel.loading,
        () => true,
      );
    case WebsiteTransactionsChannelAction.GET_WEBSITE_TRANSACTIONS_CHANNEL_SUCCESS:
      const getWebsiteTransactionsChannelSuccessAction: getWebsiteTransactionsChannelSuccess = action as getWebsiteTransactionsChannelSuccess;
      return iassign(
        state,
        (s) => {
          s.websiteTransactionsChannel = {
            loading: false,
            websiteTransactionsChannelData: getWebsiteTransactionsChannelSuccessAction && getWebsiteTransactionsChannelSuccessAction.websiteTransactionsChannelData,
          }

          return s;
        },
      );
    case WebsiteTransactionsChannelAction.GET_WEBSITE_TRANSACTIONS_CHANNEL_FAILURE:
      const getWebsiteTransactionsChannelFailureAction: getWebsiteTransactionsChannelFailure = action as getWebsiteTransactionsChannelFailure;
      return iassign(
        state,
        (s) => {
          s.websiteTransactionsChannel = {
            loading: false,
            websiteTransactionsChannelData: {},
            error: getWebsiteTransactionsChannelFailureAction && getWebsiteTransactionsChannelFailureAction.error,
          }

          return s;
        },
      );

    default:
      return state;
  }
}

export default websiteTransactionsChannelReducer