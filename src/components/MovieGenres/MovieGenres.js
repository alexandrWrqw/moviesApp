import './MovieGenres.css';

import PropTypes from 'prop-types';
import { Flex, Tag } from 'antd';

import GenresContext from '../../services/GenresContext';

function MovieGenres({ genresId }) {
  const getGenres = array => {
    const resultGenres = [];

    if (genresId.length === 0) {
      resultGenres.push('Unknown genre');
    }

    genresId.forEach(id => {
      array.forEach(obj =>
        obj.id === id ? resultGenres.push(obj.name) : null
      );
    });

    return resultGenres.map(genre => <Tag className="genre">{genre}</Tag>);
  };

  return (
    <GenresContext.Consumer>
      {value => (
        <Flex className="genres-list" wrap="wrap" gap="small">
          {getGenres(value)}
        </Flex>
      )}
    </GenresContext.Consumer>
  );
}

MovieGenres.propTypes = {
  genresId: PropTypes.array,
};

MovieGenres.defaultProps = {
  genresId: [],
};

export default MovieGenres;
