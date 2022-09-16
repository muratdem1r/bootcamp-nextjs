import formatDate from "../../helpers/formatDate";

// Components
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import UpdateUser from "../users/UpdateUser";
import DeleteUser from "../users/DeleteUser";

function UsersTable({ users }) {
  const columns = [
    {
      field: "edit",
      headerName: "",
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        if (params.row.role === "admin") return;
        return (
          <div className="flex w-full justify-around">
            <UpdateUser user={params.row}>
              <AiFillEdit className="text-xl text-green-600 transition-colors hover:text-blue-500 hover:cursor-pointer" />
            </UpdateUser>
            <DeleteUser user={params.row}>
              <AiFillDelete className="text-xl text-red-600 transition-colors hover:text-blue-500 hover:cursor-pointer" />
            </DeleteUser>
          </div>
        );
      },
    },
    { field: "role", headerName: "Role", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "createdAt", headerName: "Created At", width: 300 },
    { field: "_id", headerName: "ID", width: 250 },
  ];

  const rows = users.data.map((user) => {
    return {
      ...user,
      id: user._id,
      createdAt: formatDate(user.createdAt),
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

export default UsersTable;
