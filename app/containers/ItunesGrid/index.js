/**
 *
 * ItunesGrid
 *
 */

import React, { useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Row, Col, Input, Card, Skeleton } from 'antd';
import T from '@components/T';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import { useInjectSaga } from '@utils/injectSaga';
import For from '@app/components/For/index';
import { injectIntl } from 'react-intl';

import { selectSongsData, selectSongsError, selectSongName } from './selectors';
import saga from './saga';
import { get, isEmpty, debounce } from 'lodash';
import { itunesGridCreators } from './reducer';
import { Link } from 'react-router-dom';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin-bottom: 10px;
    min-width: 200px;
  }
`;

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${props => props.maxwidth}px;

    margin: 0 20px;
    padding: ${props => props.padding}px;
    align-items: center;
  }
`;

export function ItunesGrid({
  songsData,
  songsError,
  songName,
  dispatchGetSongs,
  dispatchClearSongs,
  maxwidth,
  padding,
  intl
}) {
  useInjectSaga({ key: 'itunesGrid', saga });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const songs = get(songsData, 'results', null) || songsError;
    if (loading && songs) {
      setLoading(false);
    }
  }, [songsData]);

  const handleOnChange = songName => {
    if (!isEmpty(songName)) {
      dispatchGetSongs(songName);
      setLoading(true);
    } else {
      dispatchClearSongs();
    }
  };
  const debounceHandleOnChange = debounce(handleOnChange, 200);
  const results = get(songsData, 'results', []);

  const renderSongsGrid = () => {
    return (
      <Skeleton active loading={loading}>
        <For
          of={results}
          ParentComponent={props => <Row style={{ width: '100%' }} {...props} gutter={[16, 16]} />}
          renderItem={(item, index) => {
            return (
              <Col xs={12} sm={12} md={8} lg={6} xl={4}>
                <Link to={'/itunes-grid/song/' + item.trackId}>
                  <CustomCard
                    hoverable
                    cover={<img alt={item.trackName} style={{ height: 200 }} src={item.artworkUrl100} />}
                    maxwidth={maxwidth}
                  >
                    <T id="song_name" values={{ name: item.trackName }} />
                    <T id="song_artist" values={{ fullName: item.artistName }} />
                  </CustomCard>
                </Link>
              </Col>
            );
          }}
        />
      </Skeleton>
    );
  };

  const renderSongsErrorState = () => {
    let songError;
    if (songsError) {
      songError = songsError;
    } else if (!get(songsData, 'resultCount', 0)) {
      songError = 'song_search_default';
    }
    return (
      !loading &&
      songError && (
        <CustomCard>
          <T id={songError} />
        </CustomCard>
      )
    );
  };

  return (
    <Container>
      <Helmet>
        <title>ItunesGrid</title>
        <meta name="description" content="Itunes Music Streaming App" />
      </Helmet>
      <Search
        type="text"
        data-testid="search-bar"
        defaultValue={songName}
        onChange={e => debounceHandleOnChange(e.target.value)}
        onSearch={value => debounceHandleOnChange(value)}
        style={{ width: 500, marginBottom: 10, marginTop: 10 }}
      />
      {renderSongsGrid()}
      {renderSongsErrorState()}
    </Container>
  );
}

ItunesGrid.propTypes = {
  dispatchGetSongs: PropTypes.func,
  dispatchClearSongs: PropTypes.func,
  intl: PropTypes.object,
  songsData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  songsError: PropTypes.string,
  songName: PropTypes.string,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

const mapStateToProps = createStructuredSelector({
  songsData: selectSongsData(),
  songsError: selectSongsError(),
  songName: selectSongName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetSongs, clearSongs } = itunesGridCreators;
  return {
    dispatchGetSongs: songName => dispatch(requestGetSongs(songName)),
    dispatchClearSongs: () => dispatch(clearSongs())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  injectIntl,
  memo,
  withConnect
)(ItunesGrid);

export const ItunesGridTest = compose(injectIntl)(ItunesGrid);
