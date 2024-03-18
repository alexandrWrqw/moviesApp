import { Alert } from 'antd';
import PropTypes from 'prop-types';

function NoResultsMessage({ label }) {
  return (
    <Alert
      message={`Movies with the title '${label}' not found`}
      type="warning"
    />
  );
}

NoResultsMessage.propTypes = {
  label: PropTypes.string,
};

NoResultsMessage.defaultProps = {
  label: '',
};

export default NoResultsMessage;
