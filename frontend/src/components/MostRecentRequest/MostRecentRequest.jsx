import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./MostRecentRequest.scss";

const rows = [
  {
    id: 100,
    product: "Bóng đá",
    customer: "Trang",
    date: "2024-04-15",
    amount: 0,
    status: "Đã gửi yêu cầu",
  },
  {
    id: 101,
    product: "Bóng đá",
    customer: "Trang",
    date: "2024-04-15",
    amount: 0,
    status: "Đã gửi yêu cầu",
  },
  {
    id: 102,
    product: "Bóng đá",
    customer: "Trang",
    date: "2024-04-15",
    amount: 0,
    status: "Đã gửi yêu cầu",
  },
  {
    id: 103,
    product: "Bóng đá",
    customer: "Trang",
    date: "2024-04-15",
    amount: 0,
    status: "Đã gửi yêu cầu",
  },
  {
    id: 104,
    product: "Bóng đá",
    customer: "Trang",
    date: "2024-04-15",
    amount: 0,
    status: "Đã gửi yêu cầu",
  },

];

const List = () => {
  return (
    <div className="list">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Tracking ID</TableCell>
              <TableCell className="tableCell">Loại yêu cầu</TableCell>
              <TableCell className="tableCell">Họ tên sinh viên</TableCell>
              <TableCell className="tableCell">Ngày</TableCell>
              <TableCell className="tableCell">Chi phí</TableCell>
              <TableCell className="tableCell">Trạng thái</TableCell>
              <TableCell className="tableCell">Chi tiết</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.id}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    {row.product}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.customer}</TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">{row.amount}</TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell>
                <TableCell className="tableCell"> <span className="detail"> Xem chi tiết </span></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default List;
