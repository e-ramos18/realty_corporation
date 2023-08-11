import React from "react";
import PropTypes from "prop-types";

const InputText = (props) => {
  return (
    <div className="mt-2">
      {props.label && (
        <label className="block text-sm font-medium leading-6 text-gray-900 ml-1">
          {props.label}
        </label>
      )}

      <div>
        <textarea
          id={props.id ? props.id : `${props.name}-id`}
          name={props.name}
          type={props.type ? props.type : `text`}
          autoComplete={props.name}
          required
          className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-gold sm:text-sm sm:leading-6"
          onChange={props.onChangeHandler}
          value={props.value}
          rows={5}
        />
      </div>
    </div>
  );
};

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  onChangeHandler: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
};

export default InputText;
