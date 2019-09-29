import { put, call, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { 
  WebsiteBehaviourTimelineAction,
} from '../constants';
import { getWebsiteBehaviourTimelineAPI } from '../utils/api';

function* getWebsiteBehaviourTimeline({ payload: { brand, metric, query } }: AnyAction) {
  try {
    const response = yield call(getWebsiteBehaviourTimelineAPI, { brand, metric, query });
    if (response && typeof response == 'object') {
      yield put({ type: WebsiteBehaviourTimelineAction.GET_WEBSITE_BEHAVIOUR_TIMELINE_SUCCESS, websiteBehaviourTimelineData: response });
    }
  } catch (err) {
    yield put({ type: WebsiteBehaviourTimelineAction.GET_WEBSITE_BEHAVIOUR_TIMELINE_FAILURE, error: err });
  }
}

export function* websiteBehaviourTimelineSaga() {
  yield takeEvery(WebsiteBehaviourTimelineAction.GET_WEBSITE_BEHAVIOUR_TIMELINE_REQUEST, getWebsiteBehaviourTimeline);
}
