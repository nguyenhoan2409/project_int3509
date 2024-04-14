import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const data = [
  {
    id: 1123004,
    date: "12-12-2021",
    status: "Completed",
    total: 1804,
  },
  {
    id: 96834,
    date: "12-03-2024",
    status: "Processing",
    total: 1004,
  },
  {
    id: 109234,
    date: "12-12-2021",
    status: "Completed",
    total: 1004,
  },

  {
    id: 109234,
    date: "12-12-2021",
    status: "Processing",
    total: 1004,
  },

  {
    id: 109234,
    date: "12-12-2021",
    status: "Processing",
    total: 1004,
  },

  {
    id: 109234,
    date: "12-12-2021",
    status: "Completed",
    total: 1004,
  },
];

export const YourOrders = () => {
  return (
    <>
      <Card sx={{ minWidth: 275, p: 2 }} component={Paper}>
        <CardHeader title={`My Order`} sx={{ mb: 5 }} />

        <CardContent>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">Order ID</TableCell>
                <TableCell className="tableCell">Date</TableCell>
                <TableCell className="tableCell">Status</TableCell>
                <TableCell className="tableCell">Total</TableCell>
                <TableCell className="tableCell">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="tableCell" sx={{ fontWeight: "bold" }}>
                    {item.id}
                  </TableCell>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">{item.date}</div>
                  </TableCell>
                  <TableCell className="tableCell">
                    <Chip
                      label={item.status}
                      color={item.status === "Completed" ? "success" : "primary"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell className="tableCell">{item.total}</TableCell>
                  <TableCell className="tableCell">
                    <Button variant="contained">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};
