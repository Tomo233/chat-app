import TablePagination from "@mui/material/TablePagination";
import { MouseEvent, useState } from "react";
import ProfileImage from "../../assets/profile.png";

export default function Contacts() {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  // Handle page change for pagination
  const handleChangePage = (
    _: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // Example data for contacts - make sure this array has enough entries
  const rows = Array.from({ length: 25 }, (_, index) => ({
    userName: `User ${index + 1}`,
    firstName: `First ${index + 1}`,
    lastName: `Last ${index + 1}`,
    email: `user${index + 1}@example.com`,
  }));

  // Calculate empty rows for pagination
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // Slice rows based on current page
  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="max-w-full  bg-primaryPurple text-white overflow-hidden">
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
                    src={ProfileImage}
                    className="h-12 w-12 rounded-full"
                    alt="Profile"
                  />
                  <span>{row.userName}</span>
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
                component="div"
                rowsPerPageOptions={[]} // Disable dropdown for rows per page
                count={rows.length} // Total number of rows
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
