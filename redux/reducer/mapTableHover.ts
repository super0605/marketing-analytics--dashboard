import * as iassign from 'immutable-assign';
import {
  mapTableHoverAction
} from '../constants';
import { MapAnalyticsData } from '../../constants/interfaces';


export interface MapTableHoveringStart {
  type: string;
}

export interface MapTableHoveringDoing {
  type: string;
  countryData: MapAnalyticsData;
}

export interface MapTableHoveringFailure {
  type: string;
  error?: string;
}

export type MapTableHoveringAction = MapTableHoveringStart | MapTableHoveringDoing | MapTableHoveringFailure;

export interface countryData {
  country: string;
  countryCode: string;
}
export interface mapTableHoverState {
  isHovering: boolean;
  countryData: MapAnalyticsData;
  error?: string;
}

const initialState: mapTableHoverState = {
  isHovering: false,
  countryData: {
    country: '',
    countryCode: '',
    revenue: 0,
    change: 0,
  }
}

const mapTableHoverReducer = (state = initialState, action: MapTableHoveringAction) => {
  switch (action.type) {
    case mapTableHoverAction.MAP_TABLE_HOVER_START:
      return iassign(
        state,
        state => state.isHovering,
        () => true,
      );
    case mapTableHoverAction.MAP_TABLE_HOVER_DOING:
      const mapTableHoverDoingAction: MapTableHoveringDoing = action as MapTableHoveringDoing;
      return iassign(
        state,
        (s) => {
          s.isHovering = false;
          s.countryData = mapTableHoverDoingAction && mapTableHoverDoingAction.countryData;

          return s;
        },
      );
    case mapTableHoverAction.MAP_TABLE_HOVER_FAILURE:
      const mapTableHoverFailureAction: MapTableHoveringFailure = action as MapTableHoveringFailure;
      return iassign(
        state,
        (s) => {
          s.isHovering = false;
          s.error = mapTableHoverFailureAction && mapTableHoverFailureAction.error;

          return s;
        },
      );
    default:
      return state;
  }
}

export default mapTableHoverReducer