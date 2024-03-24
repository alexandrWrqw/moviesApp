import { Component } from 'react';

import PropTypes from 'prop-types';

import MoviesServiceContext from '../../services/MoviesServiceContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MoviesListItem from '../MoviesListItem/MoviesListItem';

export default class RatedTab extends Component {
  constructor() {
    super();

    this.state = {
      ratedMovies: [],
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.getRatedMovies();
  }

  getRatedMovies = () => {
    const MovieService = this.context;

    MovieService.getRatedMoviesData()
      .then(res => this.saveRatedMovies(res))
      .catch(() => this.onErrorRatedMovies());
  };

  onErrorRatedMovies = () => {
    this.setState({ error: true });
  };

  saveRatedMovies = res => {
    this.setState({ ratedMovies: res.results, loading: false });
  };

  render() {
    const { saveStarRating, hasStarRating, getStarRating } = this.props;
    const { ratedMovies, loading, error } = this.state;

    const hasRatedMovies = ratedMovies.length !== 0 && !(loading && error);

    const loadingSpinner = loading ? <LoadingSpinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = hasRatedMovies
      ? ratedMovies.map(ratedMovie => (
          <MoviesListItem
            key={ratedMovie.id}
            movieId={ratedMovie.id}
            title={ratedMovie.title}
            date={ratedMovie.release_date}
            description={ratedMovie.overview}
            imagePath={ratedMovie.poster_path}
            rating={ratedMovie.vote_average}
            genresId={ratedMovie.genre_ids}
            saveStarRating={saveStarRating}
            hasStarRating={hasStarRating}
            getStarRating={getStarRating}
          />
        ))
      : null;

    return (
      // <div className="tab-container">
      <ul
        className={
          loading || error || hasRatedMovies ? 'reset-list' : 'reset-list grid'
        }
      >
        {loadingSpinner}
        {errorMessage}
        {content}
      </ul>
      // </div>
    );
  }
}

RatedTab.propTypes = {
  saveStarRating: PropTypes.func.isRequired,
  hasStarRating: PropTypes.func.isRequired,
  getStarRating: PropTypes.func.isRequired,
};

RatedTab.contextType = MoviesServiceContext;
