import { Alert } from 'antd';
import Marquee from 'react-fast-marquee';

function OfflineWarning() {
  return (
    <Alert
      style={{ position: 'fixed', width: '100%', zIndex: '10' }}
      banner
      message={
        <Marquee pauseOnHover>
          No internet connection // It might be worth checking your connection
          VPN
        </Marquee>
      }
    />
  );
}

export default OfflineWarning;
