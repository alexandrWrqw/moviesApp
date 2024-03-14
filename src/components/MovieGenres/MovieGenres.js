import './MovieGenres.css';
import { Flex, Tag } from 'antd';

function MovieGenres() {
  return (
    <Flex className="genres-list" wrap="wrap" gap="small">
      <Tag className="genre">Genre</Tag>
      <Tag className="genre">Genre</Tag>
    </Flex>
  );
}

export default MovieGenres;
