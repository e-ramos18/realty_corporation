import React from "react";
import PropTypes from "prop-types";

const SelectInput = (props) => {
  return (
    <div className="mt-2">
      <label className="block text-sm font-medium leading-6 text-gray-900 ml-1">
        {props.label}
      </label>
      <select
        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 shadow-md"
        value={props.value}
        onChange={props.onChangeHandler}
        name={props.name}
        id={props.id ? props.id : `${props.name}-id`}
      >
        <option value="">Select an option</option>
        {props.data.map((option) => (
          <option key={option[props.keyValue]} value={option[props.keyValue]}>
            {option[props.keyLabel]}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  onChangeHandler: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.any,
  data: PropTypes.array.isRequired,
  keyValue: PropTypes.string.isRequired,
  keyLabel: PropTypes.string.isRequired,
};

export default SelectInput;
