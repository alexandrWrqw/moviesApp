import './MovieGenres.css';

import PropTypes from 'prop-types';
import { Flex, Tag } from 'antd';

import MoviesServiceContext from '../../services/MoviesServiceContext';

function MovieGenres({ genresId }) {
  const getGenres = array => {
    let idx = 1;
    const resultGenres = [];

    if (genresId.length === 0) {
      resultGenres.push('Unknown genre');
    }

    genresId.forEach(id => {
      array.forEach(obj =>
        obj.id === id ? resultGenres.push(obj.name) : null
      );
    });

    return resultGenres.map(genre => (
      <Tag key={idx++} className="genre">
        {genre}
      </Tag>
    ));
  };

  return (
    <MoviesServiceContext.Consumer>
      {value => (
        <Flex className="genres-list" wrap="wrap" gap="small">
          {getGenres(value.allGenres)}
        </Flex>
      )}
    </MoviesServiceContext.Consumer>
  );
}

MovieGenres.propTypes = {
  genresId: PropTypes.array,
};

MovieGenres.defaultProps = {
  genresId: [],
};

export default MovieGenres;
