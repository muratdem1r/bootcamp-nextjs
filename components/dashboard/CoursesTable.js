import { useState } from "react";
import formatDate from "../../helpers/formatDate";

// Components
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import UpdateCourse from "../courses/UpdateCourse";
import DeleteCourse from "../courses/DeleteCourse";
import NextLink from "../ui/NextLink";

function CoursesTable({ courses }) {
  const columns = [
    {
      field: "edit",
      headerName: "",
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className="flex w-full justify-around">
          <UpdateCourse
            className="flex items-center gap-1 p-1 text-green-600 font-medium hover:text-green-700 hover:underline"
            course={params.row}
          >
            <AiFillEdit className="text-xl text-green-600 transition-colors hover:text-blue-500 hover:cursor-pointer" />
          </UpdateCourse>
          <DeleteCourse
            className="text-xl text-red-600 transition-colors hover:text-blue-500 hover:cursor-pointer"
            course={params.row}
          >
            <AiFillDelete />
          </DeleteCourse>
        </div>
      ),
    },
    {
      field: "title",
      headerName: "Name",
      width: 250,
      renderCell: (params) => (
        <NextLink
          className="text-blue-500 hover:underline hover:text-blue-400 transition-colors"
          href={`/courses/${params.row.id}`}
        >
          {params.row.title}
        </NextLink>
      ),
    },
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
      <Box sx={{ height: 650, width: "100%", bgcolor: "white" }}>
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
