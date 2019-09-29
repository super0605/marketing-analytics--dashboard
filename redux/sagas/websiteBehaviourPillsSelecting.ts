import { put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { 
  WebsiteBehaviourPillsSelectingAction,
} from '../constants';

function* websiteBahaviourPillsSelecting(action: AnyAction) {
  try {
    yield put({ type: WebsiteBehaviourPillsSelectingAction.SELECT_WEBSITE_BEHAVIOUR_PILLS_DONE, selectedWebsiteBehaviourPillData: action.payload });

  } catch (err) {
    yield put({ type: WebsiteBehaviourPillsSelectingAction.SELECT_WEBSITE_BEHAVIOUR_PILLS_FAILURE, err: err });
  }
}

export function* websiteBehaviourPillsSelectingSaga() {
  yield takeEvery(WebsiteBehaviourPillsSelectingAction.SELECT_WEBSITE_BEHAVIOUR_PILLS_START, websiteBahaviourPillsSelecting);
}