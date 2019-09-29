import { put, call, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { 
  LookupAction,
} from '../constants';
import { getLookupAPI } from '../utils/api';

function* getLookup({ payload: { brand, query } }: AnyAction) {
  try {
    let queryString: string = "?";
    query.map((item, k) => {
      if (query && query.length == k + 1) {
        queryString = queryString + `type=${item}`
      } else {
        queryString = queryString + `type=${item}&`
      }
    })
    
    const response = yield call(getLookupAPI, { brand, queryString });
    if (response && typeof response == 'object') {
      yield put({ type: LookupAction.GET_LOOKUP_SUCCESS, lookupList: response });
    }
  } catch (err) {
    yield put({ type: LookupAction.GET_LOOKUP_FAILURE, error: err });
  }
}

function* getLookupByFilter({ payload: { brand, query } }: AnyAction) {
  try {
    const queryString = `/${query}`; // e.g: /{brand}/Lookup/channels
    
    const response = yield call(getLookupAPI, { brand, queryString });
    if (response && typeof response == 'object') {
      yield put({ type: LookupAction.GET_LOOKUP_BY_FILTER_SUCCESS, lookupFilter: response });
    }
  } catch (err) {
    yield put({ type: LookupAction.GET_LOOKUP_BY_FILTER_FAILURE, error: err });
  }
}

export function* lookupSaga() {
  yield takeEvery(LookupAction.GET_LOOKUP_REQUEST, getLookup);
  yield takeEvery(LookupAction.GET_LOOKUP_BY_FILTER_REQUEST, getLookupByFilter);
}
