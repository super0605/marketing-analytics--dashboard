import { put, call, takeEvery } from 'redux-saga/effects';
import { 
  UsersAction,
} from '../constants';
import { getUsersAPI } from '../utils/api';

function* getUsers() {
  try {
    const response = yield call(getUsersAPI);
    if (response && typeof response == 'object') {
      yield put({ type: UsersAction.GET_USERS_SUCCESS, userLists: response });
    }
  } catch (err) {
    yield put({ type: UsersAction.GET_USERS_FAILURE, error: err });
  }
}

export function* usersSaga() {
  yield takeEvery(UsersAction.GET_USERS_REQUEST, getUsers);
}
