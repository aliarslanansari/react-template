import { selectSongDetailsContainer, selectSongId, selectSongData, selectSongError } from '../selectors';

describe('SongDetails selector tests', () => {
  let mockedState;
  let songId;
  let songData;
  let songError;

  beforeEach(() => {
    songId = '';
    songData = { totalCount: 1, items: [{ songId }] };
    songError = 'There was some error while fetching the song details';

    mockedState = {
      songDetailsContainer: {
        songId,
        songData,
        songError
      }
    };
  });
  it('should select the song details state', () => {
    const songDetailsSelector = selectSongDetailsContainer();
    expect(songDetailsSelector(mockedState)).toEqual(mockedState.songDetailsContainer);
  });
  it('should select the songId', () => {
    const songSelector = selectSongId();
    expect(songSelector(mockedState)).toEqual(songId);
  });

  it('should select songData', () => {
    const songDataSelector = selectSongData();
    expect(songDataSelector(mockedState)).toEqual(songData);
  });

  it('should select the songError', () => {
    const songErrorSelector = selectSongError();
    expect(songErrorSelector(mockedState)).toEqual(songError);
  });
});
