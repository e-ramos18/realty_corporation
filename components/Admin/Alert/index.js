import React from "react";
import PropTypes from "prop-types";

const Alert = (props) => {
  const { status, message } = props;
  return (
    <React.Fragment>
      <div
        className={`${
          !props.isShow && "hidden"
        } border-l-4 p-1 bg-light-${status} border-primary-${status} text-dark-${status}`}
      >
        <div
          className={`flex items-start border-primary-${status} -ml-4 pl-3 py-1`}
        >
          <p className="ml-2">{message}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  isShow: PropTypes.bool.isRequired,
  status: PropTypes.string,
};

export default Alert;
