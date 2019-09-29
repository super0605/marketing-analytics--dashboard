import { put, call, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { 
  WebsiteGeographicAction,
} from '../constants';
import { getWebsiteGeographicAPI } from '../utils/api';

function* getWebsiteGeographic({ payload: { brand, metric, query } }: AnyAction) {
  try {
    const response = yield call(getWebsiteGeographicAPI, { brand, metric, query });
    if (response && typeof response == 'object') {
      yield put({ type: WebsiteGeographicAction.GET_WEBSITE_GEOGRAPHIC_SUCCESS, websiteGeographicData: response });
    }
  } catch (err) {
    yield put({ type: WebsiteGeographicAction.GET_WEBSITE_GEOGRAPHIC_FAILURE, error: err });
  }
}

export function* websiteGeographicSaga() {
  yield takeEvery(WebsiteGeographicAction.GET_WEBSITE_GEOGRAPHIC_REQUEST, getWebsiteGeographic);
}
