import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./Request.css";
import { AG_GRID_LOCALE_EN } from "~/assets/localeFile/locale";
import Layout from "../Layout/Layout";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, TextField } from "@mui/material";

export const Request = () => {
  const [initialOrderList, setInitialOrderList] = useState([]); 
  const [orderList, setOrderList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [msg, setMsg] = useState("");
  const [productName, setProductName] = useState("");
  const [rentalDate, setRentalDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  const autoSizeStrategy = {
    type: "fitCellContents",
  };

  const getAllOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user/getMe`, {
        withCredentials: true,
      });
      response.data.orderList.map((order, index) => {
        order.rental_time = new Date(order.rental_time).toISOString().replace('T', ', ').replace(/\.\d+Z$/, ''); 
        order.return_time = new Date(order.return_time).toISOString().replace('T', ', ').replace(/\.\d+Z$/, ''); 
      })
      setOrderList(response.data.orderList);
      setInitialOrderList(response.data.orderList); 
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const getAllProduct = async () => {
    try {
      const response = await axios.get("http://localhost:8080/product/list", {
        withCredentials: true,
      });
      setProductList(response.data);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    getAllOrder();
    getAllProduct();
  }, []);


  const handleFilter = () => {
    let orderedFilterList = initialOrderList; 
    if (productName) {
      orderedFilterList = (orderedFilterList.filter(order => order.product_id == productName));
    } 
    if (rentalDate) {
      orderedFilterList = orderedFilterList.filter(order => order.rental_time.slice(0, 10) == rentalDate)
    }
    if (returnDate) {
      orderedFilterList = orderedFilterList.filter(order => order.return_time.slice(0, 10) == returnDate)
    }
    if (orderStatus) {
      let statusList = orderStatus.split(',');  
      orderedFilterList = orderedFilterList.filter(order => order.status == parseInt(statusList[0]) || order.status == parseInt(statusList[1]) || order.status == parseInt(statusList[2]))
    }
    setOrderList(orderedFilterList); 
  }

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Mã yêu cầu",
      field: "order_id",
    },
    {
      field: "product_name",
      headerName: "Tên sản phẩm",
    },
    { field: "quantity", headerName: "Số lượng" },
    {
      field: "total_money",
      headerName: "Tổng tiền",
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
      suppressSizeToFit: true,
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
    };
  }, []);

  return (
    <div className="request-container">
      <Layout>
        <div className="title">Danh sách các yêu cầu</div>
        <div className="request-filter-container">
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="demo-select-small-label" sx={{ fontSize: "14px" }}>
              Tên sản phẩm
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={productName}
              label="Tên sản phẩm"
              onChange={(e) => {
                setProductName(e.target.value);
              }}
              sx={{ fontSize: "14px" }}
            >
              <MenuItem value="" sx={{ fontSize: "14px" }}>
                <em>--Lựa chọn--</em>
              </MenuItem>
              {productList.map((product, index) => {
                return (
                  <MenuItem
                    value={product.product_id}
                    sx={{ fontSize: "14px" }}
                  >
                    {product.product_name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <TextField
              type="date"
              variant="outlined"
              color="secondary"
              onChange={(e) => {
                setRentalDate(e.target.value);
              }}
              value={rentalDate}
              fullWidth
              helperText={"Ngày bắt đầu yêu cầu"}
              size="small"
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "14px",
                },
              }}
            />
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <TextField
              type="date"
              variant="outlined"
              color="secondary"
              onChange={(e) => {
                setReturnDate(e.target.value);
              }}
              value={returnDate}
              fullWidth
              helperText={"Ngày kết thúc yêu cầu dự kiến"}
              size="small"
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "14px",
                },
              }}
            />
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
            <InputLabel id="demo-select-small-label" sx={{ fontSize: "14px" }}>
              Trạng thái yêu cầu
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={orderStatus}
              label="Trạng thái yêu cầu"
              onChange={(e) => {
                setOrderStatus(e.target.value);
              }}
              sx={{ fontSize: "14px" }}
            >
              <MenuItem value="" sx={{ fontSize: "14px" }}>
                <em>--Lựa chọn--</em>
              </MenuItem>

              <MenuItem value={'1,5,9'}>Đang chờ phê duyệt</MenuItem>
              <MenuItem value={'2,6,10'}>Yêu cầu được chấp nhận</MenuItem>
              <MenuItem value={'3,7,11'}>Yêu cầu bị từ chối</MenuItem>
              <MenuItem value={'4,8,12'}>Yêu cầu hoàn thành</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            size="small"
            sx={{ textTransform: "none", m: "8px"}}
            onClick={handleFilter}
            color="success"
          >
            Lọc
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{ textTransform: "none" }}
            onClick={() => {
              setOrderList(initialOrderList); 
              setProductName(''); 
              setRentalDate(''); 
              setReturnDate(''); 
              setOrderStatus(''); 
            }}
            color="success"
          >
            Về mặc định
          </Button>
        </div>
        <div
          className="ag-theme-quartz"
          style={{
            height: 350,
            alignSelf: "center",
            marginLeft: "50px",
            marginRight: "50px",
          }}
        >
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
