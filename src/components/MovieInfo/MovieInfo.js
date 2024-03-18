import './MovieInfo.css';

import PropTypes from 'prop-types';
import { format } from 'date-fns';

import MovieGenres from '../MovieGenres/MovieGenres';

function MovieInfo({ title, date, description }) {
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

  return (
    <div className="info">
      <h2>{limitText(title, 50)}</h2>

      <span style={date ? null : { color: 'silver' }}>
        {date ? format(date, 'MMMM d, y') : 'Release date unknown'}
      </span>

      <MovieGenres />

      <p
        className="movie-description"
        style={description ? null : { color: 'silver' }}
      >
        {description
          ? limitText(description, 140)
          : '// Author did not provide a description //'}
      </p>
    </div>
  );
}

MovieInfo.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
};

MovieInfo.defaultProps = {
  title: 'Unknown',
  date: '',
  description: '',
};

export default MovieInfo;
