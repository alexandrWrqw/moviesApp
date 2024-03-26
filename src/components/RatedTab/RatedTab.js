import { Component } from 'react';

import PropTypes from 'prop-types';
import { Pagination } from 'antd';

import MoviesServiceContext from '../../services/MoviesServiceContext';
import MoviesList from '../MoviesList/MoviesList';

export default class RatedTab extends Component {
  constructor() {
    super();

    this.state = {
      ratedMovies: [],
      page: 1,
      totalPages: null,
      totalMovies: null,
      hasRatedMovies: false,
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.getRatedMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;

    if (page !== prevState.page) {
      this.getRatedMovies();
    }
  }

  getRatedMovies = () => {
    const { page } = this.state;
    const MovieService = this.context;

    MovieService.getRatedMoviesData(page)
      .then(res => {
        if (res.status_code === 34) {
          this.onNoRatedMovies();
        } else {
          this.saveRatedMovies(res);
        }
      })
      .catch(this.onErrorRatedMovies);
  };

  onNoRatedMovies = () => {
    this.setState({ hasRatedMovies: false, loading: false });
  };

  onErrorRatedMovies = () => {
    this.setState({ error: true, loading: false });
  };

  saveRatedMovies = res => {
    this.setState({
      ratedMovies: res.results,
      totalPages: res.total_pages,
      totalMovies: res.total_results,
      loading: false,
      hasRatedMovies: true,
    });
  };

  onChangePage = nextPage => {
    this.setState({ page: nextPage, loading: true });
  };

  render() {
    const { saveStarRating, hasStarRating, getStarRating } = this.props;
    const {
      ratedMovies,
      loading,
      error,
      totalPages,
      totalMovies,
      page,
      hasRatedMovies,
    } = this.state;

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
        <MoviesList
          movies={ratedMovies}
          loading={loading}
          error={error}
          saveStarRating={saveStarRating}
          hasStarRating={hasStarRating}
          getStarRating={getStarRating}
        />
        {!loading && !error && hasRatedMovies ? pagination : null}
      </div>
    );
  }
}

RatedTab.contextType = MoviesServiceContext;

RatedTab.propTypes = {
  saveStarRating: PropTypes.func.isRequired,
  hasStarRating: PropTypes.func.isRequired,
  getStarRating: PropTypes.func.isRequired,
};
