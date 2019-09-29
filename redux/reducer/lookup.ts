import * as iassign from 'immutable-assign';
import {
  LookupAction
} from '../constants';
import {
  lookupState,
  getLookupRequest,
  getLookupSuccess,
  getLookupFailure,
  getLookupByFilterRequest,
  getLookupByFilterSuccess,
  getLookupByFilterFailure,

} from '../types/lookup';

export type lookupAction = getLookupRequest | getLookupSuccess | getLookupFailure |
  getLookupByFilterRequest | getLookupByFilterSuccess | getLookupByFilterFailure ;

const initialState: lookupState = {
  lookup: {
    loading: false,
    lookupList: {},
    error: null,
  },
  lookupByFilter: {
    loading: false,
    lookupByFilter: [],
    error: null,
  }
}

const lookupReducer = (state = initialState, action: lookupAction) => {
  switch (action.type) {
    case LookupAction.GET_LOOKUP_REQUEST:
      return iassign(
        state,
        state => state.lookup.loading,
        () => true,
      );
    case LookupAction.GET_LOOKUP_SUCCESS:
      const getLookupSuccessAction: getLookupSuccess = action as getLookupSuccess;
      return iassign(
        state,
        (s) => {
          s.lookup = {
            loading: false,
            lookupList: getLookupSuccessAction && getLookupSuccessAction.lookupList
          }
          
          return s;
        },
      );
    case LookupAction.GET_LOOKUP_FAILURE:
      const getLookupFailureAction: getLookupFailure = action as getLookupFailure;
      return iassign(
        state,
        (s) => {
          s.lookup = {
            loading: false,
            lookupList: {},
            error: getLookupFailureAction && getLookupFailureAction.error,
          }

          return s;
        },
      );

    // Lookup by filter

    case LookupAction.GET_LOOKUP_BY_FILTER_REQUEST:
      return iassign(
        state,
        state => state.lookup.loading,
        () => true,
      );
    case LookupAction.GET_LOOKUP_BY_FILTER_SUCCESS:
      const getLookupByFilterSuccessAction: getLookupByFilterSuccess = action as getLookupByFilterSuccess;
      return iassign(
        state,
        (s) => {
          s.lookupByFilter = {
            loading: false,
            lookupByFilter: getLookupByFilterSuccessAction && getLookupByFilterSuccessAction.lookupByFilter
          }
          
          return s;
        },
      );
    case LookupAction.GET_LOOKUP_BY_FILTER_FAILURE:
      const getLookupByFilterFailureAction: getLookupByFilterFailure = action as getLookupByFilterFailure;
      return iassign(
        state,
        (s) => {
          s.lookupByFilter = {
            loading: false,
            lookupByFilter: [],
            error: getLookupByFilterFailureAction && getLookupByFilterFailureAction.error,
          }

          return s;
        },
      );

    default:
      return state;
  }
}

export default lookupReducer