import { put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { 
  GlobalFilterAction,
} from '../constants';

function* globalFilters(action: AnyAction) {
  try {
    yield put({ type: GlobalFilterAction.SELECT_GLOBAL_FILTER_DONE, globalFiltersData: action.payload });

  } catch (err) {
    yield put({ type: GlobalFilterAction.SELECT_GLOBAL_FILTER_FAILURE, err: err });
  }
}

export function* globalFiltersSaga() {
  yield takeEvery(GlobalFilterAction.SELECT_GLOBAL_FILTER_START, globalFilters);
}