import { itunesGridTypes, initialState, itunesGridReducer } from '../reducer';

describe('actions', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(itunesGridReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type REQUEST_GET_SONGS is dispatched', () => {
    const songName = 'Love the way you lie';
    const expectedResult = { ...state, songName };
    expect(
      itunesGridReducer(state, {
        type: itunesGridTypes.REQUEST_GET_SONGS,
        songName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the song data is present and isLoading = false when SUCCESS_GET_SONGS is dispatched', () => {
    const data = { name: 'Love the way you lie' };
    const expectedResult = { ...state, songsData: data };
    expect(
      itunesGridReducer(state, {
        type: itunesGridTypes.SUCCESS_GET_SONGS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the failureItunesSongs message has some data and isLoading = false when FAILURE_GET_SONGS is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, songsError: error };
    expect(
      itunesGridReducer(state, {
        type: itunesGridTypes.FAILURE_GET_SONGS,
        error
      })
    ).toEqual(expectedResult);
  });
});
