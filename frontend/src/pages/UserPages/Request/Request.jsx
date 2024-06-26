import React, { useEffect, useState, useMemo } from "react";
import axios from "~/hooks/use-axios";
import "./Request.css";
import Layout from "../../../components/Layout/Layout";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import * as locales from "@mui/material/locale";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { IoMdClose } from "react-icons/io";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import moment from "moment/moment";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { useJwtExpiration } from "~/hooks/use-jwt-expired";

export const Request = () => {
  const theme = useTheme();
  const [initialOrderList, setInitialOrderList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [msg, setMsg] = useState("");
  const [productName, setProductName] = useState("");
  const [rentalDate, setRentalDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [selectedOrderDetail, setSelectedOrderDetail] = useState({});
  const [open, setOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const {user} = useSelector((state) => state.auth); 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleJwtExpired = useJwtExpiration(); 
  const themeWithLocale = useMemo(
    () => createTheme(theme, locales["viVN"]),
    []
  );
  const handleOpen = (row) => {
    setOpen(true);
    setSelectedOrderDetail(row);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedOrderDetail({});
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getUserOrders = async () => {
    try {
      const response1 = await axios.get(`/user/getMe`);

      const response2 = await axios.get(`/certificate/getById/${user?.user_id}`)

      const response = [...response1?.data.orderList, ...response2?.data]
      response.map((order, index) => {
        order.rental_time = moment
          .utc(order.rental_time)
          .format("DD-MM-YYYY, HH:mm:ss");
        order.return_time = moment
          .utc(order.return_time)
          .format("DD-MM-YYYY, HH:mm:ss");
      });
      setOrderList(response);
      setInitialOrderList(response);
    } catch (error) {
      handleJwtExpired(error); 
      setMsg(error?.response?.data?.msg);
    }
  };

  const getAllProduct = async () => {
    try {
      const response = await axios.get("/product/list");
      setProductList([...response.data, {product_id: 0, product_name: "Giấy chuẩn đầu ra"}]); 
    } catch (error) {
      handleJwtExpired(error); 
      setMsg(error?.response?.data?.msg);
    }
  };

  useEffect(() => {
    getUserOrders();
    getAllProduct();
  }, []);

  const handleFilter = () => {
    let orderedFilterList = initialOrderList;
    if (productName === 0) {
      orderedFilterList = orderedFilterList.filter(
        (order) => order.product_type == 4
      );
    }
    if (productName) {
      orderedFilterList = orderedFilterList.filter(
        (order) => order.product_id == productName
      );
    }
    if (rentalDate) {
      orderedFilterList = orderedFilterList.filter(
        (order) =>
          moment(order.rental_time, "DD-MM-YYYY, HH:mm:ss")
            .format("YYYY-MM-DD, HH:MM:SS")
            .slice(0, 10) == rentalDate
      );
    }
    if (returnDate) {
      orderedFilterList = orderedFilterList.filter(
        (order) =>
          moment(order.return_time, "DD-MM-YYYY, HH:mm:ss")
            .format("YYYY-MM-DD, HH:MM:SS")
            .slice(0, 10) == returnDate
      );
    }
    if (orderStatus) {
      let statusList = orderStatus.split(",");
      orderedFilterList = orderedFilterList.filter(
        (order) =>
          order.status == parseInt(statusList[0]) ||
          order.status == parseInt(statusList[1]) ||
          order.status == parseInt(statusList[2]) || 
          order.status == parseInt(statusList[3])
      );
    }
    setOrderList(orderedFilterList);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#006d3a",
      color: theme.palette.common.white,
    },
  }));

  const handleConfirmToCompleted = async (order_id, product_id, quantity) => {
    try {
      await axios.put(
        "/order/confirmOrderStatus",
        {
          orderId: order_id,
          productId: product_id,
          quantity: quantity,
          newStatus: 12,
        }
      );
      handleOpenSnackBar();
      getUserOrders();
    } catch (error) {
      setMsg(error.response.data.error);
    }
  };

  const handleOpenSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };
  return (
    <div className="request-container">
      <Layout>
        <div className="title">Danh sách các yêu cầu</div>
        <Snackbar
          open={openSnackBar}
          autoHideDuration={2000}
          onClose={handleCloseSnackBar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackBar}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Xác nhận đã nhận hàng thành công.
          </Alert>
        </Snackbar>
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
                    key={index}
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
              label="Ngày bắt đầu yêu cầu"
              InputLabelProps={{shrink: true}}
              size="small"
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "14px",
                },
              }}
            />
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <TextField
              type="date"
              variant="outlined"
              color="secondary"
              onChange={(e) => {
                setReturnDate(e.target.value);
              }}
              value={returnDate}
              fullWidth
              label="Ngày kết thúc yêu cầu dự kiến"
              InputLabelProps={{shrink: true}}
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

              <MenuItem value={"1,5,9,13"}>Đang chờ phê duyệt</MenuItem>
              <MenuItem value={"2,6,10,14"}>Yêu cầu được chấp nhận</MenuItem>
              <MenuItem value={"3,7,11,15"}>Yêu cầu bị từ chối</MenuItem>
              <MenuItem value={"4,8,12,16"}>Yêu cầu hoàn thành</MenuItem>
            </Select>
          </FormControl>

          <Button
            className="submitBtn-filter"
            variant="contained"
            size="medium"
            sx={{ textTransform: "none", m: "8px", backgroundColor: '#006d3a', 
            '&:hover': {
              opacity: 0.9, 
              backgroundColor: '#006d3a'
            } }}
            onClick={handleFilter}
            
          >
            Lọc
          </Button>

          <Button
            className="returnToDefaultBtn-filter"
            variant="contained"
            size="medium"
            sx={{ 
              textTransform: "none", 
              backgroundColor: '#006d3a', 
              '&:hover': {
                opacity: 0.9, 
                backgroundColor: '#006d3a'
              }
            }}
            onClick={() => {
              setOrderList(initialOrderList);
              setProductName("");
              setRentalDate("");
              setReturnDate("");
              setOrderStatus("");
            }}
          >
            Về mặc định
          </Button>
        </div>
        <div style={{ margin: "0 20px 0 20px" }}>
          <ThemeProvider theme={themeWithLocale}>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead sx={{ backgroundColor: "#006d3a" }}>
                    <TableRow>
                      <StyledTableCell style={{ minWidth: 80 }} key="id">
                        ID
                      </StyledTableCell>
                      <StyledTableCell style={{ minWidth: 50 }} key="product_name">
                        Tên sản phẩm
                      </StyledTableCell>
                      <StyledTableCell style={{ minWidth: 50 }} key="product_quantity">
                        Số lượng
                      </StyledTableCell>
                      <StyledTableCell style={{ minWidth: 150 }} key="start_time">
                        Thời gian bắt đầu
                      </StyledTableCell>
                      <StyledTableCell style={{ minWidth: 150 }} key="end_time">
                        Thời gian kết thúc
                      </StyledTableCell>
                      <StyledTableCell style={{ minWidth: 150 }} key="request_status">
                        Trạng thái yêu cầu
                      </StyledTableCell>
                      <StyledTableCell style={{ minWidth: 250 }} key="request_action">
                        Tác vụ
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderList.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                          Không có yêu cầu nào
                        </TableCell>
                      </TableRow>
                    ) : (
                      orderList
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              role="checkbox"
                              tabIndex={-1}
                              key={row.order_id}
                              hover
                            >
                              <TableCell>{row.order_id || row.certificate_id}</TableCell>
                              <TableCell>{row.product_name}</TableCell>
                              <TableCell>{row.quantity}</TableCell>
                              <TableCell>{row.rental_time}</TableCell>
                              <TableCell>{row.return_time}</TableCell>
                              <TableCell>{row.description}</TableCell>
                              <TableCell>
                                <div>
                                  <Button
                                    className="request-detail-btn"
                                    onClick={() => handleOpen(row)}
                                    sx={{ textTransform: "none" }}
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                  >
                                    Xem chi tiết
                                  </Button>
                                  <Modal
                                    className="modal-request-detail-container"
                                    open={open}
                                    row={row}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                    sx={{
                                      "& .MuiModal-backdrop": {
                                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                                      },
                                      "& .MuiBox-root": {
                                        fontFamily: '"Work Sans", sans-serif',
                                      },
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        width: 400,
                                        bgcolor: "background.paper",
                                        border: "2px solid #000",
                                        boxShadow: 24,
                                        p: 4,
                                      }}
                                    >
                                      <IoMdClose
                                        size={24}
                                        className="close-modal-button"
                                        onClick={handleClose}
                                      />
                                      <Typography
                                        id="modal-modal-title"
                                        variant="h6"
                                        component="h2"
                                        sx={{
                                          fontWeight: 600,
                                        }}
                                      >
                                        Thông tin chi tiết yêu cầu
                                      </Typography>
                                      <div className="modal-description">
                                        <div style={{ flex: 1 }}>ID:</div>
                                        <div style={{ flex: 1 }}>
                                          {selectedOrderDetail?.order_id || selectedOrderDetail?.certificate_id}
                                        </div>
                                      </div>
                                      <div className="modal-description">
                                        <div style={{ flex: 1 }}>
                                          Tên sản phẩm:
                                        </div>
                                        <div style={{ flex: 1 }}>
                                          {selectedOrderDetail?.product_name}
                                        </div>
                                      </div>
                                      <div className="modal-description">
                                        <div style={{ flex: 1 }}>Số lượng:</div>
                                        <div style={{ flex: 1 }}>
                                          {selectedOrderDetail?.quantity}
                                        </div>
                                      </div>
                                      <div className="modal-description">
                                        <div style={{ flex: 1 }}>
                                          Tổng tiền:
                                        </div>
                                        <div style={{ flex: 1 }}>
                                          {selectedOrderDetail?.total_money +
                                            "VNĐ"}
                                        </div>
                                      </div>
                                      <div className="modal-description">
                                        <div style={{ flex: 1 }}>
                                          Thời gian bắt đầu:
                                        </div>
                                        <div style={{ flex: 1 }}>
                                          {selectedOrderDetail?.rental_time}
                                        </div>
                                      </div>
                                      <div className="modal-description">
                                        <div style={{ flex: 1 }}>
                                          Thời gian kết thúc
                                        </div>
                                        <div style={{ flex: 1 }}>
                                          {selectedOrderDetail?.return_time}
                                        </div>
                                      </div>
                                      <div className="modal-description">
                                        <div style={{ flex: 1 }}>
                                          Trạng thái đơn hàng:
                                        </div>
                                        <div style={{ flex: 1 }}>
                                          {selectedOrderDetail?.description}
                                        </div>
                                      </div>
                                    </Box>
                                  </Modal>
                                  {row.status == 10 && (
                                    <Button
                                      sx={{
                                        textTransform: "none",
                                        marginLeft: "5px",
                                      }}
                                      onClick={() =>
                                        handleConfirmToCompleted(
                                          row.order_id,
                                          row.product_id,
                                          row.quantity
                                        )
                                      }
                                      variant="contained"
                                      color="success"
                                      size="small"
                                    >
                                      Đã nhận được hàng
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 100]}
                component="div"
                count={orderList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </ThemeProvider>
        </div>
      </Layout>
    </div>
  );
};