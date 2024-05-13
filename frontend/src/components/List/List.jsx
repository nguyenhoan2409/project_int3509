import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import "./List.scss";

const defaults = [
  {
    user_id: 2117383933399,
    fullname: "Lee Martin",
    rental_time: new Date(),
    product_id: 300,
    status: 1,
  },
  {
    user_id: 6617772543119,
    fullname: "Sebastian Walker",
    rental_time: new Date(),
    product_id: 100,
    status: 1,
  },
  {
    user_id: 200116351133,
    fullname: "Lopez Williams",
    rental_time: new Date(),
    product_id: 200,
    status: 1,
  },
  {
    user_id: 22567721541,
    fullname: "Alexander White",
    rental_time: new Date(),
    product_id: 160,
    status: 1,
  },
  {
    user_id: 2117383933399,
    fullname: "Garcia Davis",
    rental_time: new Date(),
    product_id: 570,
    status: 1,
  },
];

const formatTime = (date) => {
  // Lấy thời gian hiện tại
  var currentDate = new Date(date);

  // Lấy ngày, tháng, năm
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0
  var year = currentDate.getFullYear();

  // Lấy giờ, phút, giây
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();

  // Định dạng lại ngày tháng năm và giờ phút giây
  var formattedDate =
    (day < 10 ? "0" : "") + day + "/" + (month < 10 ? "0" : "") + month + "/" + year;
  var formattedTime =
    (hours < 10 ? "0" : "") +
    hours +
    ":" +
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds;

  // Hiển thị kết quả
  return formattedDate + " " + formattedTime;
};

const List = ({ rows = defaults }) => {
  return (
    <div className="list">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">ID</TableCell>
              <TableCell className="tableCell">Sản phẩm</TableCell>
              <TableCell className="tableCell">Họ tên sinh viên</TableCell>
              <TableCell className="tableCell">Thời gian</TableCell>
              <TableCell className="tableCell">Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row?.order_id}>
                <TableCell className="tableCell">{row?.order_id || "unKnow"}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">{row?.product_name || "unKnow"}</div>
                </TableCell>
                <TableCell className="tableCell">{row?.fullname || "Không xác định"}</TableCell>
                <TableCell className="tableCell">
                  {row?.rental_time ? formatTime(row.rental_time) : "unKnow"}
                </TableCell>
                <TableCell className="tableCell">{row?.description || "unKnow"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default List;
