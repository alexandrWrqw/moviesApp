import './MovieGenres.css';

import { Component } from 'react';

import PropTypes from 'prop-types';
import { Flex, Tag } from 'antd';

import MoviesServiceContext from '../../services/MoviesServiceContext';

export default class MovieGenres extends Component {
  getGenres = array => {
    const { genresId } = this.props;
    const resultGenres = [];

    if (genresId.length === 0) {
      resultGenres.push('Unknown genre');
    }

    genresId.forEach(id => {
      array.forEach(obj =>
        obj.id === id ? resultGenres.push(obj.name) : null
      );
    });

    return resultGenres;
  };

  render() {
    const MovieService = this.context;
    let idx = 1;

    return (
      <Flex className="genres-list" wrap="wrap" gap="small">
        {this.getGenres(MovieService.allGenres).map(genre => (
          <Tag key={idx++} className="genre">
            {genre}
          </Tag>
        ))}
      </Flex>
    );
  }
}

MovieGenres.contextType = MoviesServiceContext;

MovieGenres.propTypes = {
  genresId: PropTypes.array,
};

MovieGenres.defaultProps = {
  genresId: [],
};
