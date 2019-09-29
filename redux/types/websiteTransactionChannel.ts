import { WebsiteTransactionsChannelModel } from "../../models";

// initial state
export interface websiteTransactionsChannelState {
  websiteTransactionsChannel: websiteTransactionsChannel
}
export interface websiteTransactionsChannel {
  loading: boolean;
  websiteTransactionsChannelData: WebsiteTransactionsChannelModel;
  error?: string;
}

// action type 
export interface getWebsiteTransactionsChannelRequest {
  type: string;
}

export interface getWebsiteTransactionsChannelSuccess {
  type: string;
  websiteTransactionsChannelData: WebsiteTransactionsChannelModel;
}

export interface getWebsiteTransactionsChannelFailure {
  type: string;
  error?: string;
}