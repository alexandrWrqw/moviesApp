import './App.css';

import { Component } from 'react';

import { Offline } from 'react-detect-offline';
import { Input, Pagination } from 'antd';
import debounce from 'lodash.debounce';

import MoviesList from '../MoviesList/MoviesList';
import MoviesService from '../../services/MoviesService';
import OfflineWarning from '../OfflineWarning/OfflineWarning';

export default class App extends Component {
  moviesServices = new MoviesService();

  constructor() {
    super();

    this.state = {
      movies: [],
      label: '',
      page: 1,
      totalMoviesAmt: null,
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
    const { label, page } = this.state;

    if (label.trim() === '') {
      this.onClear();
      return;
    }

    this.moviesServices
      .getMoviesData(label, page)
      .then(res => this.onLoadingMovies(res))
      .catch(this.onErrorMovies);
  };

  onLoadingMovies = res => {
    this.setState({
      movies: res.results,
      loading: false,
      totalMoviesAmt: res.total_results,
    });
  };

  onErrorMovies = () => {
    this.setState({ error: true, loading: false });
  };

  onClear = () => {
    this.setState({
      movies: [],
      page: 1,
      totalMoviesAmt: null,
      loading: false,
      error: false,
    });
  };

  onChangeLabel = e => {
    this.setState({ label: e.target.value, loading: true });
  };

  onChangePage = nextPage => {
    this.setState({ page: nextPage });
  };

  render() {
    const { movies, loading, error, label, totalMoviesAmt, page } = this.state;

    const pagination =
      totalMoviesAmt > 1 ? (
        <Pagination
          defaultPageSize={20}
          current={page}
          onChange={this.onChangePage}
          total={totalMoviesAmt}
        />
      ) : null;

    return (
      <>
        <Offline>
          <OfflineWarning />
        </Offline>

        <div className="container">
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
          />
          {pagination}
        </div>
      </>
    );
  }
}
