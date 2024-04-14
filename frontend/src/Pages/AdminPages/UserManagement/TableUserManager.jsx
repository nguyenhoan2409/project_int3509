import { Button, Chip } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TableUserManager({ rows = [], onAcceptRoleAdmin = (user) => {} }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Họ và tên</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">SĐT</StyledTableCell>
            <StyledTableCell align="right">Địa chỉ</StyledTableCell>
            <StyledTableCell align="right">Quyền</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length ? (
            rows.map((row) => (
              <StyledTableRow
                key={row?.user_id}
                sx={{
                  "& > td": {
                    color: (theme) =>
                      row?.role_id === 1 ? theme.palette.error.main : theme.palette.common.black,
                    fontWeight: row?.role_id === 1 ? "bold" : "normal",
                  },
                }}
              >
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontWeight: "bold",
                    color: (theme) =>
                      row?.role_id === 1 ? theme.palette.error.main : theme.palette.common.black,
                  }}
                >
                  {row?.user_id}
                </StyledTableCell>
                <StyledTableCell align="right">{row?.fullname}</StyledTableCell>
                <StyledTableCell align="right">{row?.email}</StyledTableCell>
                <StyledTableCell align="right">{row?.phone_number}</StyledTableCell>
                <StyledTableCell align="right">{row?.address}</StyledTableCell>
                <StyledTableCell align="right">
                  <Chip
                    label={row?.role_id === 1 ? "Admin" : "User"}
                    color={row?.role_id === 1 ? "error" : "primary"}
                    size="small"
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row?.role_id !== 1 ? (
                    <Button
                      onClick={() => onAcceptRoleAdmin?.(row)}
                      color="error"
                      variant="contained"
                      size="small"
                    >
                      Cấp quyền admin
                    </Button>
                  ) : null}
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell align="center" colSpan={7}>
                Chưa có dữ liệu
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
