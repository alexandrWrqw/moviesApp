/* eslint-disable no-unneeded-ternary */
import './MoviesListItem.css';

import PropTypes from 'prop-types';
import { Flex } from 'antd';

import MovieInfo from '../MovieInfo/MovieInfo';

import image from './noImage.png';

function MoviesListItem({ title, date, description, imagePath }) {
  const imageSrc = `https://image.tmdb.org/t/p/original${imagePath}`;

  return (
    <li className="movie">
      <Flex horizontal="true">
        <img
          className="image"
          width={180}
          height={280}
          src={imagePath == null ? image : imageSrc}
          alt=""
        />
        <MovieInfo title={title} date={date} description={description} />
      </Flex>
    </li>
  );
}

MoviesListItem.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  imagePath: PropTypes.string,
};

MoviesListItem.defaultProps = {
  title: 'Unknown',
  date: '',
  description: '',
  imagePath: image,
};

export default MoviesListItem;
