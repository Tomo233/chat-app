import TablePagination from "@mui/material/TablePagination";
import { MouseEvent, useState } from "react";
import DefaultUserImage from "../../assets/default-user.png";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { UserInfo } from "../../services/authentication";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Box, Menu, MenuItem } from "@mui/material";

export default function Contacts() {
  const [page, setPage] = useState(0);
  const rowsPerPage = 8;

  const users = useFirestoreCollection<UserInfo>("users");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Sets the clicked button as the anchor element
  };

  const handleClose = () => {
    setAnchorEl(null); // Closes the menu by resetting the anchor element
  };

  // Calculate empty rows for pagination
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  // Slice rows based on current paged
  const paginatedRows = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (
    _: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <div className="max-w-full  bg-primaryPurple text-white overflow-hidden">
      <div className="flex justify-between items-center p-3">
        <h1 className="text-3xl font-medium">Contacts List</h1>
        <div className="flex gap-3">
          <Box>
            <button
              className="border border-secondaryPurple px-8 py-2 rounded-3xl"
              onClick={handleOpen}
            >
              <SwapVertIcon sx={{ fontSize: "2rem" }} />
              <span>Sort</span>
            </button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                "& .MuiMenu-list": {
                  backgroundColor: "#6e54b5",
                  border: "1px solid #7c7676",
                },
              }}
            >
              <MenuItem
                sx={{
                  backgroundColor: "#6e54b5",
                  color: "#fff",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #7c7676",

                  "&:hover": {
                    backgroundColor: "#6e54b5",
                  },
                }}
              >
                Name A-Z
              </MenuItem>
              <MenuItem
                sx={{
                  backgroundColor: "#6e54b5",
                  paddingTop: "10px",

                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#6e54b5",
                  },
                }}
              >
                Name Z-A
              </MenuItem>
            </Menu>
          </Box>
        </div>
      </div>
      <table className="w-full text-left">
        <thead className="bg-secondaryPurple">
          <tr>
            <th className="p-2">User Name & Avatar</th>
            <th className="p-2">First Name</th>
            <th className="p-2">Last Name</th>
            <th className="p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((row, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="p-2">
                <div className="flex items-center gap-3">
                  <img
                    src={DefaultUserImage}
                    className="h-12 w-12 rounded-full"
                    alt="DefaultUserImage"
                  />
                  <span>
                    {row.firstName} {row.lastName}
                  </span>
                </div>
              </td>
              <td className="p-2">{row.firstName}</td>
              <td className="p-2">{row.lastName}</td>
              <td className="p-2">{row.email}</td>
            </tr>
          ))}
          {emptyRows > 0 && (
            <tr className="h-10">
              <td colSpan={4}></td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>
              <TablePagination
                className="bg-secondaryPurple"
                sx={{
                  color: "white",
                }}
                component="div"
                rowsPerPageOptions={[]} // Disable dropdown for rows per page
                count={users.length} // Total number of rows
                rowsPerPage={rowsPerPage} // Fixed to 10 rows per page
                page={page}
                onPageChange={handleChangePage}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
