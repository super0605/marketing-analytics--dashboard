import * as iassign from 'immutable-assign';
import {
  WebsiteBehaviourTimelineAction,
} from '../constants';
import {
  websiteBehaviourTimelineState,
  getWebsiteBehaviourTimelineRequest,
  getWebsiteBehaviourTimelineSuccess,
  getWebsiteBehaviourTimelineFailure,

} from '../types/websiteBehaviourTimeline';

export type websiteBehaviourTimelineActionType = getWebsiteBehaviourTimelineRequest | getWebsiteBehaviourTimelineSuccess | getWebsiteBehaviourTimelineFailure;

const initialState: websiteBehaviourTimelineState = {
  websiteBehaviourTimeline: {
    loading: false,
    websiteBehaviourTimelineData: null,
    error: null,
  },
}

const websiteBehaviourTimelineReducer = (state = initialState, action: websiteBehaviourTimelineActionType) => {
  switch (action.type) {
    case WebsiteBehaviourTimelineAction.GET_WEBSITE_BEHAVIOUR_TIMELINE_REQUEST:
      return iassign(
        state,
        state => state.websiteBehaviourTimeline.loading,
        () => true,
      );
    case WebsiteBehaviourTimelineAction.GET_WEBSITE_BEHAVIOUR_TIMELINE_SUCCESS:
      const getWebsiteBehaviourTimelineSuccessAction: getWebsiteBehaviourTimelineSuccess = action as getWebsiteBehaviourTimelineSuccess;
      return iassign(
        state,
        (s) => {
          s.websiteBehaviourTimeline = {
            loading: false,
            websiteBehaviourTimelineData: getWebsiteBehaviourTimelineSuccessAction && getWebsiteBehaviourTimelineSuccessAction.websiteBehaviourTimelineData,
          }

          return s;
        },
      );
    case WebsiteBehaviourTimelineAction.GET_WEBSITE_BEHAVIOUR_TIMELINE_FAILURE:
      const getWebsiteBehaviourTimelineFailureAction: getWebsiteBehaviourTimelineFailure = action as getWebsiteBehaviourTimelineFailure;
      return iassign(
        state,
        (s) => {
          s.websiteBehaviourTimeline = {
            loading: false,
            websiteBehaviourTimelineData: {},
            error: getWebsiteBehaviourTimelineFailureAction && getWebsiteBehaviourTimelineFailureAction.error,
          }

          return s;
        },
      );

    default:
      return state;
  }
}

export default websiteBehaviourTimelineReducer