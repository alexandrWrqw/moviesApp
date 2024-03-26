import './MoviesListItem.css';

import PropTypes from 'prop-types';
import { Flex } from 'antd';

import MovieInfo from '../MovieInfo/MovieInfo';

import defaultImage from './noImage.png';

function MoviesListItem({
  movie,
  saveStarRating,
  hasStarRating,
  getStarRating,
}) {
  const imageSrc = `https://image.tmdb.org/t/p/original${movie.poster_path}`;

  return (
    <li className="movie">
      <Flex horizontal="true" style={{ height: 'inherit' }}>
        <img
          className="image"
          src={movie.poster_path == null ? defaultImage : imageSrc}
          alt=""
        />
        <MovieInfo
          movie={movie}
          saveStarRating={saveStarRating}
          hasStarRating={hasStarRating}
          getStarRating={getStarRating}
        />
      </Flex>
    </li>
  );
}

MoviesListItem.propTypes = {
  movie: PropTypes.object,
  saveStarRating: PropTypes.func.isRequired,
  hasStarRating: PropTypes.func.isRequired,
  getStarRating: PropTypes.func.isRequired,
};

MoviesListItem.defaultProps = {
  movie: {},
};

export default MoviesListItem;
