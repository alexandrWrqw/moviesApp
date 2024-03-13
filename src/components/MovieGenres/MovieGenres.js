import { Component } from 'react';
import './MovieGenres.css';
import { Flex, Tag } from 'antd';

export default class MovieGenres extends Component {
  render() {
    return (
      <Flex className="genres-list" wrap="wrap" gap="small">
        <Tag className="genre">Genre</Tag>
        <Tag className="genre">Genre</Tag>
      </Flex>
    );
  }
}
