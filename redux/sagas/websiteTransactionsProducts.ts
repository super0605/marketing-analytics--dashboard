import { put, call, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { 
  WebsiteTransactionsProductsAction
} from '../constants';
import { getWebsiteTransactionsProductsAPI } from '../utils/api';

function* getWebsiteTransactionsProducts({ payload: { brand, metric, query } }: AnyAction) {
  try {
    const response = yield call(getWebsiteTransactionsProductsAPI, { brand, metric, query });
    if (response && typeof response == 'object') {
      yield put({ type: WebsiteTransactionsProductsAction.GET_WEBSITE_TRANSACTIONS_PRODUCTS_SUCCESS, websiteTransactionsProductsData: response });
    }
  } catch (err) {
    yield put({ type: WebsiteTransactionsProductsAction.GET_WEBSITE_TRANSACTIONS_PRODUCTS_FAILURE, error: err });
  }
}

export function* websiteTransactionsProductsSaga() {
  yield takeEvery(WebsiteTransactionsProductsAction.GET_WEBSITE_TRANSACTIONS_PRODUCTS_REQUEST, getWebsiteTransactionsProducts);
}
