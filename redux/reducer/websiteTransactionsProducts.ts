import * as iassign from 'immutable-assign';
import {
  WebsiteTransactionsProductsAction
} from '../constants';
import {
  websiteTransactionsProductsState,
  getWebsiteTransactionsProductsRequest,
  getWebsiteTransactionsProductsSuccess,
  getWebsiteTransactionsProductsFailure,

} from '../types/websiteTransactionsProducts';

export type websiteTransactionsProductsActionType = getWebsiteTransactionsProductsRequest | getWebsiteTransactionsProductsSuccess | getWebsiteTransactionsProductsFailure;

const initialState: websiteTransactionsProductsState = {
  websiteTransactionsProducts: {
    loading: false,
    websiteTransactionsProductsData: null,
    error: null,
  },
}

const websiteTransactionsProductsReducer = (state = initialState, action: websiteTransactionsProductsActionType) => {
  switch (action.type) {
    case WebsiteTransactionsProductsAction.GET_WEBSITE_TRANSACTIONS_PRODUCTS_REQUEST:
      return iassign(
        state,
        state => state.websiteTransactionsProducts.loading,
        () => true,
      );
    case WebsiteTransactionsProductsAction.GET_WEBSITE_TRANSACTIONS_PRODUCTS_SUCCESS:
      const getWebsiteTransactionsProductsSuccessAction: getWebsiteTransactionsProductsSuccess = action as getWebsiteTransactionsProductsSuccess;
      return iassign(
        state,
        (s) => {
          s.websiteTransactionsProducts = {
            loading: false,
            websiteTransactionsProductsData: getWebsiteTransactionsProductsSuccessAction && getWebsiteTransactionsProductsSuccessAction.websiteTransactionsProductsData,
          }

          return s;
        },
      );
    case WebsiteTransactionsProductsAction.GET_WEBSITE_TRANSACTIONS_PRODUCTS_FAILURE:
      const getWebsiteTransactionsProductsFailureAction: getWebsiteTransactionsProductsFailure = action as getWebsiteTransactionsProductsFailure;
      return iassign(
        state,
        (s) => {
          s.websiteTransactionsProducts = {
            loading: false,
            websiteTransactionsProductsData: {},
            error: getWebsiteTransactionsProductsFailureAction && getWebsiteTransactionsProductsFailureAction.error,
          }

          return s;
        },
      );

    default:
      return state;
  }
}

export default websiteTransactionsProductsReducer