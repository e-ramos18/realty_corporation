import React from "react";
import PropTypes from "prop-types";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import IconButton from "../IconButton";
import SubmitButton from "../SubmitButton";
import FormCondominium from "@forms/FormCondominium";
import ConfirmDialogBox from "../ConfirmDialogBox";
import { formDataCondominium } from "@utils/constants";
import { getCondominium } from "@utils/apiCalls";

const Table = (props) => {
  const { data, header, actions } = props;
  const [currentItems, setCurrentItems] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [totalPages, setTotalPages] = React.useState(1);
  const [isShowForm, setIsShowForm] = React.useState(false);
  const [isShowConfirmDialog, setIsShowConfirmDialog] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);
  const [formData, setFormData] = React.useState(formDataCondominium);

  React.useEffect(() => {
    if (!data.length) return;

    setTotalPages(Math.ceil(data.length / itemsPerPage));
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(currentItems);
  }, [data, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onClickAdd = () => {
    setIsShowForm(true);
    setFormData(formDataCondominium);
  };

  const onCloseHandler = (formData) => {
    setCurrentItems((prevCurrentItems) => [...prevCurrentItems, formData]);
    setIsShowForm(false);
  };

  const onClickHandleDeleteIcon = (id) => {
    setIsShowConfirmDialog(true);
    setSelectedId(id);
  };

  const onClickHandleConfirmDelete = () => {
    props.onClickHandlerDelete(selectedId);
    setCurrentItems((prevCurrentItems) => {
      return prevCurrentItems.filter((item) => item._id !== selectedId);
    });
    setIsShowConfirmDialog(false);
  };

  const onClickSaveStep1 = (data) => {
    setIsShowConfirmDialog(false);
  };

  const onClickHandleEditIcon = (selectedItem) => {
    getCondominium(selectedItem._id).then((data) => {
      const condominium = data.response.data;
      setFormData(condominium);
    });
    setIsShowForm(true);
  };

  return (
    <React.Fragment>
      <div className="container mx-auto p-4">
        <table className="min-w-full divide-y divide-gray-200 shadow-lg">
          <thead className="bg-gray-50">
            <tr>
              {header.map((item) => {
                return (
                  <th
                    key={`key-${item.label}`}
                    className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider "
                  >
                    {item.label}
                  </th>
                );
              })}
              {actions && (
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider ">
                  {"ACTIONS"}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((currentItem) => {
              return (
                <tr
                  key={currentItem._id}
                  className={
                    currentItem.status === "pending" ? "bg-red-200" : ""
                  }
                >
                  {header.map((item) => {
                    return (
                      <td
                        key={`key-${currentItem._id}-${item.name}`}
                        className={`px-2 py-2 text-xs text-gray-500 align-top ${item.style}`}
                      >
                        {currentItem[item.name]}
                      </td>
                    );
                  })}
                  {actions && (
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <IconButton
                          Icon={PencilSquareIcon}
                          name={`edit-${currentItem._id}`}
                          onClickHandler={() =>
                            onClickHandleEditIcon(currentItem)
                          }
                          tooltip="Edit"
                          iconStyle="text-primary-info"
                        />
                        <IconButton
                          Icon={XCircleIcon}
                          name={`delete-${currentItem._id}`}
                          onClickHandler={() =>
                            onClickHandleDeleteIcon(currentItem._id)
                          }
                          tooltip="Delete"
                          iconStyle="text-primary-error"
                        />
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex justify-between">
          <div>
            <SubmitButton name="add" label="Add" onClickHandler={onClickAdd} />
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`mx-1 px-3 py-1 rounded-md ${
                      currentPage === pageNumber
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
      <FormCondominium
        open={isShowForm}
        onCloseHandler={onCloseHandler}
        formData={formData}
        onClickSaveStep1={onClickSaveStep1}
      />
      <ConfirmDialogBox
        title={"Delete Item"}
        description="Are you sure you want to delete this item?"
        onCloseHandler={() => setIsShowConfirmDialog(false)}
        onClickHandlerConfirmYes={onClickHandleConfirmDelete}
        onClickHandlerConfirmNo={() => setIsShowConfirmDialog(false)}
        isShow={isShowConfirmDialog}
      />
    </React.Fragment>
  );
};

Table.propTypes = {
  header: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  actions: PropTypes.bool,
  onClickHandlerEdit: PropTypes.func,
  onClickHandlerDelete: PropTypes.func,
};

export default Table;
