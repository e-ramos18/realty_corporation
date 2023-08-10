import React from "react";
import { NavBar, SnackBar, Table } from "@components/Admin";
import { alertDefaultData, condominiumTableHeader } from "./constants";
import axios from "axios";
import Dashboard from "./forms/Dashboard";

const Admin = () => {
  const [isShowTable, setIsShowTable] = React.useState(false);
  const [isShowDashboard, setIsShowDashboard] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [tableHeader, setTableHeader] = React.useState([]);
  const [alert, setAlert] = React.useState(alertDefaultData);
  const [currentPage, setCurrentPage] = React.useState("Dashboard");

  const getCondominiums = async () => {
    setTableHeader(condominiumTableHeader);

    const response = await axios.get("/api/condominiums");
    const data = response.data;

    setData(data.response.data);
  };

  const onClickHandlerMenu = (currentPage) => {
    setCurrentPage(currentPage);
    switch (currentPage) {
      case "Dashboard":
        setIsShowTable(false);
        setIsShowDashboard(true);
        break;
      case "Condominiums":
        getCondominiums();
        setIsShowTable(true);
        setIsShowDashboard(false);
        break;
      default:
        setIsShowTable(false);
        setIsShowDashboard(false);
    }
  };

  const onClickHandlerDelete = async (id, currentPage) => {
    switch (currentPage) {
      case "Condominiums":
        const response = await axios.delete(`/api/condominiums/${id}`);
        const data = response.data;
        if (data.response.status === "success") {
          console.log(id, currentPage);
          setAlert({
            message: data.response.message,
            isShow: true,
            status: data.response.status,
          });
          onClickHandlerMenu(currentPage);
        }
        break;
    }
  };

  const onHandlerCloseSnackBar = () => {
    setAlert({ message: "", isShow: false });
  };

  return (
    <React.Fragment>
      <NavBar
        current_page={"Dashboard"}
        onClickHandlerMenuItem={onClickHandlerMenu}
      />
      {isShowDashboard && <Dashboard />}

      {isShowTable && (
        <Table
          header={tableHeader}
          data={data}
          actions={true}
          onClickHandlerDelete={(id) => onClickHandlerDelete(id, currentPage)}
        />
      )}
      <SnackBar
        message={alert.message}
        isShow={alert.isShow}
        status={alert.status}
        onHandlerClose={onHandlerCloseSnackBar}
      />
    </React.Fragment>
  );
};

export default Admin;
