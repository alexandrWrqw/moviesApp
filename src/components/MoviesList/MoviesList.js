import { Component } from 'react';
import './MoviesList.css';

import MoviesListItem from '../MoviesListItem/MoviesListItem';

export default class MoviesList extends Component {
  render() {
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
