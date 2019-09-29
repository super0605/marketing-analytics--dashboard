import { put, call, takeEvery } from 'redux-saga/effects';
import { 
  testAction,
} from '../constants';

function* testMessage() {
  try {
    yield put({ type: testAction.TEST_SUCCESS, payload: "Welcome to redux-saga ..." });
  } catch (err) {
    yield put({ type: testAction.TEST_FAILURE, payload: err });
  }
}

export function* testSaga() {
  yield takeEvery(testAction.TEST_REQUEST, testMessage);
}