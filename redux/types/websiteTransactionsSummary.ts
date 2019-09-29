import { WebsiteTransactionsSummariesModel } from "../../models";

// initial state
export interface websiteTransactionsSummaryState {
  websiteTransactionsSummary: websiteTransactionsSummary
}
export interface websiteTransactionsSummary {
  loading: boolean;
  websiteTransactionsSummaryData: WebsiteTransactionsSummariesModel;
  error?: string;
}

// action type 
export interface getWebsiteTransactionsSummaryRequest {
  type: string;
}

export interface getWebsiteTransactionsSummarySuccess {
  type: string;
  websiteTransactionsSummaryData: WebsiteTransactionsSummariesModel;
}

export interface getWebsiteTransactionsSummaryFailure {
  type: string;
  error?: string;
}