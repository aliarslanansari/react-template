import itunesContainerSaga, { getItunesSongs } from '../saga';
import { itunesContainerTypes } from '../reducer';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getSongs } from '@app/services/songsApi';
import { apiResponseGenerator } from '@app/utils/testUtils';

describe('ItunesContainer saga test', () => {
  const generator = itunesContainerSaga();
  const songName = 'adele';
  let getItunesSongsGenerator = getItunesSongs({ songName });
  it('Should start task to watch for REQUEST_GET_ITUNES_SONGS action', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesContainerTypes.REQUEST_GET_ITUNES_SONGS, getItunesSongs));
  });

  it('should ensure that action FAILURE_GET_ITUNES_SONGS is dispatched when the api call fails', () => {
    const res = getItunesSongsGenerator.next().value;
    expect(res).toEqual(call(getSongs, songName));
    const errorResponse = { errorMessage: 'there was an error while fetching songs data.' };
    expect(getItunesSongsGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: itunesContainerTypes.FAILURE_GET_ITUNES_SONGS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_ITUNES_SONGS is dispatched when the api call succeeds', () => {
    getItunesSongsGenerator = getItunesSongs({ songName });
    const res = getItunesSongsGenerator.next().value;
    expect(res).toEqual(call(getSongs, songName));
    const songsResponse = {
      resultsCount: 1,
      results: [{ songName: songName }]
    };
    expect(getItunesSongsGenerator.next(apiResponseGenerator(true, songsResponse)).value).toEqual(
      put({
        type: itunesContainerTypes.SUCCESS_GET_ITUNES_SONGS,
        data: songsResponse
      })
    );
  });
});
