import { LookupListModel, LookupModel } from "../../models";

// initial state
export interface lookupState {
  lookup: lookupLists
  lookupByFilter: lookupByFilter
}
export interface lookupLists {
  loading: boolean;
  lookupList: LookupListModel;
  error?: string;
}
export interface lookupByFilter {
  loading: boolean,
  lookupByFilter: LookupModel[],
  error?: string,
}

// action type
export interface getLookupRequest {
  type: string;
}

export interface getLookupSuccess {
  type: string;
  lookupList: LookupListModel;
}

export interface getLookupFailure {
  type: string;
  error?: string;
}

export interface getLookupByFilterRequest {
  type: string;
}

export interface getLookupByFilterSuccess {
  type: string;
  lookupByFilter: LookupModel[];
}

export interface getLookupByFilterFailure {
  type: string;
  error?: string;
}