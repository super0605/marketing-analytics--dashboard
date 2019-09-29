import { WebsiteTransactionsProductsModel } from "../../models";

// initial state
export interface websiteTransactionsProductsState {
  websiteTransactionsProducts: websiteTransactionsProducts
}
export interface websiteTransactionsProducts {
  loading: boolean;
  websiteTransactionsProductsData: WebsiteTransactionsProductsModel;
  error?: string;
}

// action type 
export interface getWebsiteTransactionsProductsRequest {
  type: string;
}

export interface getWebsiteTransactionsProductsSuccess {
  type: string;
  websiteTransactionsProductsData: WebsiteTransactionsProductsModel;
}

export interface getWebsiteTransactionsProductsFailure {
  type: string;
  error?: string;
}