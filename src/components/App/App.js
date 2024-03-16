import './App.css';

import { Component } from 'react';

import { Offline } from 'react-detect-offline';
import { Input } from 'antd';
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
      loading: false,
      error: false,
      label: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { label } = this.state;

    if (label !== prevState.label) {
      this.getMovies();
    }
  }

  getMovies = () => {
    const { label } = this.state;

    if (label.trim() === '') {
      this.onClear();
      return;
    }

    this.moviesServices
      .getMoviesData(label)
      .then(res => this.onLoadingMovies(res))
      .catch(this.onErrorMovies);
  };

  onLoadingMovies = res => {
    this.setState({ movies: res, loading: false });
  };

  onErrorMovies = () => {
    this.setState({ error: true, loading: false });
  };

  onClear = () => {
    this.setState({ movies: [], loading: false, error: false });
  };

  onChangeLabel = e => {
    this.setState({ label: e.target.value, loading: true });
  };

  render() {
    const { movies, loading, error, label } = this.state;

    return (
      <>
        <Offline>
          <OfflineWarning />
        </Offline>

        <div className="container">
          <Input
            style={{ marginBottom: '25px' }}
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
        </div>
      </>
    );
  }
}
