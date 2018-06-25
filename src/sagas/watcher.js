import { takeEvery, race, take, put } from 'redux-saga/effects';

import * as types from '../constants/actionTypes';
import {} from '../actions'; /* Import actions saga. */

// Watches for SEARCH_MEDIA_REQUEST action type asynchronously
export default function* root() {
  yield [
    // takeLatest(types.SEARCH_MEDIA_REQUEST, searchMediaSaga),
  ]
}
