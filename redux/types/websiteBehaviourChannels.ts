import { WebsiteBehaviourChannelsModel } from "../../models";

// initial state
export interface websiteBehaviourChannelsState {
  websiteBehaviourChannels: websiteBehaviourChannels
}
export interface websiteBehaviourChannels {
  loading: boolean;
  websiteBehaviourChannelsData: WebsiteBehaviourChannelsModel;
  error?: string;
}

// action type 
export interface getWebsiteBehaviourChannelsRequest {
  type: string;
}

export interface getWebsiteBehaviourChannelsSuccess {
  type: string;
  websiteBehaviourChannelsData: WebsiteBehaviourChannelsModel;
}

export interface getWebsiteBehaviourChannelsFailure {
  type: string;
  error?: string;
}