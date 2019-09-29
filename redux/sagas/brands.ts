import { put, call, takeEvery } from 'redux-saga/effects';
import { 
  BrandsAction
} from '../constants';
import { getBrandsAPI, getBrandByIdAPI } from '../utils/api';

function* getBrands() {
  try {
    const response = yield call(getBrandsAPI);
    if (response && typeof response == 'object') {
      yield put({ type: BrandsAction.GET_BRANDS_SUCCESS, brands: response });
    }
  } catch (err) {
    yield put({ type: BrandsAction.GET_BRANDS_FAILURE, error: err });
  }
}

function* getBrandById({payload: {brandId}}: any) {
  try {
    const response = yield call(getBrandByIdAPI, brandId);
    if (response && typeof response == 'object') {
      yield put({ type: BrandsAction.GET_BRAND_BY_ID_SUCCESS, brand: response });
    }
  } catch (err) {
    yield put({ type: BrandsAction.GET_BRAND_BY_ID_FAILURE, error: err });
  }
}

export function* brandsSaga() {
  yield takeEvery(BrandsAction.GET_BRANDS_REQUEST, getBrands);
  yield takeEvery(BrandsAction.GET_BRAND_BY_ID_REQUEST, getBrandById);
}
