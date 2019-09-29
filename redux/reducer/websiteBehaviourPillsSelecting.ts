import * as iassign from 'immutable-assign';
import {
  WebsiteBehaviourPillsSelectingAction,
} from '../constants';
import {
  websiteBehaviourPillsSelectingState,
  selectWebsiteBehaviourPillsSelectingStart,
  selectWebsiteBehaviourPillsSelectingDone,
  selectWebsiteBehaviourPIllsSelectingFailure,

} from '../types/websiteBehaviourPillsSelecting';
import { websiteBehaviourPills } from '../../constants/constants';


export type WebsiteBehaviourSelectingAction = selectWebsiteBehaviourPillsSelectingStart | selectWebsiteBehaviourPillsSelectingDone | selectWebsiteBehaviourPIllsSelectingFailure;

const initialState: websiteBehaviourPillsSelectingState = {
  isSelecting: false,
  selectedWebsiteBehaviourPillData: websiteBehaviourPills.Sessions,
  error: null,
}

const websiteBehaviourPillsSelectingReducer = (state = initialState, action: WebsiteBehaviourSelectingAction) => {
  switch (action.type) {
    case WebsiteBehaviourPillsSelectingAction.SELECT_WEBSITE_BEHAVIOUR_PILLS_START:
      return iassign(
        state,
        state => state.isSelecting,
        () => true,
      );
    case WebsiteBehaviourPillsSelectingAction.SELECT_WEBSITE_BEHAVIOUR_PILLS_DONE:
      const selectWebsiteBehaviourPillsSelectingDoneAction: selectWebsiteBehaviourPillsSelectingDone = action as selectWebsiteBehaviourPillsSelectingDone;
      return iassign(
        state,
        (s) => {
          s.isSelecting = false;
          s.selectedWebsiteBehaviourPillData = selectWebsiteBehaviourPillsSelectingDoneAction && selectWebsiteBehaviourPillsSelectingDoneAction.selectedWebsiteBehaviourPillData;

          return s;
        },
      );
    case WebsiteBehaviourPillsSelectingAction.SELECT_WEBSITE_BEHAVIOUR_PILLS_FAILURE:
      const selectWebsiteBehaviourPillsSelectingFailureAction: selectWebsiteBehaviourPIllsSelectingFailure = action as selectWebsiteBehaviourPIllsSelectingFailure;
      return iassign(
        state,
        (s) => {
          s.isSelecting = false;
          s.selectedWebsiteBehaviourPillData = null;
          s.error = selectWebsiteBehaviourPillsSelectingFailureAction && selectWebsiteBehaviourPillsSelectingFailureAction.error;

          return s;
        },
      );
    default:
      return state;
  }
}

export default websiteBehaviourPillsSelectingReducer