import * as iassign from 'immutable-assign';
import {
  GlobalFilterAction
} from '../constants';
import {
  globalFiltersState,
  selectGlobalFilterStart,
  selectGlobalFilterDone,
  selectGlobalFilterFailure,

} from '../types/globalFilters';
import { globalFiltersQuery } from '../../constants/constants';


export type GlobalFilterAction = selectGlobalFilterStart | selectGlobalFilterDone | selectGlobalFilterFailure;

const initialState: globalFiltersState = {
  isSelecting: false,
  globalFiltersData: {
    globalFilterQueriesObj: {
      [globalFiltersQuery.Range]: "",
      [globalFiltersQuery.Channel]: "",
      [globalFiltersQuery.Device]: "",
      [globalFiltersQuery.Region]: "",
      [globalFiltersQuery.CompareWith]: "",
    },
    globalFiltersObj: {
      [globalFiltersQuery.Range]: null,
      [globalFiltersQuery.Channel]: null,
      [globalFiltersQuery.Device]: null,
      [globalFiltersQuery.Region]: null,
      [globalFiltersQuery.CompareWith]: null,
    }
  },
  error: null,
}

const globalFiltersReducer = (state = initialState, action: GlobalFilterAction) => {
  switch (action.type) {
    case GlobalFilterAction.SELECT_GLOBAL_FILTER_START:
      return iassign(
        state,
        state => state.isSelecting,
        () => true,
      );
    case GlobalFilterAction.SELECT_GLOBAL_FILTER_DONE:
      const selectGlobalFiltersDoneAction: selectGlobalFilterDone = action as selectGlobalFilterDone;
      return iassign(
        state,
        (s) => {
          s.isSelecting = false;
          s.globalFiltersData = selectGlobalFiltersDoneAction && selectGlobalFiltersDoneAction.globalFiltersData;

          return s;
        },
      );
    case GlobalFilterAction.SELECT_GLOBAL_FILTER_FAILURE:
      const selectGlobalFiltersFailureAction: selectGlobalFilterFailure = action as selectGlobalFilterFailure;
      return iassign(
        state,
        (s) => {
          s.isSelecting = false;
          s.globalFiltersData = {
            globalFilterQueriesObj: {
              [globalFiltersQuery.Range]: "",
              [globalFiltersQuery.Channel]: "",
              [globalFiltersQuery.Device]: "",
              [globalFiltersQuery.Region]: "",
              [globalFiltersQuery.CompareWith]: "",
            },
            globalFiltersObj: {
              [globalFiltersQuery.Range]: null,
              [globalFiltersQuery.Channel]: null,
              [globalFiltersQuery.Device]: null,
              [globalFiltersQuery.Region]: null,
              [globalFiltersQuery.CompareWith]: null,
            }
          };
          s.error = selectGlobalFiltersFailureAction && selectGlobalFiltersFailureAction.error;

          return s;
        },
      );
    default:
      return state;
  }
}

export default globalFiltersReducer