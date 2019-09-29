import * as iassign from 'immutable-assign';
import {
  WebsiteBehaviourChannelsAction
} from '../constants';
import {
  websiteBehaviourChannelsState,
  getWebsiteBehaviourChannelsRequest,
  getWebsiteBehaviourChannelsSuccess,
  getWebsiteBehaviourChannelsFailure,

} from '../types/websiteBehaviourChannels';

export type websiteBehaviourChannelsActionType = getWebsiteBehaviourChannelsRequest | getWebsiteBehaviourChannelsSuccess | getWebsiteBehaviourChannelsFailure;

const initialState: websiteBehaviourChannelsState = {
  websiteBehaviourChannels: {
    loading: false,
    websiteBehaviourChannelsData: null,
    error: null,
  },
}

const websiteBehaviourChannelsReducer = (state = initialState, action: websiteBehaviourChannelsActionType) => {
  switch (action.type) {
    case WebsiteBehaviourChannelsAction.GET_WEBSITE_BEHAVIOUR_CHANNELS_REQUEST:
      return iassign(
        state,
        state => state.websiteBehaviourChannels.loading,
        () => true,
      );
    case WebsiteBehaviourChannelsAction.GET_WEBSITE_BEHAVIOUR_CHANNELS_SUCCESS:
      const getWebsiteBehaviourChannelsSuccessAction: getWebsiteBehaviourChannelsSuccess = action as getWebsiteBehaviourChannelsSuccess;
      return iassign(
        state,
        (s) => {
          s.websiteBehaviourChannels = {
            loading: false,
            websiteBehaviourChannelsData: getWebsiteBehaviourChannelsSuccessAction && getWebsiteBehaviourChannelsSuccessAction.websiteBehaviourChannelsData,
          }

          return s;
        },
      );
    case WebsiteBehaviourChannelsAction.GET_WEBSITE_BEHAVIOUR_CHANNELS_FAILURE:
      const getWebsiteBehaviourChannelsFailureAction: getWebsiteBehaviourChannelsFailure = action as getWebsiteBehaviourChannelsFailure;
      return iassign(
        state,
        (s) => {
          s.websiteBehaviourChannels = {
            loading: false,
            websiteBehaviourChannelsData: {},
            error: getWebsiteBehaviourChannelsFailureAction && getWebsiteBehaviourChannelsFailureAction.error,
          }

          return s;
        },
      );

    default:
      return state;
  }
}

export default websiteBehaviourChannelsReducer