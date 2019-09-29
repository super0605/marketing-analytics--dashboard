import * as iassign from 'immutable-assign';
import {
  BrandsAction,
} from '../constants';
import {
  brandsState,
  getBrandsRequest,
  getBrandsSuccess,
  getBrandsFailure,
  getBrandByIdRequest,
  getBrandByIdSuccess,
  getBrandByIdFailure,
} from '../types/brands';

export type brandsAction = getBrandsRequest | getBrandsSuccess | getBrandsFailure |
  getBrandByIdRequest | getBrandByIdSuccess | getBrandByIdFailure;

const initialState: brandsState = {
  brandLists: {
    loading: false,
    brands: [],
    error: null,
  },
  brandById: {
    loading: false,
    brand: null,
    error: null,
  },
}

const brandsReducer = (state = initialState, action: brandsAction) => {
  switch (action.type) {
    case BrandsAction.GET_BRANDS_REQUEST:
      return iassign(
        state,
        state => state.brandLists.loading,
        () => true,
      );
    case BrandsAction.GET_BRANDS_SUCCESS:
      const getBrandsSuccessAction: getBrandsSuccess = action as getBrandsSuccess;
      return iassign(
        state,
        (s) => {
          s.brandLists = {
            loading: false,
            brands: getBrandsSuccessAction && getBrandsSuccessAction.brands
          }

          return s;
        },
      );
    case BrandsAction.GET_BRANDS_FAILURE:
      const getBrandsFailureAction: getBrandsFailure = action as getBrandsFailure;
      return iassign(
        state,
        (s) => {
          s.brandLists = {
            loading: false,
            brands: [],
            error: getBrandsFailureAction && getBrandsFailureAction.error,
          }

          return s;
        },
      );

    case BrandsAction.GET_BRAND_BY_ID_REQUEST:
      return iassign(
        state,
        state => state.brandById.loading,
        () => true,
      );
    case BrandsAction.GET_BRAND_BY_ID_SUCCESS:
      const getBrandByIdSuccessAction: getBrandByIdSuccess = action as getBrandByIdSuccess;
      return iassign(
        state,
        (s) => {
          s.brandById = {
            loading: false,
            brand: getBrandByIdSuccessAction && getBrandByIdSuccessAction.brand,
          }

          return s;
        },
      );
    case BrandsAction.GET_BRAND_BY_ID_FAILURE:
      const getBrandByIdFailureAction: getBrandByIdFailure = action as getBrandByIdFailure;
      return iassign(
        state,
        (s) => {
          s.brandById = {
            loading: false,
            brand: null,
            error: getBrandByIdFailureAction && getBrandByIdFailureAction.error,
          }
          return s;
        },
      );
    default:
      return state;
  }
}

export default brandsReducer