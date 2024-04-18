import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import "./List.scss";

const rows = [
  {
    order_id: 13,
    user_id: 20020455,
    product_id: "1",
    customer: "Phùng Thị Ngọc",
    return_time: "2024-04-09 13:37:24",
    status: "5",
  },

  {
    order_id: 14,
    user_id: 20020465,
    product_id: "4",
    customer: "Phùng Thị Ngọc",
    return_time: "2024-04-09 13:37:24",
    status: "8",
  },

  {
    order_id: 15,
    user_id: 20020455,
    product_id: "8",
    customer: "Phùng Thị Ngọc",
    return_time: "2024-04-09 13:37:24",
    status: "4",
  },

  {
    order_id: 1,
    user_id: 208020455,
    product_id: "8",
    customer: "Phùng Thị Ngọc",
    return_time: "2024-04-09 13:37:24",
    status: "5",
  },
  
  
];

const List = ({list}) => {
  return (
    <div className="list">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">MSSV</TableCell>
              <TableCell className="tableCell">Sản phẩm</TableCell>
              <TableCell className="tableCell">Họ tên sinh viên</TableCell>
              <TableCell className="tableCell">Thời gian</TableCell>
              <TableCell className="tableCell">Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list?.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.user_id}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">{row.product_id}</div>
                </TableCell>
                <TableCell className="tableCell">{row.rental_time}</TableCell>
                <TableCell className="tableCell">{row.return_time}</TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default List;
