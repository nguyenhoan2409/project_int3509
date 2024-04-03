import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState, useMemo } from "react";
import { Navbar } from "~/Components/Navbar/Navbar";
import axios from "axios";
import "./Request.css";
import { Footer } from "~/Components/Footer/Footer";
import { AG_GRID_LOCALE_EN } from "~/assets/localeFile/locale";
import Layout from "../Layout/Layout";

export const Request = () => {
  const [orderList, setOrderList] = useState([]);
  const [msg, setMsg] = useState("");
  const autoSizeStrategy = {
    type: "fitCellContents",
  };

  useEffect(() => {
    const getAllOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/getMe`, {
          withCredentials: true,
        });
        setOrderList(response.data.orderList);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getAllOrder();
  }, []);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "order_id",
      headerName: "STT",
    },
    {
      field: "product_name",
      filter: true,
      headerName: "Tên sản phẩm",
    },
    { field: "quantity", headerName: "Số lượng" },
    {
      field: "total_money",
      headerName: "Tổng tiền",
      type: "autoSizeStrategy",
    },
    {
      field: "rental_time",
      headerName: "Thời gian bắt đầu yêu cầu",
    },
    {
      field: "return_time",
      headerName: "Thời gian kết thúc yêu cầu",
    },
    {
      field: "description",
      headerName: "Trạng thái yêu cầu",
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: true,
      floatingFilter: true,
    };
  }, []);

  return (
    <div className="request-container">
      <Layout>
        <div className="title">Danh sách các yêu cầu</div>

        <div className="ag-theme-alpine" style={{ height: 500 }}>
          <AgGridReact
            rowData={orderList}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoSizeStrategy={autoSizeStrategy}
            localeText={AG_GRID_LOCALE_EN}
            pagination={true}
            paginationPageSize={5}
            paginationPageSizeSelector={[5, 10, 100]}
          />
        </div>
      </Layout>
    </div>
  );
};
