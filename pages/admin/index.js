import React from "react";
import { NavBar, Table, UploadImage } from "@components/Admin";
import { condominiumTableHeader } from "./constants";

const Admin = () => {
  const [isTableShow, setIsTableShow] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [tableHeader, setTableHeader] = React.useState([]);

  const getCondominiums = async () => {
    setTableHeader(condominiumTableHeader);

    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`/api/condominiums`, postData);
    const response = await res.json();
    const data = response.response.data;
    setData(data);
  };

  const onClickHandlerMenu = (currentPage) => {
    switch (currentPage) {
      case "Condominiums":
        getCondominiums();
        setIsTableShow(true);
        break;
      default:
        setIsTableShow(false);
    }
  };

  return (
    <React.Fragment>
      <NavBar
        current_page={"Dashboard"}
        onClickHandlerMenuItem={onClickHandlerMenu}
      />
      <UploadImage name="hero-image" />
      {isTableShow && <Table header={tableHeader} data={data} actions={true} />}
    </React.Fragment>
  );
};

export default Admin;
