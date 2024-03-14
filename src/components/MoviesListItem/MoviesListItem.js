import { Component } from 'react';

import { Flex, Card } from 'antd';
import './MoviesListItem.css';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import MovieGenres from '../MovieGenres/MovieGenres';

const { Meta } = Card; // antd

export default class MoviesListItem extends Component {
  limitDescription(text) {
    if (!text) return '// Author did not provide a description //';

    this.str = text.slice(0, 180);

    if (this.str.length < text.length) {
      this.arr = this.str.split(' ');
      this.arr.splice(this.arr.length - 1, 1);
      this.str = this.arr.join(' ');

      return `${this.str} ...`;
    }

    return text;
  }

  render() {
    const { title, date, description } = this.props;

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
          <p>{this.limitDescription(description)}</p>
        </Card>
      </Flex>
    );
  }
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
