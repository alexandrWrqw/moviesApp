import './MoviesList.css';

import { Component } from 'react';

import PropTypes from 'prop-types';
import { Flex, Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import MoviesListItem from '../MoviesListItem/MoviesListItem';

export default class MoviesList extends Component {
  maxId = 1;

  render() {
    const { movies, loading, error } = this.props;

    const hasData = !(loading || error);

    const spinner = loading ? (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 44 }} spin />} />
    ) : null;

    const content = hasData
      ? movies.map(movie => (
          <MoviesListItem
            key={this.maxId++}
            title={movie.title}
            date={movie.release_date}
            description={movie.overview}
          />
        ))
      : null;

    const errorMessage = error ? (
      <Alert
        style={{ whiteSpace: 'pre-line' }}
        message="Error"
        description={`Access to the list of films is temporarily unavailable :(
          Try turning it on VPN or reload the page. 
          If this doesn’t help, then we are already working on the problem!`}
        type="error"
        showIcon
      />
    ) : null;

    return (
      <ul className="reset-list">
        <Flex horizontal="true" wrap="wrap" gap="large" justify="center">
          {spinner}
          {content}
          {errorMessage}
        </Flex>
      </ul>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

MoviesList.defaultProps = {
  movies: [],
  loading: false,
  error: false,
};
