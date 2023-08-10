import React from "react";
import PropTypes from "prop-types";

const SubmitButton = (props) => {
  return (
    <div>
      <button
        className={`mt-5 flex w-full justify-center border-2 border-dark-gold rounded-md bg-primary-gold px-3 py-1.5 text-sm font-semibold leading-6 text-primary-black shadow-md hover:bg-secondary-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${props.style}`}
        onClick={props.onClickHandler}
        name={props.name}
        id={props.id ? props.id : `${props.name}-id`}
        disabled={props.disabled}
      >
        {props.label}
      </button>
    </div>
  );
};

SubmitButton.propTypes = {
  onClickHandler: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.string,
};

export default SubmitButton;
