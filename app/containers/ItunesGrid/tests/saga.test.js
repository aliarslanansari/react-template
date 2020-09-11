import itunesGridSaga, { getSongsSaga } from '../saga';
import { itunesGridTypes } from '../reducer';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getSongs } from '@app/services/songsApi';
import { apiResponseGenerator } from '@app/utils/testUtils';

describe('ItunesGrid saga test', () => {
  const generator = itunesGridSaga();
  const songName = 'adele';
  let getItunesSongsGenerator = getSongsSaga({ songName });
  it('Should start task to watch for REQUEST_GET_SONGS action', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesGridTypes.REQUEST_GET_SONGS, getSongsSaga));
  });

  it('should ensure that action FAILURE_GET_SONGS is dispatched when the api call fails', () => {
    const res = getItunesSongsGenerator.next().value;
    expect(res).toEqual(call(getSongs, songName));
    const errorResponse = { errorMessage: 'there was an error while fetching songs data.' };
    expect(getItunesSongsGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: itunesGridTypes.FAILURE_GET_SONGS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_SONGS is dispatched when the api call succeeds', () => {
    getItunesSongsGenerator = getSongsSaga({ songName });
    const res = getItunesSongsGenerator.next().value;
    expect(res).toEqual(call(getSongs, songName));
    const songsResponse = {
      resultsCount: 1,
      results: [{ songName: songName }]
    };
    expect(getItunesSongsGenerator.next(apiResponseGenerator(true, songsResponse)).value).toEqual(
      put({
        type: itunesGridTypes.SUCCESS_GET_SONGS,
        data: songsResponse
      })
    );
  });
});
