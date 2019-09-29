import { WebsiteTransactionsPillsType } from "../../constants/constants";

// initial state
export interface websiteTransactionsPillsSelectingState {
  isSelecting: boolean;
  selectedWebsiteTransactionsPillData: WebsiteTransactionsPillsType;
  error?: string;
}

// action type 
export interface selectWebsiteTransactionsPillsSelectingStart {
  type: string;
}

export interface selectWebsiteTransactionsPillsSelectingDone {
  type: string;
  selectedWebsiteTransactionsPillData: WebsiteTransactionsPillsType;
}

export interface selectWebsiteTransactionsPIllsSelectingFailure {
  type: string;
  error?: string;
}