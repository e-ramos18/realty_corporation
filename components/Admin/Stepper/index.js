import React from "react";
import PropTypes from "prop-types";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Stepper = (props) => {
  const { steps, activeStep } = props;
  const columns = props.steps.length;
  const lastStep = columns - 1;

  return (
    <div className="after:mt-4 mb-10 after:block after:h-1 after:w-full after:rounded-lg after:bg-gray-200">
      <ol
        className={classNames(
          "grid text-sm font-medium text-gray-500",
          `grid-cols-5`
        )}
      >
        {steps.map((item, index) => {
          return (
            <li
              key={`key${item}`}
              className={classNames(
                "relative flex ",
                index === 0
                  ? "justify-start"
                  : index === lastStep
                  ? "justify-end"
                  : "justify-center",
                activeStep >= index ? "text-blue-600" : "text-gray-600"
              )}
            >
              {activeStep > index ? (
                <span
                  className={classNames(
                    "absolute -bottom-[1.75rem] rounded-full text-white",
                    index === 0
                      ? "start-0"
                      : index === lastStep
                      ? "end-0"
                      : "left-1/2 -translate-x-1/2",
                    activeStep >= index ? "bg-blue-600" : "bg-gray-600"
                  )}
                >
                  <CheckCircleIcon
                    className="block h-6 w-6"
                    aria-hidden="true"
                  />
                </span>
              ) : (
                <span className="h-6 w-6 absolute -bottom-[1.75rem] rounded-full bg-gray-200 text-center font-bold text-gray-600">
                  {index + 1}
                </span>
              )}
              <span className="hidden sm:block">{item}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

Stepper.propTypes = {
  steps: PropTypes.any.isRequired,
  activeStep: PropTypes.number.isRequired,
};

export default Stepper;
