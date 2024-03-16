import './MoviesList.css';

import PropTypes from 'prop-types';
import { Flex } from 'antd';

import MoviesListItem from '../MoviesListItem/MoviesListItem';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function MoviesList({ movies, loading, error }) {
  const hasData = !(loading || error);

  const spinner = loading ? <LoadingSpinner /> : null;

  const content = hasData
    ? movies.map(movie => (
        <MoviesListItem
          key={movie.id}
          title={movie.title}
          date={movie.release_date}
          description={movie.overview}
        />
      ))
    : null;

  const errorMessage = error ? <ErrorMessage /> : null;

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

export default MoviesList;
