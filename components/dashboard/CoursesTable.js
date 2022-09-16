import { useState } from "react";
import formatDate from "../../helpers/formatDate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

// Components
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function CoursesTable({ courses }) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(courses);
  const editClickHandler = (course) => {
    console.log(course);
    setIsOpen(true);
  };

  const confirmDeleteHandler = (course) => {
    console.log(course);
  };
  const deleteClickHandler = (course) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to delete "{course.name}"?</p>
            <button
              className="text-green-500 block border border-green-500 rounded p-2 my-2 w-full hover:bg-green-500 hover:text-white ease-in-out duration-300"
              onClick={onClose}
            >
              No
            </button>
            <button
              className="text-red-500 block border border-red-500 rounded p-2 my-2 w-full hover:bg-red-500 hover:text-white  ease-in-out duration-300"
              onClick={() => {
                confirmDeleteHandler(course);
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
  };

  const columns = [
    {
      field: "edit",
      headerName: "",
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className="flex w-full justify-around">
          <AiFillEdit
            onClick={() => editClickHandler(params.row)}
            className="text-xl text-green-600 transition-colors hover:text-blue-500 hover:cursor-pointer"
          />
          <AiFillDelete
            onClick={() => deleteClickHandler(params.row)}
            className="text-xl text-red-600 transition-colors hover:text-blue-500 hover:cursor-pointer"
          />
        </div>
      ),
    },
    { field: "title", headerName: "Name", width: 250 },
    { field: "user", headerName: "User ID", width: 250 },
    { field: "bootcamp", headerName: "Bootcamp", width: 250 },
    { field: "createdAt", headerName: "Created At", width: 250 },
    { field: "_id", headerName: "ID", width: 250 },
  ];

  const rows = courses.data.map((course) => {
    return {
      ...course,
      id: course._id,
      bootcamp: course.bootcamp.name,
      createdAt: formatDate(course.createdAt),
    };
  });
  return (
    <>
      <Box sx={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[10, 50, 100]}
          disableSelectionOnClick
          disableColumnSelector
          disableColumnFilter
          disableDensitySelector
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </>
  );
}

export default CoursesTable;
