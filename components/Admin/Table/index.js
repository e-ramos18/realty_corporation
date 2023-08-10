import React from "react";
import PropTypes from "prop-types";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import IconButton from "../IconButton";
import SubmitButton from "../SubmitButton";
import FormCondominium from "@pages/admin/forms/FormCondominium";
import ConfirmDialogBox from "../ConfirmDialogBox";

const defaultFormData = {
  name: "",
  location: "",
  payable_to: "",
  description: "",
};

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
  const [isFormEdit, setIsFormEdit] = React.useState(false);
  const [formData, setFormData] = React.useState(defaultFormData);

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
    setFormData(defaultFormData);
    setIsFormEdit(false);
  };

  const onCloseHandler = () => {
    setIsShowForm(false);
  };

  const onSubmitSuccessAddItem = (addedItem) => {
    setCurrentItems((prevItems) => {
      prevItems.push(addedItem);
      return prevItems;
    });
  };

  const onSubmitSuccessSaveItem = (addedItem) => {
    let updatedItems = [];
    currentItems.forEach((item) => {
      const newItem = item.id === addedItem.id ? addedItem : item;
      updatedItems.push(newItem);
    });
    setCurrentItems(updatedItems);
  };

  const onClickHandleDeleteIcon = (id) => {
    setIsShowConfirmDialog(true);
    setSelectedId(id);
  };

  const onClickHandleConfirmDelete = () => {
    props.onClickHandlerDelete(selectedId);
    setIsShowConfirmDialog(false);
  };

  const onClickHandleEditIcon = (selectedItem) => {
    setIsFormEdit(true);
    setFormData({
      id: selectedItem.id,
      name: selectedItem.name,
      location: selectedItem.location,
      payable_to: selectedItem.payable_to,
      description: selectedItem.description,
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
                <tr key={currentItem.id}>
                  {header.map((item) => {
                    return (
                      <td
                        key={`key-${currentItem.id}-${item.name}`}
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
                          name={`edit-${currentItem.id}`}
                          onClickHandler={() =>
                            onClickHandleEditIcon(currentItem)
                          }
                          tooltip="Edit"
                          iconStyle="text-primary-info"
                        />
                        <IconButton
                          Icon={XCircleIcon}
                          name={`delete-${currentItem.id}`}
                          onClickHandler={() =>
                            onClickHandleDeleteIcon(currentItem.id)
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
        onSubmitSuccessAddItem={onSubmitSuccessAddItem}
        onSubmitSuccessSaveItem={onSubmitSuccessSaveItem}
        isFormEdit={isFormEdit}
        formData={formData}
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
