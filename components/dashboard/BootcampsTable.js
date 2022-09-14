import { useState } from "react";
import formatDate from "../../helpers/formatDate";

// Components
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import UpdateBootcamp from "../bootcamps/UpdateBootcamp";
import NextLink from "../ui/NextLink";
import { AiFillEdit } from "react-icons/ai";

function BootcampsTable({ bootcamps }) {
  const [isOpen, setIsOpen] = useState(false);
  const [bootcamp, setBootcamp] = useState({});

  const editClickHandler = (bootcamp) => {
    setBootcamp(bootcamp);
    setIsOpen(true);
  };

  const columns = [
    {
      field: "edit",
      headerName: "",
      width: 50,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <AiFillEdit
          onClick={() => editClickHandler(params.row)}
          className="text-xl text-green-600 transition-colors hover:text-blue-500 hover:cursor-pointer"
        />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => (
        <NextLink
          className="text-blue-500 hover:underline hover:text-blue-400 transition-colors"
          href={`/bootcamps/${params.row.id}`}
        >
          {params.row.name}
        </NextLink>
      ),
    },
    { field: "user", headerName: "User ID", width: 250 },
    { field: "createdAt", headerName: "Created At", width: 300 },
    { field: "_id", headerName: "ID", width: 250 },
  ];

  const rows = bootcamps.data.map((bootcamp) => {
    return {
      ...bootcamp,
      createdAt: formatDate(bootcamp.createdAt),
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
      {isOpen && (
        <UpdateBootcamp
          bootcamp={bootcamp}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
}

export default BootcampsTable;
