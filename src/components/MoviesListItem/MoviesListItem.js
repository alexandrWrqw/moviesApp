import './MoviesListItem.css';

import PropTypes from 'prop-types';
import { Flex } from 'antd';

import MovieInfo from '../MovieInfo/MovieInfo';

import image from './Rectangle 36.png';

function MoviesListItem({ title, date, description }) {
  return (
    <li className="movie">
      <Flex horizontal="true">
        <img className="image" width={180} height={280} src={image} alt="" />
        <MovieInfo title={title} date={date} description={description} />
      </Flex>
    </li>
  );
}

MoviesListItem.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
};

MoviesListItem.defaultProps = {
  title: 'Unknown',
  date: '',
  description: '',
};

export default MoviesListItem;
