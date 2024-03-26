import './MovieInfo.css';

import { Component } from 'react';

import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Rate, Flex } from 'antd';

import MoviesServiceContext from '../../services/MoviesServiceContext';
import MovieGenres from '../MovieGenres/MovieGenres';

export default class MovieInfo extends Component {
  constructor() {
    super();

    this.state = {
      starRating: 0,
    };

    this.limitText = (text, limit) => {
      let str = text.slice(0, limit);

      if (str.length < text.length) {
        const arr = str.split(' ');
        arr.splice(arr.length - 1, 1);
        str = arr.join(' ');

        return `${str} ...`;
      }

      return text;
    };

    this.ratingBorderColor = num => {
      let color = '#E90000';

      if (num >= 3 && num < 5) color = '#E97E00';
      if (num >= 5 && num < 7) color = '#E9D100';
      if (num >= 7) color = '#66E900';

      return color;
    };
  }

  componentDidMount() {
    const { movie, hasStarRating, getStarRating } = this.props;

    const hasStar = hasStarRating(movie.id);
    if (hasStar) this.onSynchStarRating(getStarRating(movie.id));
  }

  componentDidUpdate(prevProps, prevState) {
    const { movie } = this.props;
    const { starRating } = this.state;

    if (prevState.starRating !== starRating) {
      const MovieService = this.context;

      MovieService.addMovieRating(movie.id, starRating)
        .then(res => res)
        .catch(error => error);
    }
  }

  onSynchStarRating = newRating => {
    this.setState({ starRating: newRating });
  };

  onChangeRating = newRating => {
    const { movie, saveStarRating } = this.props;

    this.setState({ starRating: newRating });

    saveStarRating(movie.id, newRating);
  };

  render() {
    const { movie } = this.props;
    const { starRating } = this.state;

    return (
      <div className="info">
        <div>
          <Flex className="padding-left" justify="space-between" gap="5px">
            <h2>{this.limitText(movie.title, 40)}</h2>
            <div
              className="movie-rating"
              style={{
                borderColor: this.ratingBorderColor(
                  Math.floor(movie.vote_average)
                ),
              }}
            >
              {movie.vote_average.toFixed(1)}
            </div>
          </Flex>

          <span
            className="padding-left"
            style={movie.release_date ? null : { color: 'silver' }}
          >
            {movie.release_date
              ? format(movie.release_date, 'MMMM d, y')
              : 'Release date unknown'}
          </span>

          <MovieGenres genresId={movie.genre_ids} />

          <p
            className="movie-description"
            style={movie.overview ? null : { color: 'silver' }}
          >
            {movie.overview
              ? this.limitText(movie.overview, 140)
              : '// Author did not provide a description'}
          </p>
        </div>

        <Rate
          style={{ fontSize: '18px' }}
          count={10}
          value={starRating}
          onChange={this.onChangeRating}
        />
      </div>
    );
  }
}

MovieInfo.contextType = MoviesServiceContext;

MovieInfo.propTypes = {
  movie: PropTypes.object,
  saveStarRating: PropTypes.func.isRequired,
  hasStarRating: PropTypes.func.isRequired,
  getStarRating: PropTypes.func.isRequired,
};

MovieInfo.defaultProps = {
  movie: {},
};
