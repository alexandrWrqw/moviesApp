import { Alert } from 'antd';

function ErrorMessage() {
  return (
    <Alert
      style={{ whiteSpace: 'pre-line' }}
      message="Error"
      description={`Access to the list of films is temporarily unavailable :(
          Try turning it on VPN or reload the page. 
          If this doesn’t help, then we are already working on the problem!`}
      type="error"
      showIcon
    />
  );
}

export default ErrorMessage;
