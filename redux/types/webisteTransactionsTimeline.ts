import { WebsiteTransactionsTimelineModel } from "../../models";

// initial state
export interface websiteTransactionsTimelineState {
  websiteTransactionsTimeline: websiteTransactionsTimeline
}
export interface websiteTransactionsTimeline {
  loading: boolean;
  websiteTransactionsTimelineData: WebsiteTransactionsTimelineModel;
  error?: string;
}

// action type 
export interface getWebsiteTransactionsTimelineRequest {
  type: string;
}

export interface getWebsiteTransactionsTimelineSuccess {
  type: string;
  websiteTransactionsTimelineData: WebsiteTransactionsTimelineModel;
}

export interface getWebsiteTransactionsTimelineFailure {
  type: string;
  error?: string;
}