import './App.css';

import { Component } from 'react';

import { Offline } from 'react-detect-offline';
import { Input, Pagination, Tabs } from 'antd';
import debounce from 'lodash.debounce';

import MoviesList from '../MoviesList/MoviesList';
import MoviesService from '../../services/MoviesService';
import OfflineWarning from '../OfflineWarning/OfflineWarning';
import GenresContext from '../../services/GenresContext';

export default class App extends Component {
  moviesService = new MoviesService();

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

  componentDidMount() {
    this.getGenres();
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

    this.moviesService
      .getMoviesData(label, page)
      .then(res => this.onloadMovies(res))
      .catch(this.onErrorMovies);
  };

  getGenres = () => {
    this.moviesService.getGenresData().then(res => this.onloadGenres(res));
  };

  onloadMovies = res => {
    this.setState({
      movies: res.results,
      loading: false,
      totalMovies: res.total_results,
      totalPages: res.total_pages,
    });
  };

  onloadGenres = res => {
    this.genres = res.genres;
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
    this.setState({ page: nextPage });
  };

  render() {
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

    const searchTab = (
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
        />
        {!loading && !error ? pagination : null}
      </div>
    );

    const ratedTab = <div className="tab-container">content</div>;

    const tabs = [
      {
        key: '1',
        label: 'Search',
        children: searchTab,
      },

      {
        key: '2',
        label: 'Rated',
        children: ratedTab,
      },
    ];

    return (
      <>
        <Offline>
          <OfflineWarning />
        </Offline>

        <div className="container">
          <GenresContext.Provider value={this.genres}>
            <Tabs
              style={{ width: '100%' }}
              size="large"
              defaultActiveKey="1"
              items={tabs}
              centered
            />
          </GenresContext.Provider>
        </div>
      </>
    );
  }
}
