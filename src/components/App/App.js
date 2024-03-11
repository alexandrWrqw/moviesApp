import { Component } from 'react';
import './App.css';

import MoviesList from '../MoviesList/MoviesList';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <MoviesList />
      </div>
    );
  }
}
