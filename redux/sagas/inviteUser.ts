import { put, call, takeEvery } from 'redux-saga/effects';
import { 
  InviteUserAction,
} from '../constants';
import { inviteUserAPI } from '../utils/api';

function* inviteUser({ payload: { userToInvite } }: any) {
  try {
    const response = yield call(inviteUserAPI, userToInvite);
    if (response) {
      yield put({ type: InviteUserAction.INVITE_USER_SUCCESS, payload: response });
    }
  } catch (err) {
    yield put({ type: InviteUserAction.INVITE_USER_FAILURE, error: err });
  }
}

export function* inviteUserSaga() {
  yield takeEvery(InviteUserAction.INVITE_USER_REQUEST, inviteUser);
}
