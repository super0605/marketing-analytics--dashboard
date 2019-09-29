import { put, call, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { 
  WebsiteTransactionsTimelineAction,
} from '../constants';
import { getWebsiteTransactionsTimelineAPI } from '../utils/api';

function* getWebsiteTransactionsTimeline({ payload: { brand, metric, query } }: AnyAction) {
  try {
    const response = yield call(getWebsiteTransactionsTimelineAPI, { brand, metric, query });
    if (response && typeof response == 'object') {
      yield put({ type: WebsiteTransactionsTimelineAction.GET_WEBSITE_TRANSACTIONS_TIMELINE_SUCCESS, websiteTransactionsTimelineData: response });
    }
  } catch (err) {
    yield put({ type: WebsiteTransactionsTimelineAction.GET_WEBSITE_TRANSACTIONS_TIMELINE_FAILURE, error: err });
  }
}

export function* websiteTransactionsTimelineSaga() {
  yield takeEvery(WebsiteTransactionsTimelineAction.GET_WEBSITE_TRANSACTIONS_TIMELINE_REQUEST, getWebsiteTransactionsTimeline);
}
