import './MoviesList.css';

import PropTypes from 'prop-types';
import { Flex, Alert } from 'antd';

import MoviesListItem from '../MoviesListItem/MoviesListItem';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function MoviesList({ movies, loading, error, label }) {
  const hasData = !(loading || error);
  const noResults = movies.length === 0 && label !== '' && loading === false;

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

  const nullResults = noResults ? (
    <Alert
      message={`Movies with the title '${label}' not found`}
      type="warning"
    />
  ) : null;

  return (
    <ul className="reset-list">
      <Flex horizontal="true" wrap="wrap" gap="large" justify="center">
        {spinner}
        {content}
        {errorMessage}
        {nullResults}
      </Flex>
    </ul>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  label: PropTypes.string,
};

MoviesList.defaultProps = {
  movies: [],
  loading: false,
  error: false,
  label: '',
};

export default MoviesList;
