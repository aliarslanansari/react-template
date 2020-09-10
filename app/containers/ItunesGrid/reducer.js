/*
 *
 * ItunesGrid reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const initialState = { songName: null, songsData: {}, songsError: null };

export const { Types: itunesGridTypes, Creators: itunesGridCreators } = createActions({
  requestGetSongs: ['songName'],
  successGetSongs: ['data'],
  failureGetSongs: ['error'],
  clearSongs: []
});

/* eslint-disable default-case, no-param-reassign */
export const itunesGridReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case itunesGridTypes.REQUEST_GET_SONGS:
        draft.songName = action.songName;
        break;
      case itunesGridTypes.SUCCESS_GET_SONGS:
        draft.songsData = action.data;
        break;
      case itunesGridTypes.FAILURE_GET_SONGS:
        draft.songsError = get(action.error, 'message', 'something_went_wrong');
        break;
      case itunesGridTypes.CLEAR_SONGS:
        return initialState;
    }
  });

export default itunesGridReducer;
