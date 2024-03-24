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
    const { hasStarRating, getStarRating, movieId } = this.props;

    const hasStar = hasStarRating(movieId);
    if (hasStar) this.onSynchStarRating(getStarRating(movieId));
  }

  componentDidUpdate(prevProps, prevState) {
    const { movieId } = this.props;
    const { starRating } = this.state;

    if (prevState.starRating !== starRating) {
      const MovieService = this.context;

      MovieService.addMovieRating(movieId, starRating)
        .then(res => res)
        .catch(error => error);
    }
  }

  onSynchStarRating = newRating => {
    this.setState({ starRating: newRating });
  };

  onChangeRating = newRating => {
    const { movieId, saveStarRating } = this.props;

    this.setState({ starRating: newRating });

    saveStarRating(movieId, newRating);
  };

  render() {
    const { title, date, description, rating, genresId } = this.props;
    const { starRating } = this.state;

    return (
      <div className="info">
        <div>
          <Flex justify="space-between" gap="5px">
            <h2>{this.limitText(title, 40)}</h2>
            <div
              className="movie-rating"
              style={{
                borderColor: this.ratingBorderColor(Math.floor(rating)),
              }}
            >
              {rating.toFixed(1)}
            </div>
          </Flex>

          <span style={date ? null : { color: 'silver' }}>
            {date ? format(date, 'MMMM d, y') : 'Release date unknown'}
          </span>

          <MovieGenres genresId={genresId} />

          <p
            className="movie-description"
            style={description ? null : { color: 'silver' }}
          >
            {description
              ? this.limitText(description, 140)
              : '// Author did not provide a description //'}
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
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  rating: PropTypes.number,
  genresId: PropTypes.array,
  movieId: PropTypes.number.isRequired,
  saveStarRating: PropTypes.func.isRequired,
  hasStarRating: PropTypes.func.isRequired,
  getStarRating: PropTypes.func.isRequired,
};

MovieInfo.defaultProps = {
  title: 'Unknown',
  date: '',
  description: '',
  rating: null,
  genresId: [],
};
