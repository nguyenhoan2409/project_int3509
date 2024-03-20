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
          paginationPageSize={5}
          paginationPageSizeSelector={[5, 10, 100]}
        />
      </div>
    </div>
  );
};
