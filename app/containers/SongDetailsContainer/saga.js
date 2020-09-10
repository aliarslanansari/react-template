import { takeLatest, call, put } from 'redux-saga/effects';
import { getSong } from '@app/services/songsApi';
import { songDetailsContainerTypes, songDetailsContainerCreators } from './reducer';

// Individual exports for testing
const { REQUEST_GET_SONG } = songDetailsContainerTypes;
const { successGetSong, failureGetSong } = songDetailsContainerCreators;

// Individual exports for testing
export function* getSongSaga(action) {
  const response = yield call(getSong, action.songId);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetSong(data));
  } else {
    yield put(failureGetSong(data));
  }
}

export default function* songDetailsContainerSaga() {
  yield takeLatest(REQUEST_GET_SONG, getSongSaga);
}
