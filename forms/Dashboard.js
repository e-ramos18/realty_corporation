import React from "react";
import {
  CardCarousel,
  InputText,
  SnackBar,
  SubmitButton,
} from "@components/Admin";
import {
  deleteHeroImages,
  getHeroImages,
  postHeroImages,
} from "../utils/apiCalls";

const Dashboard = () => {
  const [heroImages, setHeroImages] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState("");
  const [formData, setFormData] = React.useState({ hero_image: "" });
  const [alert, setAlert] = React.useState({ message: "", isShow: false });
  const [refreshList, setRefreshList] = React.useState(null);

  React.useEffect(() => {
    getHeroImages().then((data) => {
      if (data.response.status === "success") setHeroImages(data.response.data);
    });
  }, [refreshList]);

  const onChangeHandler = (event) => {
    const { files, name, value } = event.target;
    const file = files[0];
    setSelectedImage(file);
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const onClickHandlerUpload = () => {
    if (!selectedImage) {
      setAlert({
        message: "Please select an image.",
        isShow: true,
        status: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file-image", selectedImage);

    postHeroImages(formData)
      .then((data) => {
        if (data.response.status === "success") {
          setRefreshList(data.response.data);
          setSelectedImage(null);
          setFormData({ hero_image: "" });
          setAlert({
            message: "File uploaded.",
            isShow: true,
            status: "success",
          });
        }
      })
      .catch(() =>
        setAlert({ message: "Error uploading image.", isShow: true })
      );
  };

  const onHandlerCloseSnackBar = () =>
    setAlert({ message: "", isShow: false, status: "" });

  const onClickHandlerDelete = (imageId) => {
    deleteHeroImages({ id: imageId })
      .then((data) => {
        if (data.response.status === "success") {
          setRefreshList(data.response.data);
          setSelectedImage(null);
          setAlert({
            message: data.response.message,
            isShow: true,
            status: "success",
          });
        }
      })
      .catch(() =>
        setAlert({ message: "Error on deleting image.", isShow: true })
      );
  };

  return (
    <React.Fragment>
      <div className="flex items-end mt-4 ml-5">
        <InputText
          name={"hero_image"}
          label={"Hero Page Image"}
          onChangeHandler={onChangeHandler}
          type={"file"}
          value={formData.hero_image}
        />
        <SubmitButton
          name={"upload-image"}
          label={"Upload Image"}
          onClickHandler={onClickHandlerUpload}
          style={"ml-2"}
        />
      </div>
      <CardCarousel
        data={heroImages}
        onClickHandlerDelete={onClickHandlerDelete}
      />

      <SnackBar
        message={alert.message}
        isShow={alert.isShow}
        status={alert.status}
        onHandlerClose={onHandlerCloseSnackBar}
      />
    </React.Fragment>
  );
};

export default Dashboard;
