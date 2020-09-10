import { takeLatest, call, put } from 'redux-saga/effects';
import { itunesGridTypes, itunesGridCreators } from './reducer';
import { getSongs } from '@app/services/songsApi';

const { REQUEST_GET_SONGS } = itunesGridTypes;
const { successGetSongs, failureGetSongs } = itunesGridCreators;

// Individual exports for testing
export function* getSongsSaga(action) {
  const response = yield call(getSongs, action.songName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetSongs(data));
  } else {
    yield put(failureGetSongs(data));
  }
}

export default function* itunesGridSaga() {
  yield takeLatest(REQUEST_GET_SONGS, getSongsSaga);
}
