import React from "react";
import PropTypes from "prop-types";
import SubmitButton from "../SubmitButton";
import InputText from "../InputText";
import SnackBar from "../SnackBar";

const UploadImage = (props) => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [alert, setAlert] = React.useState({ message: "", isShow: false });

  const onChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const onClick = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("file-image", selectedImage);

    try {
      const response = await fetch("/api/images/hero", {
        method: "POST",
        body: formData,
      });

      // Handle the response from the server if needed
      const data = await response.json();
      console.log(data);
      setAlert({ message: "File uploaded.", isShow: true, status: "success" });
    } catch (error) {
      setAlert({ message: "Error uploading image.", isShow: true });
    }
  };

  const onHandlerCloseSnackBar = () =>
    setAlert({ message: "", isShow: false, status: "" });

  return (
    <React.Fragment>
      <div className="flex items-center mt-4 ml-4">
        <InputText
          name={"file-image-hero"}
          label={"Hero Page Image"}
          onChangeHandler={onChange}
          type={"file"}
        />
        {selectedImage && (
          <div className="ml-4 mt-3">
            {/* <img src={uploadedImage} alt="Uploaded" className="w-32 h-32" /> */}
            <SubmitButton
              name={"upload-image-hero"}
              label={"Upload Image"}
              onClickHandler={onClick}
            />
          </div>
        )}
      </div>
      <SnackBar
        message={alert.message}
        isShow={alert.isShow}
        status={alert.status}
        onHandlerClose={onHandlerCloseSnackBar}
      />
    </React.Fragment>
  );
};

UploadImage.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  type: PropTypes.string,
  onChangeHandler: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
};

export default UploadImage;
