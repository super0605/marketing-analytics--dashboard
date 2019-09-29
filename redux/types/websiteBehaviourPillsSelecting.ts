import { WebsiteBehaviourPillsType } from "../../constants/constants";

// initial state
export interface websiteBehaviourPillsSelectingState {
  isSelecting: boolean;
  selectedWebsiteBehaviourPillData: WebsiteBehaviourPillsType;
  error?: string;
}

// action type 
export interface selectWebsiteBehaviourPillsSelectingStart {
  type: string;
}

export interface selectWebsiteBehaviourPillsSelectingDone {
  type: string;
  selectedWebsiteBehaviourPillData: WebsiteBehaviourPillsType;
}

export interface selectWebsiteBehaviourPIllsSelectingFailure {
  type: string;
  error?: string;
}