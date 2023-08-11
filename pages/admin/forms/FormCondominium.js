import React from "react";
import PropTypes from "prop-types";
import {
  Alert,
  InputText,
  Stepper,
  SubmitButton,
  TextArea,
} from "@components/Admin";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { alertDefaultData } from "../constants";
import {
  patchCondominiums,
  patchCondominiumsStep2,
  patchCondominiumsStep3,
  patchCondominiumsStep4,
  postCondominiums,
} from "../apiCalls";

const FormCondominium = (props) => {
  const [formData, setFormData] = React.useState(props.formData);
  const [alert, setAlert] = React.useState(alertDefaultData);
  const [activeStep, setActiveStep] = React.useState(0);

  React.useEffect(() => {
    setFormData(props.formData);
  }, [props.formData]);

  const onChangeHandler = (event) => {
    const { name, value, type } = event.target;

    if (type !== "file") {
      setFormData((prevData) => {
        return { ...prevData, [name]: value };
      });
    }

    if (event.target.files) {
      setFormData((prevData) => {
        return {
          ...prevData,
          [`${name}_file`]: event.target.files[0],
          [name]: event.target.files[0].name,
        };
      });
    }
  };

  const formValidation = (activeStep) => {
    let valid = false;
    switch (activeStep) {
      case 0:
        valid =
          formData.name && formData.main_description && formData.main_image;
        break;
      case 1:
        valid = formData.thumbnail_description && formData.thumbnail_image;
        break;
      case 2:
        valid =
          formData.amenities_description &&
          formData.amenities_list &&
          formData.amenities_image;
        break;
      case 3:
        valid =
          formData.name && formData.main_description && formData.main_image;
        break;
      case 4:
        valid =
          formData.location_description &&
          formData.location_image &&
          formData.address;
        break;
    }

    if (!valid)
      setAlert({ message: "Data incomplete.", isShow: true, status: "error" });
    return valid;
  };

  const onClickHandlerSubmitAdd = async () => {
    if (formValidation()) {
      const newFormData = new FormData();
      newFormData.append("name", formData.name);
      newFormData.append("main_description", formData.main_description);
      newFormData.append("main_image_file", formData.main_image_file);
      newFormData.append(
        "thumbnail_description",
        formData.thumbnail_description
      );
      newFormData.append("thumbnail_image_file", formData.thumbnail_image_file);
      newFormData.append(
        "amenities_description",
        formData.amenities_description
      );
      newFormData.append("amenities_description", formData.amenities_list);
      newFormData.append("amenities_image_file", formData.amenities_image_file);
      newFormData.append("location_description", formData.location_description);
      newFormData.append("location_image_file", formData.location_image_file);
      newFormData.append("address", formData.address);

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

  const onClose = () => {
    setAlert(alertDefaultData);
    props.onCloseHandler();
  };

  const onClicHandlerNext = (activeStep) => {
    if (!formValidation(activeStep)) return;
    setAlert(alertDefaultData);

    const newFormData = new FormData();
    switch (activeStep) {
      case 0:
        newFormData.append("name", formData.name);
        newFormData.append("main_description", formData.main_description);
        newFormData.append("main_image_file", formData.main_image_file);
        if (!formData.id) {
          postCondominiums(newFormData)
            .then((data) => {
              if (data.response.status === "success") {
                const condominiumId = data.response.data.insertId;
                setFormData((prevData) => {
                  return { ...prevData, id: condominiumId };
                });
                setActiveStep(activeStep + 1);
              }
            })
            .catch(() => {
              setAlert({ message: "Error on saving.", isShow: true });
            });
        } else {
          patchCondominiums(formData.id, newFormData)
            .then((data) => {
              if (data.response.status === "success") {
                setActiveStep(activeStep + 1);
              }
            })
            .catch(() => {
              setAlert({ message: "Error on saving.", isShow: true });
            });
        }
        break;
      case 1:
        newFormData.append(
          "thumbnail_description",
          formData.thumbnail_description
        );
        newFormData.append(
          "thumbnail_image_file",
          formData.thumbnail_image_file
        );
        patchCondominiumsStep2(formData.id, newFormData)
          .then((data) => {
            if (data.response.status === "success") {
              setActiveStep(activeStep + 1);
            }
          })
          .catch(() => {
            setAlert({ message: "Error on saving.", isShow: true });
          });
        break;
      case 2:
        newFormData.append(
          "amenities_description",
          formData.amenities_description
        );
        newFormData.append("amenities_list", formData.amenities_list);
        newFormData.append(
          "amenities_image_file",
          formData.amenities_image_file
        );
        patchCondominiumsStep3(formData.id, newFormData)
          .then((data) => {
            if (data.response.status === "success") {
              setActiveStep(activeStep + 1);
            }
          })
          .catch(() => {
            setAlert({ message: "Error on saving.", isShow: true });
          });
        break;
      case 3:
        newFormData.append(
          "location_description",
          formData.location_description
        );
        newFormData.append("location_image_file", formData.location_image_file);
        newFormData.append("address", formData.address);
        patchCondominiumsStep4(formData.id, newFormData)
          .then((data) => {
            if (data.response.status === "success") {
              setActiveStep(activeStep + 1);
            }
          })
          .catch(() => {
            setAlert({ message: "Error on saving.", isShow: true });
          });
        break;
    }
  };

  const onClicHandlerBack = (activeStep) => {
    setActiveStep(activeStep - 1);
  };

  const step1 = (
    <React.Fragment>
      <InputText
        name={"name"}
        label={"Name"}
        value={formData.name}
        onChangeHandler={onChangeHandler}
      />
      <TextArea
        name={"main_description"}
        label={"Main Description"}
        value={formData.main_description}
        onChangeHandler={onChangeHandler}
      />
      <InputText
        name={"main_image"}
        label={"Main Image"}
        onChangeHandler={onChangeHandler}
        type={"file"}
        value={formData.main_image_file.filename}
        imageFile={formData.main_image}
      />
    </React.Fragment>
  );

  const step2 = (
    <React.Fragment>
      <TextArea
        name={"thumbnail_description"}
        label={"Thumbnail Description"}
        value={formData.thumbnail_description}
        onChangeHandler={onChangeHandler}
      />
      <InputText
        name={"thumbnail_image"}
        label={"Thumbnail Image"}
        onChangeHandler={onChangeHandler}
        type={"file"}
        value={formData.thumbnail_image_file.filename}
        imageFile={formData.thumbnail_image}
      />
    </React.Fragment>
  );

  const step3 = (
    <React.Fragment>
      <TextArea
        name={"amenities_description"}
        label={"Amenities Description"}
        value={formData.amenities_description}
        onChangeHandler={onChangeHandler}
      />
      <TextArea
        name={"amenities_list"}
        label={"Amenities List"}
        value={formData.amenities_list}
        onChangeHandler={onChangeHandler}
      />
      <InputText
        name={"amenities_image"}
        label={"Amenities Image"}
        onChangeHandler={onChangeHandler}
        type={"file"}
        imageFile={formData.amenities_image}
        value={formData.amenities_image_file.filename}
      />
    </React.Fragment>
  );

  const step4 = (
    <React.Fragment>
      <TextArea
        name={"location_description"}
        label={"Location Description"}
        value={formData.location_description}
        onChangeHandler={onChangeHandler}
      />
      <InputText
        name={"location_image"}
        label={"Location Image"}
        onChangeHandler={onChangeHandler}
        type={"file"}
        imageFile={formData.location_image}
        value={formData.location_image_file.filename}
      />
      <TextArea
        name={"address"}
        label={"Address"}
        value={formData.address}
        onChangeHandler={onChangeHandler}
      />
    </React.Fragment>
  );

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
                  <Stepper
                    steps={[
                      "Main Details",
                      "Thumbnail",
                      "Amenities",
                      "Location",
                    ]}
                    activeStep={activeStep}
                  />
                  <Alert
                    message={alert.message}
                    isShow={alert.isShow}
                    status={alert.status}
                  />

                  {activeStep === 0 && step1}
                  {activeStep === 1 && step2}
                  {activeStep === 2 && step3}
                  {activeStep === 3 && step4}
                  <div className="flex justify-center space-x-2">
                    {activeStep !== 0 && activeStep !== 4 && (
                      <SubmitButton
                        label={"Back"}
                        onClickHandler={() => onClicHandlerBack(activeStep)}
                        name={"back"}
                      />
                    )}
                    <SubmitButton
                      label={activeStep === 3 ? "Finish" : "Next"}
                      onClickHandler={() => onClicHandlerNext(activeStep)}
                      name={"next"}
                    />
                  </div>
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
