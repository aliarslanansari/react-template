import { selectItunesGridContainer, selectSongName, selectSongsData, selectSongsError } from '../selectors';

describe('ItunesGrid selector tests', () => {
  let mockedState;
  let songName;
  let songsData;
  let songsError;

  beforeEach(() => {
    songName = '';
    songsData = { totalCount: 1, items: [{ songName }] };
    songsError = 'There was some error while fetching the songs details';

    mockedState = {
      itunesGrid: {
        songName,
        songsData,
        songsError
      }
    };
  });
  it('should select the itunesGrid state', () => {
    const itunesGridSelector = selectItunesGridContainer();
    expect(itunesGridSelector(mockedState)).toEqual(mockedState.itunesGrid);
  });
  it('should select the songName', () => {
    const songSelector = selectSongName();
    expect(songSelector(mockedState)).toEqual(songName);
  });

  it('should select songData', () => {
    const songsDataSelector = selectSongsData();
    expect(songsDataSelector(mockedState)).toEqual(songsData);
  });

  it('should select the songsError', () => {
    const songsErrorSelector = selectSongsError();
    expect(songsErrorSelector(mockedState)).toEqual(songsError);
  });
});
