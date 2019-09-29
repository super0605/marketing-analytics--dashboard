import { globalFiltersQueryObjType, globalFiltersObjType } from "../../constants/interfaces";

// initial state
export interface globalFiltersState {
  isSelecting: boolean;
  globalFiltersData: GlobalFiltersDataType;
  error?: string;
}

export interface globalFiltersData {
  globalFilterQueriesObj: globalFiltersQueryObjType
  globalFiltersObj:globalFiltersObjType
}
export type GlobalFiltersDataType = globalFiltersData

// action type 
export interface selectGlobalFilterStart {
  type: string;
}

export interface selectGlobalFilterDone {
  type: string;
  globalFiltersData: GlobalFiltersDataType;
}

export interface selectGlobalFilterFailure {
  type: string;
  error?: string;
}