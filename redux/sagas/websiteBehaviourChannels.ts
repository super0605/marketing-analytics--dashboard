import { put, call, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { 
  WebsiteBehaviourChannelsAction,
} from '../constants';
import { getWebsiteBehaviourChannelsAPI } from '../utils/api';

function* getWebsiteBehaviourChannels({ payload: { brand, metric, query } }: AnyAction) {
  try {
    const response = yield call(getWebsiteBehaviourChannelsAPI, { brand, metric, query });
    if (response && typeof response == 'object') {
      yield put({ type: WebsiteBehaviourChannelsAction.GET_WEBSITE_BEHAVIOUR_CHANNELS_SUCCESS, websiteBehaviourChannelsData: response });
    }
  } catch (err) {
    yield put({ type: WebsiteBehaviourChannelsAction.GET_WEBSITE_BEHAVIOUR_CHANNELS_FAILURE, error: err });
  }
}

export function* websiteBehaviourChannelsSaga() {
  yield takeEvery(WebsiteBehaviourChannelsAction.GET_WEBSITE_BEHAVIOUR_CHANNELS_REQUEST, getWebsiteBehaviourChannels);
}
