import * as iassign from 'immutable-assign';
import {
  WebsiteGeographicAction
} from '../constants';
import {
  websiteGeographicState,
  getWebsiteGeographicRequest,
  getWebsiteGeographicSuccess,
  getWebsiteGeographicFailure,

} from '../types/webisteGeographic';

export type websiteGeographicActionType = getWebsiteGeographicRequest | getWebsiteGeographicSuccess | getWebsiteGeographicFailure;

const initialState: websiteGeographicState = {
  websiteGeographic: {
    loading: false,
    websiteGeographicData: null,
    error: null,
  },
}

const websiteGeographicReducer = (state = initialState, action: websiteGeographicActionType) => {
  switch (action.type) {
    case WebsiteGeographicAction.GET_WEBSITE_GEOGRAPHIC_REQUEST:
      return iassign(
        state,
        state => state.websiteGeographic.loading,
        () => true,
      );
    case WebsiteGeographicAction.GET_WEBSITE_GEOGRAPHIC_SUCCESS:
      const getWebsiteGeographicSuccessAction: getWebsiteGeographicSuccess = action as getWebsiteGeographicSuccess;
      return iassign(
        state,
        (s) => {
          s.websiteGeographic = {
            loading: false,
            websiteGeographicData: getWebsiteGeographicSuccessAction && getWebsiteGeographicSuccessAction.websiteGeographicData,
          }

          return s;
        },
      );
    case WebsiteGeographicAction.GET_WEBSITE_GEOGRAPHIC_FAILURE:
      const getWebsiteGeographicFailureAction: getWebsiteGeographicFailure = action as getWebsiteGeographicFailure;
      return iassign(
        state,
        (s) => {
          s.websiteGeographic = {
            loading: false,
            websiteGeographicData: {},
            error: getWebsiteGeographicFailureAction && getWebsiteGeographicFailureAction.error,
          }

          return s;
        },
      );

    default:
      return state;
  }
}

export default websiteGeographicReducer