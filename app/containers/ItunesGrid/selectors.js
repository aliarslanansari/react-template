import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { get } from 'lodash';

/**
 * Direct selector to the itunesGrid state domain
 */

const selectItunesGridDomain = state => state.itunesGrid || initialState;

export const selectItunesGridContainer = () =>
  createSelector(
    selectItunesGridDomain,
    substate => substate
  );
export const selectSongsData = () =>
  createSelector(
    selectItunesGridDomain,
    substate => get(substate, 'songsData', null)
  );
export const selectSongsError = () =>
  createSelector(
    selectItunesGridDomain,
    substate => get(substate, 'songsError', null)
  );
export const selectSongName = () =>
  createSelector(
    selectItunesGridDomain,
    substate => get(substate, 'songName', null)
  );

export default selectItunesGridContainer;
