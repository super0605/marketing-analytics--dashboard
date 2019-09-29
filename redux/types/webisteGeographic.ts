import { WebsiteGeographicModel } from "../../models";

// initial state
export interface websiteGeographicState {
  websiteGeographic: websiteGeographic
}
export interface websiteGeographic {
  loading: boolean;
  websiteGeographicData: WebsiteGeographicModel;
  error?: string;
}

// action type 
export interface getWebsiteGeographicRequest {
  type: string;
}

export interface getWebsiteGeographicSuccess {
  type: string;
  websiteGeographicData: WebsiteGeographicModel;
}

export interface getWebsiteGeographicFailure {
  type: string;
  error?: string;
}