import * as iassign from 'immutable-assign';
import {
  InviteUserAction,
} from '../constants';
import { inviteUserState } from '../types/inviteUser';
import { UserModel } from '../../models';

export interface inviteUserRequest {
  type: string;
}

export interface inviteUserSuccess {
  type: string;
  payload: UserModel;
}

export interface inviteUserFailure {
  type: string;
  error?: string;
}

export type inviteUserAction = inviteUserRequest | inviteUserSuccess | inviteUserFailure;

const initialState: inviteUserState = {
  roading: false,
  newUser: null,
}

const usersReducer = (state = initialState, action: inviteUserAction) => {
  switch (action.type) {
    case InviteUserAction.INVITE_USER_REQUEST:
      return iassign(
        state,
        state => state.roading,
        () => true,
      );
    case InviteUserAction.INVITE_USER_SUCCESS:
      const inviteUserSuccessAction: inviteUserSuccess = action as inviteUserSuccess;
      return iassign(
        state,
        (s) => {
          s.roading = false;
          s.newUser = inviteUserSuccessAction && inviteUserSuccessAction.payload;

          return s;
        },
      );
    case InviteUserAction.INVITE_USER_FAILURE:
      const inviteUserFailureAction: inviteUserFailure = action as inviteUserFailure;
      return iassign(
        state,
        (s) => {
          s.roading = false;
          s.error = inviteUserFailureAction && inviteUserFailureAction.error;

          return s;
        },
      );
    default:
      return state;
  }
}

export default usersReducer