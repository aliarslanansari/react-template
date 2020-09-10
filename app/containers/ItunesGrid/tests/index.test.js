/**
 *
 * Tests for ItunesGrid
 *
 */
import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { ItunesGridTest as ItunesGrid } from '../index';

describe('<ItunesGrid /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ItunesGrid dispatchGetSongs={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearSongs on empty change', async () => {
    const getSongsSpy = jest.fn();
    const clearSongsSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <ItunesGrid dispatchClearSongs={clearSongsSpy} dispatchGetSongs={getSongsSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getSongsSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearSongsSpy).toBeCalled();
  });

  it('should call dispatchGetSongs on change', async () => {
    const { getByTestId } = renderProvider(<ItunesGrid dispatchGetSongs={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some song' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
