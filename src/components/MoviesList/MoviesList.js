import { Component } from 'react';
import './MoviesList.css';

import MoviesListItem from '../MoviesListItem/MoviesListItem';
import MoviesService from '../../services/MoviesService';

export default class MoviesList extends Component {
  moviesServices = new MoviesService();

  constructor() {
    super();

    this.state = {
      movies: [],
    };

    this.getMovies();
  }

  getMovies = () => {
    this.moviesServices.getMoviesData().then(res => {
      this.setState({ movies: res });
    });
  };

  render() {
    const { movies } = this.state;
    // eslint-disable-next-line no-console
    console.log(movies);

    return (
      <ul className="movies-list">
        <MoviesListItem />
        <MoviesListItem />
        <MoviesListItem />
        <MoviesListItem />
      </ul>
    );
  }
}
