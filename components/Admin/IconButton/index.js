import React from "react";
import PropTypes from "prop-types";

const IconButton = (props) => {
  const IconComponent = props.Icon;
  return (
    <div className="relative inline-block">
      <a
        href="#"
        onClick={props.onClickHandler}
        name={props.name}
        id={props.id ? props.id : `${props.name}-id`}
        title={props.tooltip}
      >
        <IconComponent className="block h-5 w-5" aria-hidden="true" />
      </a>
    </div>
  );
};

IconButton.propTypes = {
  onClickHandler: PropTypes.func,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  Icon: PropTypes.any.isRequired,
  tooltip: PropTypes.string,
};

export default IconButton;
