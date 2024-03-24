import './MoviesListItem.css';

import PropTypes from 'prop-types';
import { Flex } from 'antd';

import MovieInfo from '../MovieInfo/MovieInfo';

import defaultImage from './noImage.png';

function MoviesListItem({
  movieId,
  title,
  date,
  description,
  imagePath,
  rating,
  genresId,
  saveStarRating,
  hasStarRating,
  getStarRating,
}) {
  const imageSrc = `https://image.tmdb.org/t/p/original${imagePath}`;

  return (
    <li className="movie">
      <Flex horizontal="true">
        <img
          className="image"
          width={180}
          height={280}
          src={imagePath == null ? defaultImage : imageSrc}
          alt=""
        />
        <MovieInfo
          movieId={movieId}
          title={title}
          date={date}
          description={description}
          rating={rating}
          genresId={genresId}
          saveStarRating={saveStarRating}
          hasStarRating={hasStarRating}
          getStarRating={getStarRating}
        />
      </Flex>
    </li>
  );
}

MoviesListItem.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  imagePath: PropTypes.string,
  rating: PropTypes.number,
  genresId: PropTypes.array,
  movieId: PropTypes.number.isRequired,
  saveStarRating: PropTypes.func.isRequired,
  hasStarRating: PropTypes.func.isRequired,
  getStarRating: PropTypes.func.isRequired,
};

MoviesListItem.defaultProps = {
  title: 'Unknown',
  date: '',
  description: '',
  imagePath: null,
  rating: null,
  genresId: [],
};

export default MoviesListItem;
