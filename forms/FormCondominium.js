import React from "react";
import PropTypes from "prop-types";
import {
  Alert,
  ImageCard,
  InputText,
  Stepper,
  SubmitButton,
  TextArea,
} from "@components/Admin";
import { Dialog, Transition } from "@headlessui/react";
import { alertDefaultData } from "../utils/constants";
import {
  patchCondominiums,
  patchCondominiumsStep2,
  patchCondominiumsStep3,
  patchCondominiumsStep4,
  postCondominiums,
} from "../utils/apiCalls";

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
          formData.name &&
          formData.main_description &&
          (formData.main_image || formData.main_filename);
        break;
      case 1:
        valid =
          formData.thumbnail_description &&
          (formData.thumbnail_image || formData.thumbnail_filename);
        break;
      case 2:
        valid =
          formData.amenities_description &&
          formData.amenities_list &&
          (formData.amenities_image || formData.amenities_filename);
        break;
      case 3:
        valid =
          formData.location_description &&
          (formData.location_image || formData.location_filename) &&
          formData.address;
        break;
      case 4:
        valid =
          formData.amenities_description &&
          formData.amenities_list &&
          (formData.amenities_image || formData.amenities_filename);
        break;
    }

    if (!valid)
      setAlert({ message: "Data incomplete.", isShow: true, status: "error" });
    return valid;
  };

  const onClose = (formData) => {
    setAlert(alertDefaultData);
    props.onCloseHandler(formData);
  };

  const processActiveStep = (activeStep) => {
    const newFormData = new FormData();
    newFormData.append("name", formData.name);
    newFormData.append("main_description", formData.main_description);
    formData.main_image_file &&
      newFormData.append("main_image_file", formData.main_image_file);

    if (!formData._id) {
      postCondominiums(newFormData)
        .then((data) => {
          if (data.response.status === "success") {
            setFormData((prevData) => ({
              ...prevData,
              _id: data.response.data._id,
              status: "pending",
              main_directory: data.response.data.main_directory,
              main_filename: data.response.data.main_filename,
            }));
            setActiveStep(activeStep + 1);
          }
        })
        .catch(() => {
          setAlert({ message: "Error on saving.", isShow: true });
        });
    } else {
      patchCondominiums(formData._id, newFormData)
        .then((data) => {
          if (data.response.status === "success") {
            setActiveStep(activeStep + 1);
            setFormData((prevData) => {
              return {
                ...prevData,
                main_directory: data.response.data.main_directory,
                main_filename: data.response.data.main_filename,
              };
            });
          }
        })
        .catch(() => {
          setAlert({ message: "Error on saving.", isShow: true });
        });
    }
  };

  const processActiveStep1 = (activeStep) => {
    const newFormData = new FormData();
    newFormData.append("thumbnail_description", formData.thumbnail_description);
    newFormData.append("thumbnail_image_file", formData.thumbnail_image_file);
    patchCondominiumsStep2(formData._id, newFormData)
      .then((data) => {
        if (data.response.status === "success") {
          setActiveStep(activeStep + 1);
          setFormData((prevData) => {
            return {
              ...prevData,
              thumbnail_directory: data.response.data.thumbnail_directory,
              thumbnail_filename: data.response.data.thumbnail_filename,
            };
          });
        }
      })
      .catch(() => {
        setAlert({ message: "Error on saving.", isShow: true });
      });
  };

  const processActiveStep2 = (activeStep) => {
    const newFormData = new FormData();
    newFormData.append("amenities_description", formData.amenities_description);
    newFormData.append("amenities_list", formData.amenities_list);
    newFormData.append("amenities_image_file", formData.amenities_image_file);
    patchCondominiumsStep3(formData._id, newFormData)
      .then((data) => {
        if (data.response.status === "success") {
          setActiveStep(activeStep + 1);
          setFormData((prevData) => {
            return {
              ...prevData,
              amenities_directory: data.response.data.amenities_directory,
              amenities_filename: data.response.data.amenities_filename,
            };
          });
        }
      })
      .catch(() => {
        setAlert({ message: "Error on saving.", isShow: true });
      });
  };

  const processActiveStep3 = (activeStep) => {
    const newFormData = new FormData();
    newFormData.append("location_description", formData.location_description);
    newFormData.append("location_image_file", formData.location_image_file);
    newFormData.append("address", formData.address);
    patchCondominiumsStep4(formData._id, newFormData)
      .then((data) => {
        if (data.response.status === "success") {
          setActiveStep(activeStep + 1);
          setFormData((prevData) => {
            return {
              ...prevData,
              location_directory: data.response.data.location_directory,
              location_filename: data.response.data.location_filename,
            };
          });
        }
      })
      .catch(() => {
        setAlert({ message: "Error on saving.", isShow: true });
      });
  };

  const onClicHandlerNext = (activeStep) => {
    if (!formValidation(activeStep)) return;
    switch (activeStep) {
      case 0:
        processActiveStep(activeStep);
        break;
      case 1:
        processActiveStep1(activeStep);
        break;
      case 2:
        processActiveStep2(activeStep);
        break;
      case 3:
        processActiveStep3(activeStep);
        break;
    }
  };

  const onClicHandlerBack = (activeStep) => {
    setActiveStep(activeStep - 1);
    setAlert(alertDefaultData);
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
        imageFile={formData.main_image}
      />
      {formData.main_directory && (
        <ImageCard
          source={`${formData.main_directory}${formData.main_filename}`}
          rootStyle="flex justify-center py-2 w-5/12"
        />
      )}
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
        imageFile={formData.thumbnail_image}
      />
      {formData.thumbnail_directory && (
        <ImageCard
          source={`${formData.thumbnail_directory}${formData.thumbnail_filename}`}
          rootStyle="flex justify-center py-2 w-5/12"
        />
      )}
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
      />
      {formData.amenities_directory && (
        <ImageCard
          source={`${formData.amenities_directory}${formData.amenities_filename}`}
          rootStyle="flex justify-center py-2 w-5/12"
        />
      )}
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
      />
      {formData.location_directory && (
        <ImageCard
          source={`${formData.location_directory}${formData.location_filename}`}
          rootStyle="flex justify-center py-2 w-5/12"
        />
      )}
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
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => onClose(formData)}
      >
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-1/2">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <Stepper
                    steps={[
                      "Main Details",
                      "Thumbnail",
                      "Amenities",
                      "Location",
                      "Unit Types",
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
  open: PropTypes.bool.isRequired,
  onCloseHandler: PropTypes.func.isRequired,
  formData: PropTypes.object,
  onClickSaveStep1: PropTypes.func,
};

export default FormCondominium;
