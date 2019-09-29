import * as iassign from 'immutable-assign';
import {
  UsersAction,
} from '../constants';
import { usersState } from '../types/users';
import { UserModel } from '../../models';


export interface usersRequest {
  type: string;
}

export interface usersSuccess {
  type: string;
  userLists: UserModel[];
}

export interface usersFailure {
  type: string;
  error?: string;
}

export type usersAction = usersRequest | usersSuccess | usersFailure;

const initialState: usersState = {
  roading: false,
  userLists: [],
}

const usersReducer = (state = initialState, action: usersAction) => {
  switch (action.type) {
    case UsersAction.GET_USERS_REQUEST:
      return iassign(
        state,
        state => state.roading,
        () => true,
      );
    case UsersAction.GET_USERS_SUCCESS:
      const usersSuccessAction: usersSuccess = action as usersSuccess;
      return iassign(
        state,
        (s) => {
          s.roading = false;
          s.userLists = usersSuccessAction && usersSuccessAction.userLists;

          return s;
        },
      );
    case UsersAction.GET_USERS_FAILURE:
      const usersFailureAction: usersFailure = action as usersFailure;
      return iassign(
        state,
        (s) => {
          s.roading = false;
          s.error = usersFailureAction && usersFailureAction.error;

          return s;
        },
      );
    default:
      return state;
  }
}

export default usersReducer