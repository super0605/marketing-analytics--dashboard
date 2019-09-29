import { WebsiteSummaryModel, WebsiteSummariesModel } from "../../models";

// initial state
export interface websiteSummaryState {
  websiteSummary: websiteSummary
}
export interface websiteSummary {
  loading: boolean;
  websiteSummaryData: WebsiteSummariesModel;
  error?: string;
}

// action type 
export interface getWebsiteSummaryRequest {
  type: string;
}

export interface getWebsiteSummarySuccess {
  type: string;
  websiteSummaryData: WebsiteSummariesModel;
}

export interface getWebsiteSummaryFailure {
  type: string;
  error?: string;
}