import { itunesContainerTypes, initialState, itunesContainerReducer } from '../reducer';

describe('actions', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(itunesContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type REQUEST_GET_ITUNES_SONGS is dispatched', () => {
    const songName = 'Love the way you lie';
    const expectedResult = { ...state, songName };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.REQUEST_GET_ITUNES_SONGS,
        songName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the song data is present and isLoading = false when SUCCESS_GET_ITUNES_SONGS is dispatched', () => {
    const data = { name: 'Love the way you lie' };
    const expectedResult = { ...state, songsData: data };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.SUCCESS_GET_ITUNES_SONGS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the failureItunesSongs message has some data and isLoading = false when FAILURE_GET_ITUNES_SONGS is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, songsError: error };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.FAILURE_GET_ITUNES_SONGS,
        error
      })
    ).toEqual(expectedResult);
  });
});
