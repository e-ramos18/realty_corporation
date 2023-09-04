import React from "react";
import Image from "next/image";
import { InputText, SnackBar, SubmitButton } from "@components/Admin";
import axios from "axios";
import { setCookie } from "nookies";

export default function Login() {
  const [formData, setFormData] = React.useState({ uname: "", pword: "" });
  const [alert, setAlert] = React.useState({ message: "", isShow: false });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const onClickHandler = async () => {
    const response = await axios.post("/api/login", formData);
    const data = response.data;

    if (data.response.status === "success") {
      setCookie(null, "GRCT", data.response.token, { maxAge: 3600, path: "/" });
      window.location.assign("/admin");
    } else {
      setAlert({ message: data.response.message, isShow: true });
    }
  };

  const onHandlerCloseSnackBar = () => {
    setAlert({ message: "", isShow: false });
  };

  return (
    <React.Fragment>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            src={"/logo/logo.jpg"}
            alt={"Golden Realty Corporation"}
            className="mx-auto h-20 w-auto shadow-lg rounded-md border-2 border-primary-gold"
            width={200}
            height={200}
          />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <InputText
            name={"uname"}
            label={"Username Test"}
            onChangeHandler={onChangeHandler}
          />
          <InputText
            name={"pword"}
            type={"password"}
            label={"Password"}
            onChangeHandler={onChangeHandler}
          />
          <SubmitButton
            label={"Sign In"}
            onClickHandler={onClickHandler}
            name={"sign-in"}
          />
        </div>
      </div>
      <SnackBar
        message={alert.message}
        isShow={alert.isShow}
        onHandlerClose={onHandlerCloseSnackBar}
      />
    </React.Fragment>
  );
}
