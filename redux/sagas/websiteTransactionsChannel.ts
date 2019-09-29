import { put, call, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { 
  WebsiteTransactionsChannelAction,
} from '../constants';
import { getWebsiteTransactionsChannelAPI } from '../utils/api';

function* getWebsiteTransactionsChannel({ payload: { brand, metric, query } }: AnyAction) {
  try {
    const response = yield call(getWebsiteTransactionsChannelAPI, { brand, metric, query });
    if (response && typeof response == 'object') {
      yield put({ type: WebsiteTransactionsChannelAction.GET_WEBSITE_TRANSACTIONS_CHANNEL_SUCCESS, websiteTransactionsChannelData: response });
    }
  } catch (err) {
    yield put({ type: WebsiteTransactionsChannelAction.GET_WEBSITE_TRANSACTIONS_CHANNEL_FAILURE, error: err });
  }
}

export function* websiteTransactionsChannelSaga() {
  yield takeEvery(WebsiteTransactionsChannelAction.GET_WEBSITE_TRANSACTIONS_CHANNEL_REQUEST, getWebsiteTransactionsChannel);
}
