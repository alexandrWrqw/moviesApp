import { Component } from 'react';

import { Flex, Card } from 'antd';
import './MoviesListItem.css';
import PropTypes from 'prop-types';

import MovieGenres from '../MovieGenres/MovieGenres';

const { Meta } = Card; // antd

export default class MoviesListItem extends Component {
  render() {
    const { title, date, description } = this.props;

    return (
      <Flex className="movie" horizontal="true">
        <div className="image">Image</div>
        <Card className="info" bordered={false}>
          <Meta title={title} description={date} />
          <MovieGenres />
          <p>{description}</p>
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
