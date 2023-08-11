import React from "react";
import PropTypes from "prop-types";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Alert = (props) => {
  const { status, message } = props;
  let rootStyle = "";
  switch (status) {
    case "success":
      rootStyle = "bg-light-success border-primary-success text-dark-success";
      break;
    case "info":
      rootStyle = "bg-light-info border-primary-info text-dark-info";
      break;
    case "warning":
      rootStyle = "bg-light-warning border-primary-warning text-dark-warning";
      break;
    default:
      rootStyle = "bg-light-error border-primary-error text-dark-error";
      break;
  }
  return (
    <React.Fragment>
      <div
        className={classNames(
          !props.isShow && "hidden",
          "border-l-4 p-1",
          rootStyle
        )}
      >
        <div className={`flex items-start ml-4 pl-3 py-1`}>
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
