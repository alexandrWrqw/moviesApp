import { Component } from 'react';
import './MoviesListItem.css';

import MovieGenres from '../MovieGenres/MovieGenres';

export default class MoviesListItem extends Component {
  render() {
    return (
      <li className="movie">
        <div className="image">Image</div>
        <div className="info">
          <h2>Title</h2>
          <span>Data</span>
          <MovieGenres />
          <p>Description</p>
        </div>
      </li>
    );
  }
}
