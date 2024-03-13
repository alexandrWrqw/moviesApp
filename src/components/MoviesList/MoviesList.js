import { Component } from 'react';
import './MoviesList.css';
import { Flex } from 'antd';

import MoviesListItem from '../MoviesListItem/MoviesListItem';
// import MoviesService from '../../services/MoviesService';

export default class MoviesList extends Component {
  // moviesServices = new MoviesService();

  // constructor() {
  //   super();

  //   this.state = {
  //     movies: [],
  //   };

  //   this.getMovies();
  // }

  // getMovies = () => {
  //   this.moviesServices.getMoviesData().then(res => {
  //     this.setState({ movies: res });
  //   });
  // };

  render() {
    // const { movies } = this.state;
    // eslint-disable-next-line no-console
    // console.log(movies);

    return (
      <Flex className="reset-list" horizontal="true" wrap="wrap" gap="middle">
        <MoviesListItem />
        <MoviesListItem />
        <MoviesListItem />
        <MoviesListItem />
        <MoviesListItem />
      </Flex>
    );
  }
}
