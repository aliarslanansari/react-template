/**
 *
 * SongDetailsContainer
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import saga from './saga';
import { Image, Skeleton } from 'antd';
import { selectSongData, selectSongError } from './selectors';
import { songDetailsContainerCreators } from './reducer';
import { get } from 'lodash';
import styled from 'styled-components';
import ReactAudioPlayer from 'react-audio-player';

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    padding: 10px;
    align-items: center;
  }
`;
const Title = styled.p`
  && {
    color: #471717;
    font-size: 1.5rem;
    margin: 10px auto;
  }
`;
const SubTitle = styled.p`
  && {
    color: #471717;
    font-size: 1rem;
    margin: 10px auto;
  }
`;

export function SongDetailsContainer({ dispatchGetSong, match, songData, songError }) {
  useInjectSaga({ key: 'songDetailsContainer', saga });
  const songId = match.params.id;
  let songErr = false;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (songId) {
      dispatchGetSong(songId);
    }
  }, []);

  useEffect(() => {
    const loaded = get(songData, 'results', null);
    if (loaded && loading) {
      setLoading(false);
    }
  }, [songData]);

  const renderSongDetails = () => {
    return !loading && !songErr ? (
      <div>
        <Title>{songData?.results[0]?.trackName}</Title>
        <Image width={200} src={songData?.results[0]?.artworkUrl100} />
        <SubTitle>Collection Name: {songData?.results[0]?.collectionName}</SubTitle>
        <SubTitle>Artist Name: {songData?.results[0]?.artistName}</SubTitle>
        <SubTitle>Release Year: {songData?.results[0]?.releaseDate.substring(0, 4)}</SubTitle>
        <ReactAudioPlayer src={songData?.results[0]?.previewUrl} controls />
      </div>
    ) : null;
  };
  const renderErrorState = () => {
    if (songError) {
      songErr = songError;
    } else if (!get(songData, 'resultCount', 0)) {
      songErr = 'Song Not Found';
    }
    return !loading && songErr && <Title>{songErr}</Title>;
  };

  return (
    <div>
      <Helmet>
        <title>{!loading ? songData?.results[0]?.trackName : 'Song Details'}</title>
        <meta name="description" content="Description of SongDetailsContainer" />
      </Helmet>
      <Container>
        <Skeleton loading={loading} active>
          {renderErrorState()}
          {renderSongDetails()}
        </Skeleton>
      </Container>
    </div>
  );
}

SongDetailsContainer.propTypes = {
  songData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  songError: PropTypes.string,
  dispatchGetSong: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number
    })
  })
};

const mapStateToProps = createStructuredSelector({
  songData: selectSongData(),
  songError: selectSongError()
});

function mapDispatchToProps(dispatch) {
  const { requestGetSong } = songDetailsContainerCreators;
  return {
    dispatchGetSong: songId => dispatch(requestGetSong(songId))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(SongDetailsContainer);

export const SongDetailsContainerTest = compose(injectIntl)(SongDetailsContainer);
