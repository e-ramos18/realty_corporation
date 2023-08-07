import React from "react";
import { NavBar, Table } from "@components/Admin";

const Admin = () => {
  const [currentPage, setCurrentPage] = React.useState("Dashboard");
  const [isTableShow, setIsTableShow] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [tableHeader, setTableHeader] = React.useState([]);

  const getCondominiums = async () => {
    setTableHeader([
      { name: "id", label: "ID" },
      { name: "name", label: "Name" },
      { name: "location", label: "Location" },
      { name: "payable_to", label: "Payable To" },
      { name: "description", label: "Description" },
    ]);

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
    setCurrentPage(currentPage);

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
      {isTableShow && <Table header={tableHeader} data={data} actions={true} />}
    </React.Fragment>
  );
};

export default Admin;
