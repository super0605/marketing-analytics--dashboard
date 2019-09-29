import { put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { 
  WebsiteTransactionsPillsSelectingAction,
} from '../constants';

function* websiteTransactionsPillsSelecting(action: AnyAction) {
  try {
    yield put({ type: WebsiteTransactionsPillsSelectingAction.SELECT_WEBSITE_TRANSACTIONS_PILLS_DONE, selectedWebsiteTransactionsPillData: action.payload });

  } catch (err) {
    yield put({ type: WebsiteTransactionsPillsSelectingAction.SELECT_WEBSITE_TRANSACTIONS_PILLS_FAILURE, err: err });
  }
}

export function* websiteTransactionsPillsSelectingSaga() {
  yield takeEvery(WebsiteTransactionsPillsSelectingAction.SELECT_WEBSITE_TRANSACTIONS_PILLS_START, websiteTransactionsPillsSelecting);
}