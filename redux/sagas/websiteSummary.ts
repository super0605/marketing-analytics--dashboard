import { put, call, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { 
  WebsiteSummaryAction,
} from '../constants';
import { getWebsiteSummaryAPI } from '../utils/api';

function* getWebsiteSummary({ payload: { brand, query } }: AnyAction) {
  try {
    const response = yield call(getWebsiteSummaryAPI, { brand, query });
    if (response && typeof response == 'object') {
      yield put({ type: WebsiteSummaryAction.GET_WEBSITE_SUMMARY_SUCCESS, websiteSummaryData: response });
    }
  } catch (err) {
    yield put({ type: WebsiteSummaryAction.GET_WEBSITE_SUMMARY_FAILURE, error: err });
  }
}

export function* websiteSummarySaga() {
  yield takeEvery(WebsiteSummaryAction.GET_WEBSITE_SUMMARY_REQUEST, getWebsiteSummary);
}
