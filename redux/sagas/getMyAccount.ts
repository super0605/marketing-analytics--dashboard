import { put, call, takeEvery } from 'redux-saga/effects';
import { 
  getMyAccountAction,
} from '../constants';
import { getMyAccountAPI } from '../utils/api';

function* getMyAccount() {
  try {
    const response = yield call(getMyAccountAPI);
    if (response) {
      yield put({ type: getMyAccountAction.GET_MY_ACCOUNT_SUCCESS, payload: response });
    }
  } catch (err) {
    yield put({ type: getMyAccountAction.GET_MY_ACCOUNT_FAILURE, error: err });
  }
}

export function* getMyAccountSaga() {
  yield takeEvery(getMyAccountAction.GET_MY_ACCOUNT_REQUEST, getMyAccount);
}
