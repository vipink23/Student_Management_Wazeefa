import {
  Box,
  Button,
  Divider,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ModalForm from "../Pages/Modal";
import CreateStaffModal from "../Pages/CreateStaffModal";

export default function DataTable({ TableTitle, data = [], columns = [] }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const isPermissionPage = window.location.pathname === "/PermissionMaster";

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          p: 3,
        }}
      >
        <Typography variant="h6" component="div">
          {TableTitle} INFO
        </Typography>

        {!isPermissionPage && (
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Add +
          </Button>
        )}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Table */}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {Array.isArray(columns) &&
                columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || "left"}
                    style={{ minWidth: column.minWidth || 100 }}
                  >
                    {column.label}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.isArray(data) &&
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id || index}
                  >
                    {columns.map((column) => {
                      let value;

                      if (column.id === "slno") {
                        value = page * rowsPerPage + index + 1;
                      } else {
                        value = row[column.id];
                      }

                      return (
                        <TableCell key={column.id} align={column.align || "left"}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={Array.isArray(data) ? data.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal */}
      {location.pathname ==="/StaffMaster" ? <CreateStaffModal open={open} handleClose={handleCloseModal} title={TableTitle} /> : <ModalForm open={open} handleClose={handleCloseModal} title={TableTitle} />}

    </Paper>
  );
}
