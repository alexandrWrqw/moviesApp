import './App.css';

import { Component } from 'react';

import { Offline } from 'react-detect-offline';

import MoviesList from '../MoviesList/MoviesList';
import MoviesService from '../../services/MoviesService';
import OfflineWarning from '../OfflineWarning/OfflineWarning';

export default class App extends Component {
  moviesServices = new MoviesService();

  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.moviesServices
      .getMoviesData()
      .then(this.onLoadingMovies)
      .catch(this.onErrorMovies);
  }

  onLoadingMovies = res => {
    this.setState({ movies: res, loading: false });
  };

  onErrorMovies = () => {
    this.setState({ error: true, loading: false });
  };

  render() {
    const { movies, loading, error } = this.state;

    return (
      <>
        <Offline>
          <OfflineWarning />
        </Offline>

        <div className="container">
          <MoviesList movies={movies} loading={loading} error={error} />
        </div>
      </>
    );
  }
}
