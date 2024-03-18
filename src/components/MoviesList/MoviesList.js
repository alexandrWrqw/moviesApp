import './MoviesList.css';

import PropTypes from 'prop-types';

import MoviesListItem from '../MoviesListItem/MoviesListItem';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import NoResultsMessage from '../NoResultsMessage/NoResultsMessage';

function MoviesList({ movies, loading, error, label }) {
  const noResults =
    movies.length === 0 && label.trim() !== '' && loading === false;

  const spinner = loading ? <LoadingSpinner /> : null;

  const content = !(loading || error)
    ? movies.map(movie => (
        <MoviesListItem
          key={movie.id}
          title={movie.title}
          date={movie.release_date}
          description={movie.overview}
          imagePath={movie.poster_path}
        />
      ))
    : null;

  const errorMessage = error && !loading ? <ErrorMessage /> : null;

  const noResultsMessage =
    noResults && !error ? <NoResultsMessage label={label} /> : null;

  return (
    <ul className="reset-list grid">
      {spinner}
      {content}
      {errorMessage}
      {noResultsMessage}
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
