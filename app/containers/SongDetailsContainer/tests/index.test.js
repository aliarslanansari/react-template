/**
 *
 * Tests for SongDetailsContainer
 *
 */
import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { SongDetailsContainerTest as SongDetailsContainer } from '../index';

describe('<SongDetailsContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(
      <SongDetailsContainer match={{ params: { id: 123 } }} dispatchGetSong={submitSpy} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should dispatch dispatchGetSong when component renders', async () => {
    renderProvider(<SongDetailsContainer match={{ params: { id: 123 } }} dispatchGetSong={submitSpy} />);
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
