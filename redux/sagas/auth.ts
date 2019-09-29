import { put, takeEvery } from 'redux-saga/effects';
import { 
  ADAuthAction,
} from '../constants';

function* adAuthentication(action) {
  try {
    if (action.payload) {
      yield put({ type: ADAuthAction.AUTHENTICATION_SUCCESS, token: action.payload });
    }
  } catch (err) {
    yield put({ type: ADAuthAction.AUTHENTICATION_FAILURE, error: err });
  }
}



export function* authSaga() {
  [
    yield takeEvery(ADAuthAction.AUTHENTICATION_START, adAuthentication),
  ]
}