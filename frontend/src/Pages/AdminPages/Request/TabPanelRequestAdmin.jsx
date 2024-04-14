import React, { useEffect, useState, useMemo } from "react";
import "./RequestAdmin.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import Modal from "@mui/material/Modal";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Stack, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IoMdClose } from "react-icons/io";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const TabPanelRequestAdmin = ({
  orderList,
  getAllOrder,
  index,
  handleOpenSnackBar,
  handleCloseSnackBar,
  setMessageStackBar,
}) => {
  const theme = useTheme();
  const [initialOrderList, setInitialOrderList] = useState(orderList);
  const [productList, setProductList] = useState([]);
  const [msg, setMsg] = useState("");
  const [productName, setProductName] = useState("");
  const [rentalDate, setRentalDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const themeWithLocale = useMemo(() => createTheme(theme, locales["viVN"]), []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#007e43",
      color: theme.palette.common.white,
    },
  }));

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

  const handleConfirmToApproved = async (order_id, product_id, quantity, status) => {
    try {
      await axios.put(
        "http://localhost:8080/order/confirmOrderStatus",
        {
          orderId: order_id,
          productId: product_id,
          quantity: quantity,
          newStatus: status == 1 ? 2 : status == 5 ? 6 : 10,
        },
        { withCredentials: true }
      );
      setMessageStackBar("Đã chấp nhận yêu cầu thành công");
      handleOpenSnackBar();
      getAllOrder();
    } catch (error) {
      setMsg(error.response.data.error);
    }
  };

  const handleConfirmToDenied = async (order_id, product_id, quantity, status) => {
    try {
      await axios.put(
        "http://localhost:8080/order/confirmOrderStatus",
        {
          orderId: order_id,
          productId: product_id,
          quantity: quantity,
          newStatus: status == 1 ? 3 : status == 5 ? 7 : 11,
        },
        { withCredentials: true }
      );
      setMessageStackBar("Đã từ chối yêu cầu thành công");
      handleOpenSnackBar();
      getAllOrder();
    } catch (error) {
      setMsg(error.response.data.error);
    }
  };

  const handleConfirmToCompleted = async (order_id, product_id, quantity, status) => {
    try {
      await axios.put(
        "http://localhost:8080/order/confirmOrderStatus",
        {
          orderId: order_id,
          productId: product_id,
          quantity: quantity,
          newStatus: status == 2 ? 4 : status == 6 ? 8 : 12,
        },
        { withCredentials: true }
      );

      setMessageStackBar("Yêu cầu đã hoàn tất và cập nhật thành công");
      handleOpenSnackBar();
      getAllOrder();
    } catch (error) {
      setMsg(error.response.data.error);
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
    setInitialOrderList(orderList);
  }, [orderList]);

  useEffect(() => {
    getAllProduct();
    // getAllOrder();
  }, []);

  const handleFilter = () => {
    let orderedFilterList = orderList;
    if (productName) {
      orderedFilterList = orderedFilterList.filter((order) => order.product_id == productName);
    }
    if (rentalDate) {
      orderedFilterList = orderedFilterList.filter(
        (order) => order.rental_time.slice(0, 10) == rentalDate
      );
    }
    if (returnDate) {
      orderedFilterList = orderedFilterList.filter(
        (order) => order.return_time.slice(0, 10) == returnDate
      );
    }
    if (orderStatus) {
      let statusList = orderStatus.split(",");
      orderedFilterList = orderedFilterList.filter(
        (order) =>
          order.status == parseInt(statusList[0]) ||
          order.status == parseInt(statusList[1]) ||
          order.status == parseInt(statusList[2])
      );
    }
    setInitialOrderList(orderedFilterList);
  };

  return (
    <div>
      <div>
        <FormControl sx={{ mt: 1, ml: 0, mr: 1, mb: 1, minWidth: 150 }} size="small">
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
                <MenuItem value={product.product_id} sx={{ fontSize: "14px" }}>
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

            <MenuItem value={"1,5,9"}>Đang chờ phê duyệt</MenuItem>
            <MenuItem value={"2,6,10"}>Yêu cầu được chấp nhận</MenuItem>
            <MenuItem value={"3,7,11"}>Yêu cầu bị từ chối</MenuItem>
            <MenuItem value={"4,8,12"}>Yêu cầu hoàn thành</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          size="small"
          sx={{ textTransform: "none", m: "8px" }}
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
            setInitialOrderList(orderList);
            setProductName("");
            setRentalDate("");
            setReturnDate("");
            setOrderStatus("");
          }}
          color="success"
        >
          Về mặc định
        </Button>
      </div>

      <div>
        <ThemeProvider theme={themeWithLocale}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 450 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead sx={{ backgroundColor: "green" }}>
                  <TableRow>
                    <StyledTableCell style={{ minWidth: 80 }}>ID</StyledTableCell>
                    <StyledTableCell style={{ minWidth: 50 }}>Tên sản phẩm</StyledTableCell>
                    <StyledTableCell style={{ minWidth: 50 }}>Số lượng</StyledTableCell>
                    <StyledTableCell style={{ minWidth: 150 }}>Thời gian bắt đầu</StyledTableCell>
                    <StyledTableCell style={{ minWidth: 150 }}>
                      Thời gian kết thúc {index == 3 ? "" : "dự kiến"}
                    </StyledTableCell>
                    <StyledTableCell style={{ minWidth: 150 }}>Trạng thái yêu cầu</StyledTableCell>
                    <StyledTableCell style={{ minWidth: 280 }}>Tác vụ</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {initialOrderList.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                        Không có yêu cầu nào
                      </TableCell>
                      {/* Replace numberOfColumns with the actual number of columns in your table */}
                    </TableRow>
                  ) : (
                    initialOrderList
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        return (
                          <TableRow role="checkbox" tabIndex={-1} key={row.order_id} hover>
                            <TableCell>{row.order_id}</TableCell>
                            <TableCell>{row.product_name}</TableCell>
                            <TableCell>{row.quantity}</TableCell>
                            <TableCell>{row.rental_time}</TableCell>
                            <TableCell>{row.return_time}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>
                              <div>
                                <Button
                                  onClick={() => handleOpen(row)}
                                  sx={{ textTransform: "none" }}
                                  variant="contained"
                                  color="secondary"
                                  size="small"
                                >
                                  Xem chi tiết
                                </Button>
                                <Modal
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
                                  <Box sx={style}>
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
                                    <Typography
                                      id="modal-modal-description"
                                      sx={{ mt: 2, display: "flex" }}
                                    >
                                      <div style={{ flex: 1 }}>ID:</div>
                                      <div style={{ flex: 1 }}>
                                        {selectedOrderDetail ? selectedOrderDetail.order_id : ""}
                                      </div>
                                    </Typography>
                                    <Typography
                                      id="modal-modal-description"
                                      sx={{ mt: 2, display: "flex" }}
                                    >
                                      <div style={{ flex: 1 }}>Tên người tạo yêu cầu:</div>
                                      <div style={{ flex: 1 }}>
                                        {selectedOrderDetail ? selectedOrderDetail.fullname : ""}
                                      </div>
                                    </Typography>
                                    <Typography
                                      id="modal-modal-description"
                                      sx={{ mt: 2, display: "flex" }}
                                    >
                                      <div style={{ flex: 1 }}>Tên sản phẩm:</div>
                                      <div style={{ flex: 1 }}>
                                        {selectedOrderDetail
                                          ? selectedOrderDetail.product_name
                                          : ""}
                                      </div>
                                    </Typography>
                                    <Typography
                                      id="modal-modal-description"
                                      sx={{ mt: 2, display: "flex" }}
                                    >
                                      <div style={{ flex: 1 }}>Số lượng:</div>
                                      <div style={{ flex: 1 }}>
                                        {selectedOrderDetail ? selectedOrderDetail.quantity : ""}
                                      </div>
                                    </Typography>
                                    <Typography
                                      id="modal-modal-description"
                                      sx={{ mt: 2, display: "flex" }}
                                    >
                                      <div style={{ flex: 1 }}>Tổng tiền:</div>
                                      <div style={{ flex: 1 }}>
                                        {selectedOrderDetail
                                          ? selectedOrderDetail.total_money + "VNĐ"
                                          : ""}
                                      </div>
                                    </Typography>
                                    <Typography
                                      id="modal-modal-description"
                                      sx={{ mt: 2, display: "flex" }}
                                    >
                                      <div style={{ flex: 1 }}>Thời gian bắt đầu:</div>
                                      <div style={{ flex: 1 }}>
                                        {selectedOrderDetail ? selectedOrderDetail.rental_time : ""}
                                      </div>
                                    </Typography>
                                    <Typography
                                      id="modal-modal-description"
                                      sx={{ mt: 2, display: "flex" }}
                                    >
                                      <div style={{ flex: 1 }}>
                                        Thời gian kết thúc {index == 3 ? ":" : "dự kiến:"}
                                      </div>
                                      <div style={{ flex: 1 }}>
                                        {selectedOrderDetail ? selectedOrderDetail.return_time : ""}
                                      </div>
                                    </Typography>
                                    <Typography
                                      id="modal-modal-description"
                                      sx={{ mt: 2, display: "flex" }}
                                    >
                                      <div style={{ flex: 1 }}>Trạng thái đơn hàng:</div>
                                      <div style={{ flex: 1 }}>
                                        {selectedOrderDetail ? selectedOrderDetail.description : ""}
                                      </div>
                                    </Typography>
                                  </Box>
                                </Modal>
                                {(row.status == 1 || row.status == 5 || row.status == 9) && (
                                  <Button
                                    onClick={() => {
                                      handleConfirmToApproved(
                                        row.order_id,
                                        row.product_id,
                                        row.quantity,
                                        row.status
                                      );
                                    }}
                                    sx={{ textTransform: "none", marginLeft: "5px" }}
                                    variant="contained"
                                    color="success"
                                    size="small"
                                  >
                                    Chấp nhận
                                  </Button>
                                )}

                                {(row.status == 1 || row.status == 5 || row.status == 9) && (
                                  <Button
                                    onClick={() => {
                                      handleConfirmToDenied(
                                        row.order_id,
                                        row.product_id,
                                        row.quantity,
                                        row.status
                                      );
                                    }}
                                    sx={{ textTransform: "none", marginLeft: "5px" }}
                                    variant="contained"
                                    color="error"
                                    size="small"
                                  >
                                    Từ chối
                                  </Button>
                                )}

                                {(row.status == 2 || row.status == 6 || row.status == 7) && (
                                  <Button
                                    onClick={() => {
                                      handleConfirmToCompleted(
                                        row.order_id,
                                        row.product_id,
                                        row.quantity,
                                        row.status
                                      );
                                    }}
                                    sx={{ textTransform: "none", marginLeft: "5px" }}
                                    variant="contained"
                                    color="error"
                                    size="small"
                                  >
                                    Xác nhận hoàn tất
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
              count={initialOrderList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </ThemeProvider>
      </div>
    </div>
  );
};
