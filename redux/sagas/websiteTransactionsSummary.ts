import { put, call, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { 
  WebsiteTransactionsSummaryAction,
} from '../constants';
import { getWebsiteTransactionsSummaryAPI } from '../utils/api';

function* getWebsiteTransactionsSummary({ payload: { brand, query } }: AnyAction) {
  try {
    const response = yield call(getWebsiteTransactionsSummaryAPI, { brand, query });
    if (response && typeof response == 'object') {
      yield put({ type: WebsiteTransactionsSummaryAction.GET_WEBSITE_TRANSACTIONS_SUMMARY_SUCCESS, websiteTransactionsSummaryData: response });
    }
  } catch (err) {
    yield put({ type: WebsiteTransactionsSummaryAction.GET_WEBSITE_TRANSACTIONS_SUMMARY_FAILURE, error: err });
  }
}

export function* websiteTransactionsSummarySaga() {
  yield takeEvery(WebsiteTransactionsSummaryAction.GET_WEBSITE_TRANSACTIONS_SUMMARY_REQUEST, getWebsiteTransactionsSummary);
}
