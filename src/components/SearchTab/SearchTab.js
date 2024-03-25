import { Component } from 'react';

import PropTypes from 'prop-types';
import { Input, Pagination } from 'antd';
import debounce from 'lodash.debounce';

import MoviesServiceContext from '../../services/MoviesServiceContext';
import MoviesList from '../MoviesList/MoviesList';

export default class SearchTab extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      label: '',
      page: 1,
      totalPages: null,
      totalMovies: null,
      loading: false,
      error: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { label, page } = this.state;

    if (label !== prevState.label) {
      this.getMovies();
    }

    if (page !== prevState.page) {
      this.getMovies();
    }
  }

  getMovies = () => {
    const MovieService = this.context;
    const { label, page } = this.state;

    if (label.trim() === '') {
      this.onClear();
      return;
    }

    MovieService.getMoviesData(label, page)
      .then(res => this.onloadMovies(res))
      .catch(this.onErrorMovies);
  };

  onloadMovies = res => {
    this.setState({
      movies: res.results,
      loading: false,
      totalMovies: res.total_results,
      totalPages: res.total_pages,
    });
  };

  onErrorMovies = () => {
    this.setState({ error: true, loading: false });
  };

  onClear = () => {
    this.setState({
      movies: [],
      page: 1,
      totalPages: null,
      totalMovies: null,
      loading: false,
      error: false,
    });
  };

  onChangeLabel = e => {
    this.setState({ label: e.target.value, loading: true });
  };

  onChangePage = nextPage => {
    this.setState({ page: nextPage, loading: true });
  };

  render() {
    const { saveStarRating, hasStarRating, getStarRating } = this.props;

    const { movies, loading, error, label, totalPages, page, totalMovies } =
      this.state;

    const pagination =
      totalPages > 1 ? (
        <Pagination
          defaultPageSize={20}
          current={page}
          onChange={this.onChangePage}
          total={totalMovies}
        />
      ) : null;

    return (
      <div className="tab-container">
        <Input
          placeholder="Type to search..."
          onChange={debounce(this.onChangeLabel, 550)}
          spellCheck="false"
        />
        <MoviesList
          movies={movies}
          loading={loading}
          error={error}
          label={label}
          saveStarRating={saveStarRating}
          hasStarRating={hasStarRating}
          getStarRating={getStarRating}
        />
        {!loading && !error ? pagination : null}
      </div>
    );
  }
}

SearchTab.contextType = MoviesServiceContext;

SearchTab.propTypes = {
  saveStarRating: PropTypes.func.isRequired,
  hasStarRating: PropTypes.func.isRequired,
  getStarRating: PropTypes.func.isRequired,
};
