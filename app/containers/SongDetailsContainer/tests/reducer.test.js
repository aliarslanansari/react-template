import { songDetailsContainerTypes, initialState, songDetailsContainerReducer } from '../reducer';

describe('actions', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(songDetailsContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type REQUEST_GET_SONG is dispatched', () => {
    const songId = 1263856119;
    const expectedResult = { ...state, songId };
    expect(
      songDetailsContainerReducer(state, {
        type: songDetailsContainerTypes.REQUEST_GET_SONG,
        songId
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the song data is present and isLoading = false when SUCCESS_GET_SONG is dispatched', () => {
    const data = { name: 'Love the way you lie' };
    const expectedResult = { ...state, songData: data };
    expect(
      songDetailsContainerReducer(state, {
        type: songDetailsContainerTypes.SUCCESS_GET_SONG,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the failureItunesSongs message has some data and isLoading = false when FAILURE_GET_SONG is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, songError: error };
    expect(
      songDetailsContainerReducer(state, {
        type: songDetailsContainerTypes.FAILURE_GET_SONG,
        error
      })
    ).toEqual(expectedResult);
  });
});
