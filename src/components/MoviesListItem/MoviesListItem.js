import { Component } from 'react';

import { Flex, Card } from 'antd';
import './MoviesListItem.css';

import MovieGenres from '../MovieGenres/MovieGenres';

const { Meta } = Card; // antd

export default class MoviesListItem extends Component {
  render() {
    return (
      <Flex className="movie" horizontal="true">
        <div className="image">Image</div>
        <Card className="info" bordered={false}>
          <Meta title="Title" description="Data" />
          <MovieGenres />
          <p>Description</p>
        </Card>
      </Flex>
    );
  }
}
