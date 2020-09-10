/**
 *
 * ItunesGrid
 *
 */

import React, { useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Row, Col, Input, Card } from 'antd';
import T from '@components/T';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import { useInjectSaga } from '@utils/injectSaga';
import For from '@app/components/For/index';
import { injectIntl } from 'react-intl';

import { selectItunesGridContainer, selectSongsData, selectSongsError, selectSongName } from './selectors';
import saga from './saga';
import { get, isEmpty, debounce } from 'lodash';
import { itunesGridCreators } from './reducer';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin-bottom: 10px;
  }
`;

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${props => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${props => props.padding}px;
  }
`;

export function ItunesGrid({
  songsData,
  songsError,
  songName,
  dispatchGetSongs,
  dispatchClearSongs,
  maxwidth,
  padding
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
  return (
    <Container>
      <Helmet>
        <title>ItunesGrid</title>
        <meta name="description" content="Itunes Music Streaming App" />
      </Helmet>
      <Search
        type="text"
        defaultValue={songName}
        onChange={e => debounceHandleOnChange(e.target.value)}
        onSearch={value => debounceHandleOnChange(value)}
        style={{ width: 200 }}
      />
      <p>{loading ? 'hello' : 'load'}</p>
      <For
        of={results}
        ParentComponent={props => <Row {...props} gutter={[16, 16]} />}
        renderItem={(item, index) => {
          return (
            <Col xs={12} sm={12} md={8} lg={6} xl={4}>
              <CustomCard cover={<img alt={item.trackName} src={item.artworkUrl100} />} maxwidth={maxwidth}>
                <T id="song_name" values={{ name: item.trackName }} />
                <T id="song_artist" values={{ fullName: item.artistName }} />
              </CustomCard>
            </Col>
          );
        }}
      />
      <T id={'itunes_grid'} />
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
  itunesGrid: selectItunesGridContainer(),
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
