import './App.css';

import { Component } from 'react';

import { Offline } from 'react-detect-offline';
import { Alert } from 'antd';
import Marquee from 'react-fast-marquee';

import MoviesList from '../MoviesList/MoviesList';
import MoviesService from '../../services/MoviesService';

export default class App extends Component {
  moviesServices = new MoviesService();

  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
      error: false,
    };

    this.getMovies();
  }

  onLoadingMovies = res => {
    this.setState({ movies: res, loading: false });
  };

  onErrorMovies = () => {
    this.setState({ error: true, loading: false });
  };

  getMovies = () => {
    this.moviesServices
      .getMoviesData()
      .then(this.onLoadingMovies)
      .catch(this.onErrorMovies);
  };

  render() {
    const { movies, loading, error } = this.state;

    const offlineWarning = (
      <Alert
        style={{ position: 'fixed', width: '100%', zIndex: '10' }}
        banner
        message={
          <Marquee pauseOnHover>
            No internet connection // It might be worth checking your connection
            VPN
          </Marquee>
        }
      />
    );

    return (
      <>
        <Offline>{offlineWarning}</Offline>
        <div className="container">
          <MoviesList movies={movies} loading={loading} error={error} />
        </div>
      </>
    );
  }
}
