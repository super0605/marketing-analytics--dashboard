import { all } from 'redux-saga/effects';
import { authSaga } from './sagas/auth';
import { testSaga } from './sagas/test';
import { getMyAccountSaga } from './sagas/getMyAccount';
import { mapTableHoverSaga } from './sagas/mapTableHover';
import { usersSaga } from './sagas/users';
import { inviteUserSaga } from './sagas/inviteUser';
import { brandsSaga } from './sagas/brands';
import { lookupSaga } from './sagas/lookup';
import { websiteSummarySaga } from './sagas/websiteSummary';
import { websiteBehaviourChannelsSaga } from './sagas/websiteBehaviourChannels';
import { websiteBehaviourTimelineSaga } from './sagas/websiteBehaviourTimeline';
import { websiteTransactionsSummarySaga } from './sagas/websiteTransactionsSummary';
import { websiteTransactionsTimelineSaga } from './sagas/webisteTransactionsTimeline';
import { websiteTransactionsChannelSaga } from './sagas/websiteTransactionsChannel';
import { websiteTransactionsProductsSaga } from './sagas/websiteTransactionsProducts';
import { websiteGeographicSaga } from './sagas/webisteGeographic';
import { globalFiltersSaga } from './sagas/globalFilters';
import { websiteBehaviourPillsSelectingSaga } from './sagas/websiteBehaviourPillsSelecting';
import { websiteTransactionsPillsSelectingSaga } from './sagas/websiteTransactionsPillsSelecting';

export default function* rootSaga() {
  yield all([
    authSaga(),
    testSaga(),
    getMyAccountSaga(),
    mapTableHoverSaga(),
    usersSaga(),
    inviteUserSaga(),
    brandsSaga(),
    lookupSaga(),
    websiteSummarySaga(),
    websiteBehaviourChannelsSaga(),
    websiteBehaviourTimelineSaga(),
    websiteTransactionsSummarySaga(),
    websiteTransactionsTimelineSaga(),
    websiteTransactionsChannelSaga(),
    websiteTransactionsProductsSaga(),
    websiteGeographicSaga(),
    globalFiltersSaga(),
    websiteBehaviourPillsSelectingSaga(),
    websiteTransactionsPillsSelectingSaga(),
  ]);
}