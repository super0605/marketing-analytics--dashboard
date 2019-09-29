import { put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { 
  mapTableHoverAction,
} from '../constants';

function* mapTableHover(action: AnyAction) {
  try {
    yield put({ type: mapTableHoverAction.MAP_TABLE_HOVER_DOING, countryData: action.payload });
  } catch (err) {
    yield put({ type: mapTableHoverAction.MAP_TABLE_HOVER_FAILURE, err: err });
  }
}

export function* mapTableHoverSaga() {
  yield takeEvery(mapTableHoverAction.MAP_TABLE_HOVER_START, mapTableHover);
}