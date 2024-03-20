import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { Navbar } from "~/Components/Navbar/Navbar";
import axios from "axios";
import "./Request.css";

export const Request = () => {
  const [orderList, setOrderList] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const getAllOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/order/getAllOrder`
        );
        setOrderList(response.data);
        console.log(response.data);
        console.log(orderList);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getAllOrder();
    console.log("hello");
  }, []);
  const autoSizeStrategy = {
    type: 'fitCellContents'
  }

  const [rowData, setRowData] = useState([
    {
      make: "Tesla",
      model: "Model Y",
      price: 64950,
      electric: true,
      month: "June",
    },
    {
      make: "Ford",
      model: "F-Series",
      price: 33850,
      electric: false,
      month: "October",
    },
    {
      make: "Toyota",
      model: "Corolla",
      price: 29600,
      electric: false,
      month: "August",
    },
    {
      make: "Mercedes",
      model: "EQA",
      price: 48890,
      electric: true,
      month: "February",
    },
    {
      make: "Fiat",
      model: "500",
      price: 15774,
      electric: false,
      month: "January",
    },
    {
      make: "Nissan",
      model: "Juke",
      price: 20675,
      electric: false,
      month: "March",
    },
    {
      make: "Vauxhall",
      model: "Corsa",
      price: 18460,
      electric: false,
      month: "July",
    },
    {
      make: "Volvo",
      model: "EX30",
      price: 33795,
      electric: true,
      month: "September",
    },
    {
      make: "Mercedes",
      model: "Maybach",
      price: 175720,
      electric: false,
      month: "December",
    },
    {
      make: "Vauxhall",
      model: "Astra",
      price: 25795,
      electric: false,
      month: "April",
    },
    {
      make: "Fiat",
      model: "Panda",
      price: 13724,
      electric: false,
      month: "November",
    },
    {
      make: "Jaguar",
      model: "I-PACE",
      price: 69425,
      electric: true,
      month: "May",
    },
  ]);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "order_id",
      headerName: 'STT'
    },
    { field: "product_name", headerName: 'Tên sản phẩm'},
    { field: "quantity" , headerName: 'Số lượng'},
    {
      field: "total_money", headerName: 'Tổng tiền', type: 'autoSizeStrategy'
    },
    {
      field: "rental_time", headerName: 'Thời gian bắt đầu yêu cầu'
    },
    {
      field: "return_time", headerName: 'Thời gian kết thúc yêu cầu'
    },
    {
      field: "description", headerName: 'Trạng thái yêu cầu'
    },

  ]);

  return (
    <div className="request-container">
      <Navbar />

      <div className="title">Danh sách các yêu cầu</div>

      <div className="ag-theme-alpine" style={{ height: 500 }}>
        <AgGridReact
          rowData={orderList}
          columnDefs={columnDefs}
          autoSizeStrategy={autoSizeStrategy}
          pagination={true}
          paginationPageSize={8}
          paginationPageSizeSelector={[8, 10, 100]}
        />
      </div>
    </div>
  );
};
