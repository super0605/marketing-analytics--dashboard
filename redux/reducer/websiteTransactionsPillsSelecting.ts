import * as iassign from 'immutable-assign';
import {
  WebsiteTransactionsPillsSelectingAction,
} from '../constants';
import {
  websiteTransactionsPillsSelectingState,
  selectWebsiteTransactionsPillsSelectingStart,
  selectWebsiteTransactionsPillsSelectingDone,
  selectWebsiteTransactionsPIllsSelectingFailure,

} from '../types/websiteTransactionsPillsSelecting';
import { websiteTransactionsPills } from '../../constants/constants';


export type WebsiteTransactionsSelectingAction = selectWebsiteTransactionsPillsSelectingStart | selectWebsiteTransactionsPillsSelectingDone | selectWebsiteTransactionsPIllsSelectingFailure;

const initialState: websiteTransactionsPillsSelectingState = {
  isSelecting: false,
  selectedWebsiteTransactionsPillData: websiteTransactionsPills.Revenue,
  error: null,
}

const websiteTransactionsPillsSelectingReducer = (state = initialState, action: WebsiteTransactionsSelectingAction) => {
  switch (action.type) {
    case WebsiteTransactionsPillsSelectingAction.SELECT_WEBSITE_TRANSACTIONS_PILLS_START:
      return iassign(
        state,
        state => state.isSelecting,
        () => true,
      );
    case WebsiteTransactionsPillsSelectingAction.SELECT_WEBSITE_TRANSACTIONS_PILLS_DONE:
      const selectWebsiteTransactionsPillsSelectingDoneAction: selectWebsiteTransactionsPillsSelectingDone = action as selectWebsiteTransactionsPillsSelectingDone;
      return iassign(
        state,
        (s) => {
          s.isSelecting = false;
          s.selectedWebsiteTransactionsPillData = selectWebsiteTransactionsPillsSelectingDoneAction && selectWebsiteTransactionsPillsSelectingDoneAction.selectedWebsiteTransactionsPillData;

          return s;
        },
      );
    case WebsiteTransactionsPillsSelectingAction.SELECT_WEBSITE_TRANSACTIONS_PILLS_FAILURE:
      const selectWebsiteTransactionsPillsSelectingFailureAction: selectWebsiteTransactionsPIllsSelectingFailure = action as selectWebsiteTransactionsPIllsSelectingFailure;
      return iassign(
        state,
        (s) => {
          s.isSelecting = false;
          s.selectedWebsiteTransactionsPillData = null;
          s.error = selectWebsiteTransactionsPillsSelectingFailureAction && selectWebsiteTransactionsPillsSelectingFailureAction.error;

          return s;
        },
      );
    default:
      return state;
  }
}

export default websiteTransactionsPillsSelectingReducer