import React from "react";
import PropTypes from "prop-types";
import { Alert, InputText, SelectInput, SubmitButton } from "@components/Admin";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";

const FormCondominium = (props) => {
  const [formData, setFormData] = React.useState(props.formData);
  const [alert, setAlert] = React.useState({
    message: "",
    isShow: false,
    status: "",
  });
  const [payablesList, setPayableList] = React.useState([]);

  const getPayables = async () => {
    const response = await axios.get("/api/payables");
    const data = response.data;
    setPayableList(data.response.data);
  };

  React.useEffect(() => {
    setFormData(props.formData);
  }, [props.formData]);

  React.useEffect(() => {
    getPayables();
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const formValidation = () => {
    const valid =
      formData.name &&
      formData.location &&
      formData.payable_to &&
      formData.description;
    if (!valid)
      setAlert({ message: "Data incomplete.", isShow: true, status: "error" });
    return valid;
  };

  const onClickHandlerSubmitAdd = async () => {
    if (formValidation()) {
      const response = await axios.post("/api/condominiums", formData);
      const data = response.data;
      if (data.response.status === "success") {
        const newCondominium = data.response.data;
        props.onSubmitSuccessAddItem({
          ...formData,
          ...newCondominium,
        });
        setAlert({
          message: data.response.message,
          isShow: true,
          status: "success",
        });
        setFormData({
          name: "",
          location: "",
          payable_to: "",
          description: "",
        });
      } else {
        setAlert({
          message: data.response.message,
          isShow: true,
          status: "error",
        });
      }
    }
  };

  const onClickHandlerSubmitSave = async () => {
    if (formValidation()) {
      const response = await axios.patch(
        `/api/condominiums/${formData.id}`,
        formData
      );
      const data = response.data;
      if (data.response.status === "success") {
        const updatedItems = data.response.data;
        props.onSubmitSuccessSaveItem(updatedItems);
        setAlert({
          message: data.response.message,
          isShow: true,
          status: "success",
        });
      } else {
        setAlert({
          message: data.response.message,
          isShow: true,
          status: "error",
        });
      }
    }
  };

  const onClose = () => {
    setAlert({ message: "", isShow: false });
    props.onCloseHandler();
  };

  return (
    <Transition.Root show={props.open} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                  <Alert
                    message={alert.message}
                    isShow={alert.isShow}
                    status={alert.status}
                  />
                  <InputText
                    name={"name"}
                    label={"Name"}
                    value={formData.name}
                    onChangeHandler={onChangeHandler}
                  />
                  <InputText
                    name={"location"}
                    label={"Location"}
                    value={formData.location}
                    onChangeHandler={onChangeHandler}
                  />
                  <SelectInput
                    label={"Payables To"}
                    name={"payable_to"}
                    data={payablesList}
                    keyValue={"id"}
                    keyLabel={"name"}
                    onChangeHandler={onChangeHandler}
                    value={formData.payable_to}
                  />
                  <InputText
                    name={"description"}
                    label={"Description"}
                    value={formData.description}
                    onChangeHandler={onChangeHandler}
                  />
                  <SubmitButton
                    label={props.isFormEdit ? "Save" : "Add Condominium"}
                    onClickHandler={
                      props.isFormEdit
                        ? onClickHandlerSubmitSave
                        : onClickHandlerSubmitAdd
                    }
                    name={props.isFormEdit ? "save-item" : "add-item"}
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

FormCondominium.propTypes = {
  onClickHandlerSubmit: PropTypes.func,
  open: PropTypes.bool.isRequired,
  onCloseHandler: PropTypes.func.isRequired,
  onSubmitSuccessAddItem: PropTypes.func,
  onSubmitSuccessSaveItem: PropTypes.func,
  isFormEdit: PropTypes.bool,
  formData: PropTypes.object,
};

export default FormCondominium;
