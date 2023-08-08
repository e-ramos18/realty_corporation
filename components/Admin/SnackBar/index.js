import React from "react";
import PropTypes from "prop-types";
import { XMarkIcon } from "@heroicons/react/24/outline";

const SnackBar = (props) => {
  let styleBg = "bg-red-500";
  switch (props.status) {
    case "success":
      styleBg = "bg-green-800";
      break;
    case "info":
      styleBg = "bg-blue-500";
      break;
    case "warning":
      styleBg = "bg-yellow-500";
      break;
  }
  return (
    <React.Fragment>
      {props.isShow && (
        <div
          className={`fixed top-0 right-0 m-2 ${styleBg} text-white px-4 py-2 rounded shadow `}
        >
          <div className="flex ">
            <div>{props.message}</div>
            <div>
              <button className="ml-2" onClick={props.onHandlerClose}>
                <XMarkIcon className="block h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

SnackBar.propTypes = {
  message: PropTypes.string.isRequired,
  isShow: PropTypes.bool.isRequired,
  status: PropTypes.string,
};

export default SnackBar;
