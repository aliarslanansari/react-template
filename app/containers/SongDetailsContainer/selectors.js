import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { get } from 'lodash';
/**
 * Direct selector to the songDetailsContainer state domain
 */
const selectSongDetailsContainerDomain = state => state.songDetailsContainer || initialState;

export const selectSongDetailsContainer = () =>
  createSelector(
    selectSongDetailsContainerDomain,
    substate => substate
  );
export const selectSongData = () =>
  createSelector(
    selectSongDetailsContainerDomain,
    substate => get(substate, 'songData', null)
  );

export const selectSongError = () =>
  createSelector(
    selectSongDetailsContainerDomain,
    substate => get(substate, 'songError', null)
  );
export const selectSongId = () =>
  createSelector(
    selectSongDetailsContainerDomain,
    substate => get(substate, 'songId', null)
  );

export default selectSongDetailsContainer;
