import { getMyAccountAction } from '../constants';
import { UserModel } from '../../models';
import { GetMyAccountState } from '../types/getMyAccount';

export interface GetMyAccountRequest {
  type: string;
}

export interface GetMyAccountSuccess {
  type: string;
  payload: UserModel;
}

export interface GetMyAccountFailure {
  type: string;
  error?: string;
}

export type GetMyAccountActionType = GetMyAccountRequest | GetMyAccountSuccess | GetMyAccountFailure;

const initialState: GetMyAccountState = {
  userId: null,
  loading: false,
  error: false,
  token: null,
  user: null,
  isAuth: false
}

const getMyAccountReducer = (state = initialState, action: GetMyAccountActionType) => {
  switch (action.type) {
    case getMyAccountAction.GET_MY_ACCOUNT_REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case getMyAccountAction.GET_MY_ACCOUNT_SUCCESS:
      const getMyAccountSuccessAction: GetMyAccountSuccess = action as GetMyAccountSuccess;
      return Object.assign({}, state, getMyAccountSuccessAction && getMyAccountSuccessAction.payload)
    case getMyAccountAction.GET_MY_ACCOUNT_FAILURE:
      const getMyAccountFailureAction: GetMyAccountFailure = action as GetMyAccountFailure;
      return Object.assign({}, state, {
        isAuth: false,
        userId: null,
        loading: false,
        error: getMyAccountFailureAction.error
      })
    default: return state
  }
}

export default getMyAccountReducer