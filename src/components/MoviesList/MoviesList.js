import { Component } from 'react';

import './MoviesList.css';

import { Flex } from 'antd';

import MoviesListItem from '../MoviesListItem/MoviesListItem';
import MoviesService from '../../services/MoviesService';

export default class MoviesList extends Component {
  moviesServices = new MoviesService();

  maxId = 1;

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

    return (
      <Flex className="reset-list" horizontal="true" wrap="wrap" gap="middle">
        {movies.map(movie => (
          <MoviesListItem
            key={this.maxId++}
            title={movie.title}
            date={movie.release_date}
            description={movie.overview}
          />
        ))}
      </Flex>
    );
  }
}
