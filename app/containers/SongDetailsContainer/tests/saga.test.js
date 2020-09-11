import songDetailsContainerSaga, { getSongSaga } from '../saga';
import { songDetailsContainerTypes } from '../reducer';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getSong } from '@app/services/songsApi';
import { apiResponseGenerator } from '@app/utils/testUtils';

describe('SongDetailsContainer saga test', () => {
  const generator = songDetailsContainerSaga();
  const songId = 1263856119;
  let getSongGenerator = getSongSaga({ songId });
  it('Should start task to watch for REQUEST_GET_SONG action', () => {
    expect(generator.next().value).toEqual(takeLatest(songDetailsContainerTypes.REQUEST_GET_SONG, getSongSaga));
  });

  it('should ensure that action FAILURE_GET_SONG is dispatched when the api call fails', () => {
    const res = getSongGenerator.next().value;
    expect(res).toEqual(call(getSong, songId));
    const errorResponse = { errorMessage: 'there was an error while fetching song data.' };
    expect(getSongGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: songDetailsContainerTypes.FAILURE_GET_SONG,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_SONG is dispatched when the api call succeeds', () => {
    getSongGenerator = getSongSaga({ songId });
    const res = getSongGenerator.next().value;
    expect(res).toEqual(call(getSong, songId));
    const songsResponse = {
      resultsCount: 1,
      results: [{ songId: songId }]
    };
    expect(getSongGenerator.next(apiResponseGenerator(true, songsResponse)).value).toEqual(
      put({
        type: songDetailsContainerTypes.SUCCESS_GET_SONG,
        data: songsResponse
      })
    );
  });
});
