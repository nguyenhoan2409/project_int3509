import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./List.scss";

const rows = [
  {
    id: 2117383933399,
    product: "Food Crusher & Blender",
    customer: "Lee Martin",
    date: "27th September",
    amount: 300,
    method: "Cash on Delivery",
    status: "Approved",
  },
  {
    id: 6617772543119,
    product: "Nexus 32Inch TV",
    customer: "Sebastian Walker",
    date: "5th February",
    amount: 100,
    method: "Online Payment",
    status: "Pending",
  },
  {
    id: 200116351133,
    product: "Scanfrost 4-Burner Gas Cooker",
    customer: "Lopez Williams",
    date: "1st June",
    amount: 200,
    method: "Online Payment",
    status: "Approved",
  },
  {
    id: 22567721541,
    product: "Bluetooth Multimedia Speakers",
    customer: "Alexander White",
    date: "21st August",
    amount: 160,
    method: "Cash on Delivery",
    status: "Pending",
  },
  {
    id: 2117383933398,
    product: "Lenovo Ideapad",
    customer: "Garcia Davis",
    date: "16th February",
    amount: 570,
    method: "Online Payment",
    status: "Approved",
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
              <TableCell className="tableCell">Payment Method</TableCell>
              <TableCell className="tableCell">Trạng thái</TableCell>
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
                <TableCell className="tableCell">{row.method}</TableCell>
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
