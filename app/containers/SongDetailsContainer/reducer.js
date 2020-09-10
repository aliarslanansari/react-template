/*
 *
 * SongDetailsContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import { get } from 'lodash';

export const initialState = { songId: null, songData: [], songError: null };

export const { Types: songDetailsContainerTypes, Creators: songDetailsContainerCreators } = createActions({
  requestGetSong: ['songId'],
  successGetSong: ['data'],
  failureGetSong: ['error'],
  clearGetSong: []
});

/* eslint-disable default-case, no-param-reassign */
export const songDetailsContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case songDetailsContainerTypes.REQUEST_GET_SONG:
        draft.songId = action.songId;
        break;
      case songDetailsContainerTypes.SUCCESS_GET_SONG:
        draft.songData = action.data;
        break;
      case songDetailsContainerTypes.FAILURE_GET_SONG:
        draft.songData = get(action.error, 'message', 'something_went_wrong');
        break;
      case songDetailsContainerTypes.CLEAR_GET_SONG:
        return initialState;
      default:
        return state;
    }
  });

export default songDetailsContainerReducer;
