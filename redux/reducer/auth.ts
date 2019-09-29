import jwtDecode from 'jwt-decode';
import {
  ADAuthAction
} from '../constants';
import { MsalUserData, AuthState } from '../types/auth';

const initialState: AuthState = {
  userId: null,
  loading: false,
  error: false,
  token: null,
  user: null,
  isAuth: false
}

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADAuthAction.AUTHENTICATION_START:
      return Object.assign({}, state, {
        loading: true
      })
    case ADAuthAction.AUTHENTICATION_SUCCESS:
      const login_user: MsalUserData = jwtDecode(action.token);
      return Object.assign({}, state, {
        token: action.token,
        user: { ...login_user },
        loading: false,
        isAuth: true
      })
    case ADAuthAction.AUTHENTICATION_FAILURE:
      return Object.assign({}, state, {
        isAuth: false,
        userId: null,
        loading: false,
        error: action.error
      })
    default: return state
  }
}

export default authReducer