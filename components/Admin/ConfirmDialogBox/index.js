import React from "react";
import PropTypes from "prop-types";
import SubmitButton from "../SubmitButton";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const ConfirmDialogBox = (props) => {
  return (
    <Transition.Root show={props.isShow} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.onCloseHandler}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        {props.title}
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {props.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 mb-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <SubmitButton
                    label={"No"}
                    onClickHandler={props.onClickHandlerConfirmNo}
                    name={"confirm-no"}
                    style="ml-2"
                  />
                  <SubmitButton
                    label={"Yes"}
                    onClickHandler={props.onClickHandlerConfirmYes}
                    name={"confirm-yes"}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

ConfirmDialogBox.propTypes = {
  onCloseHandler: PropTypes.func.isRequired,
  onClickHandlerConfirmYes: PropTypes.func.isRequired,
  onClickHandlerConfirmNo: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  isShow: PropTypes.bool.isRequired,
};

export default ConfirmDialogBox;
