import { Alert } from 'antd';
import PropTypes from 'prop-types';

function NoResultsMessage({ label }) {
  const forSearchTab = `Movies with the title '${label}' not found`;
  const forRatedTab = `No rated movies found`;

  const messageText = label === 'ratedTab' ? forRatedTab : forSearchTab;

  return <Alert message={messageText} type="warning" />;
}

NoResultsMessage.propTypes = {
  label: PropTypes.string,
};

NoResultsMessage.defaultProps = {
  label: '',
};

export default NoResultsMessage;
