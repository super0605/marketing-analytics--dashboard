import { WebsiteBehaviourTimelineModel } from "../../models";

// initial state
export interface websiteBehaviourTimelineState {
  websiteBehaviourTimeline: websiteBehaviourTimeline
}
export interface websiteBehaviourTimeline {
  loading: boolean;
  websiteBehaviourTimelineData: WebsiteBehaviourTimelineModel;
  error?: string;
}

// action type 
export interface getWebsiteBehaviourTimelineRequest {
  type: string;
}

export interface getWebsiteBehaviourTimelineSuccess {
  type: string;
  websiteBehaviourTimelineData: WebsiteBehaviourTimelineModel;
}

export interface getWebsiteBehaviourTimelineFailure {
  type: string;
  error?: string;
}