import React from "react";
import PropTypes from "prop-types";
import {
  PlusCircleIcon,
  PencilSquareIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const Table = (props) => {
  const { data, header, actions } = props;
  const [currentItems, setCurrentItems] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [totalPages, setTotalPages] = React.useState(1);

  React.useEffect(() => {
    setTotalPages(Math.ceil(data.length / itemsPerPage));
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(currentItems);
  }, [data, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <React.Fragment>
      <div className="container mx-auto p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {header.map((item, index) => {
                return (
                  <th
                    key={`key-${index}`}
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider "
                  >
                    {item.label}
                  </th>
                );
              })}
              {actions && (
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">
                  {"ACTIONS"}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((currentItem) => {
              return (
                <tr key={currentItem.id}>
                  {header.map((item, index) => {
                    return (
                      <td
                        key={`key-${index}`}
                        className="px-6 py-4 text-sm text-gray-500"
                      >
                        {currentItem[item.name]}
                      </td>
                    );
                  })}
                  {actions && (
                    <td className="px-6 py-4 text-sm text-gray-500 w-200">
                      <div className="flex">
                        <button className="ml-2" onClick={props.onHandlerClose}>
                          <PlusCircleIcon
                            className="block h-5 w-5"
                            aria-hidden="true"
                          />
                          <PencilSquareIcon
                            className="block h-5 w-5"
                            aria-hidden="true"
                          />
                          <XCircleIcon
                            className="block h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

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
      </div>
    </React.Fragment>
  );
};

Table.propTypes = {
  header: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  actions: PropTypes.bool,
};

export default Table;
