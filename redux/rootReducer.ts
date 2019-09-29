import { combineReducers, ReducersMapObject} from 'redux';

// reducers
import authReducer from './reducer/auth';
import testReducer, { TestState  } from './reducer/test';
import getMyAccountReducer, {} from './reducer/getMyAccount';
import mapTableHoverReducer, { mapTableHoverState  } from './reducer/mapTableHover';
import usersReducer from './reducer/users';
import inviteUserReducer from './reducer/inviteUser';
import brandsReducer from './reducer/brands';
import lookupReducer from './reducer/lookup';
import websiteSummaryReducer from './reducer/websiteSummary';
import websiteBehaviourChannelsReducer from './reducer/websiteBehaviourChannels';
import websiteBehaviourTimelineReducer from './reducer/websiteBehaviourTimeline';
import websiteTransactionsSummaryReducer from './reducer/websiteTransactionsSummary';
import websiteTransactionsTimelineReducer from './reducer/webisteTransactionsTimeline';
import websiteTransactionsChannelReducer from './reducer/websiteTransactionsChannel';
import websiteTransactionsProductsReducer from './reducer/websiteTransactionsProducts';
import websiteGeographicReducer from './reducer/webisteGeographic';
import globalFiltersReducer from './reducer/globalFilters';
import websiteBehaviourPillsSelectingReducer from './reducer/websiteBehaviourPillsSelecting';
import websiteTransactionsPillsSelectingReducer from './reducer/websiteTransactionsPillsSelecting';

// state type
import { AuthState } from './types/auth';
import { GetMyAccountState } from './types/getMyAccount'; 
import { usersState } from './types/users'; 
import { inviteUserState } from './types/inviteUser';
import { brandsState } from './types/brands';
import { lookupState } from './types/lookup';
import { websiteSummaryState } from './types/websiteSummary';
import { websiteBehaviourChannelsState } from './types/websiteBehaviourChannels';
import { websiteBehaviourTimelineState } from './types/websiteBehaviourTimeline';
import { websiteTransactionsSummaryState } from './types/websiteTransactionsSummary';
import { websiteTransactionsTimelineState } from './types/webisteTransactionsTimeline';
import { websiteTransactionsChannelState } from './types/websiteTransactionChannel';
import { websiteTransactionsProductsState } from './types/websiteTransactionsProducts';
import { websiteGeographicState } from './types/webisteGeographic';
import { globalFiltersState } from './types/globalFilters';
import { websiteBehaviourPillsSelectingState } from './types/websiteBehaviourPillsSelecting';
import { websiteTransactionsPillsSelectingState } from './types/websiteTransactionsPillsSelecting';

export interface GlobalState {
  auth: AuthState;
  test: TestState;
  mapTableHover: mapTableHoverState;
  myAccount: GetMyAccountState;
  users: usersState;
  invitedUser: inviteUserState;
  brandsState: brandsState;
  lookupState: lookupState;
  websiteSummaryState: websiteSummaryState;
  websiteBehaviourChannelsState: websiteBehaviourChannelsState;
  websiteBehaviourTimelineState: websiteBehaviourTimelineState;
  websiteTransactionsSummaryState: websiteTransactionsSummaryState;
  websiteTransactionsTimelineState: websiteTransactionsTimelineState;
  websiteTransactionsChannelState: websiteTransactionsChannelState;
  websiteTransactionsProductsState: websiteTransactionsProductsState;
  websiteGeographicState: websiteGeographicState;
  globalFiltersState: globalFiltersState;
  websiteBehaviourPillsSelectingState: websiteBehaviourPillsSelectingState;
  websiteTransactionsPillsSelectingState: websiteTransactionsPillsSelectingState;
}

const reducerMap: ReducersMapObject = {
  auth: authReducer,
  test: testReducer,
  myAccount: getMyAccountReducer,
  mapTableHover: mapTableHoverReducer,
  users: usersReducer,
  invitedUser: inviteUserReducer,
  brandsState: brandsReducer,
  lookupState: lookupReducer,
  websiteSummaryState: websiteSummaryReducer,
  websiteBehaviourChannelsState: websiteBehaviourChannelsReducer,
  websiteBehaviourTimelineState: websiteBehaviourTimelineReducer,
  websiteTransactionsSummaryState: websiteTransactionsSummaryReducer,
  websiteTransactionsTimelineState: websiteTransactionsTimelineReducer,
  websiteTransactionsChannelState: websiteTransactionsChannelReducer,
  websiteTransactionsProductsState: websiteTransactionsProductsReducer,
  websiteGeographicState: websiteGeographicReducer,
  globalFiltersState: globalFiltersReducer,
  websiteBehaviourPillsSelectingState: websiteBehaviourPillsSelectingReducer,
  websiteTransactionsPillsSelectingState: websiteTransactionsPillsSelectingReducer,
};

const rootReducer = combineReducers<GlobalState>(reducerMap);

export default rootReducer;