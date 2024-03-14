import './MoviesListItem.css';

import PropTypes from 'prop-types';
import { Flex, Card } from 'antd';
import { format } from 'date-fns';

import MovieGenres from '../MovieGenres/MovieGenres';

function MoviesListItem({ title, date, description }) {
  const limitDescription = text => {
    if (!text) return '// Author did not provide a description //';

    let str = text.slice(0, 180);

    if (str.length < text.length) {
      const arr = str.split(' ');
      arr.splice(arr.length - 1, 1);
      str = arr.join(' ');

      return `${str} ...`;
    }

    return text;
  };

  const { Meta } = Card; // antd MetaComponent

  return (
    <Flex className="movie" horizontal="true">
      <div className="image">Image</div>
      <Card className="info" bordered={false}>
        <Meta
          title={title}
          description={
            date ? format(date, 'MMMM d, y') : 'Release date unknown'
          }
        />
        <MovieGenres />
        <p>{limitDescription(description)}</p>
      </Card>
    </Flex>
  );
}

MoviesListItem.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
};

MoviesListItem.defaultProps = {
  title: 'Unknown',
  date: 'Unknown',
  description: 'None',
};

export default MoviesListItem;
