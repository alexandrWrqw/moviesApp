import './MovieInfo.css';

import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Rate, Flex } from 'antd';

import MovieGenres from '../MovieGenres/MovieGenres';

function MovieInfo({ title, date, description, rating, genresId }) {
  const limitText = (text, limit) => {
    let str = text.slice(0, limit);

    if (str.length < text.length) {
      const arr = str.split(' ');
      arr.splice(arr.length - 1, 1);
      str = arr.join(' ');

      return `${str} ...`;
    }

    return text;
  };

  const ratingBorderColor = num => {
    let color = '#E90000';

    if (num >= 3 && num < 5) color = '#E97E00';
    if (num >= 5 && num < 7) color = '#E9D100';
    if (num >= 7) color = '#66E900';

    return color;
  };

  return (
    <div className="info">
      <div>
        <Flex justify="space-between" gap="5px">
          <h2>{limitText(title, 40)}</h2>
          <div
            className="movie-rating"
            style={{ borderColor: ratingBorderColor(Math.floor(rating)) }}
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
            ? limitText(description, 140)
            : '// Author did not provide a description //'}
        </p>
      </div>

      <Rate style={{ fontSize: '18px' }} count={10} />
    </div>
  );
}

MovieInfo.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  rating: PropTypes.number,
  genresId: PropTypes.array,
};

MovieInfo.defaultProps = {
  title: 'Unknown',
  date: '',
  description: '',
  rating: null,
  genresId: [],
};

export default MovieInfo;
