import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function LoadingSpinner() {
  return <Spin indicator={<LoadingOutlined style={{ fontSize: 44 }} spin />} />;
}

export default LoadingSpinner;
