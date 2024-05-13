
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
import { Button, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import { IoMdClose } from "react-icons/io";
import moment from "moment";

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

export const TabPanelRequestAdmin = ({ orderList, getAllOrder, index, handleOpenSnackBar, handleCloseSnackBar, setMessageStackBar}) => {
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
  const [checkExpired, setCheckExpired] = useState(""); 
  const themeWithLocale = useMemo(
    () => createTheme(theme, locales["viVN"]),
    []
  );

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#007e43',
      color: theme.palette.common.white,
    }
  }));

  const handleOpen = (row) => {setOpen(true); setSelectedOrderDetail(row)};
  const handleClose = () => {setOpen(false); setSelectedOrderDetail({});};

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleConfirmToApproved = async (order_id, product_id, quantity, status) => {
    try {
      await axios.put('http://localhost:8080/order/confirmOrderStatus', {
          orderId: order_id, 
          productId: product_id, 
          quantity: quantity, 
          newStatus: (status == 1) ? 2 : ((status == 5) ? 6 : 10)
      }, {withCredentials: true}); 
      setMessageStackBar('Đã chấp nhận yêu cầu thành công'); 
      handleOpenSnackBar(); 
      getAllOrder(); 
    } catch (error) {
      setMsg(error.response.data.error); 
    }
  }

  const handleConfirmToDenied = async (order_id, product_id, quantity, status) => {
    try {
      await axios.put('http://localhost:8080/order/confirmOrderStatus', {
          orderId: order_id, 
          productId: product_id, 
          quantity: quantity, 
          newStatus: (status == 1) ? 3 : ((status == 5) ? 7 : 11)
      }, {withCredentials: true}); 
      setMessageStackBar('Đã từ chối yêu cầu thành công')
      handleOpenSnackBar(); 
      getAllOrder();
    } catch (error) {
      setMsg(error.response.data.error); 
    }
  }

  const handleConfirmToCompleted = async (order_id, product_id, quantity, status) => {
    try {
      await axios.put('http://localhost:8080/order/confirmOrderStatus', {
          orderId: order_id, 
          productId: product_id, 
          quantity: quantity, 
          newStatus: (status == 2) ? 4 : ((status == 6) ? 8 : 12)
      }, {withCredentials: true}); 

      setMessageStackBar('Yêu cầu đã hoàn tất và cập nhật thành công')
      handleOpenSnackBar(); 
      getAllOrder();
    } catch (error) {
      setMsg(error.response.data.error); 
    }
  }

  const handleConfirmCertificate = async (certificate_id, status) => {
    try {
      await axios.patch('http://localhost:8080/certificate/confirm', {
          certificateId: certificate_id, 
          newStatus: status
      }, {withCredentials: true}); 
      setMessageStackBar((status === 14) ? 'Đã chấp nhận yêu cầu thành công' : ((status === 15) ? 'Đã từ chối yêu cầu thành công' : 'Yêu cầu đã hoàn tất và cập nhật thành công'));
      handleOpenSnackBar(); 
      getAllOrder();
    } catch (error) {
      setMsg(error?.response?.data?.error); 
    }
  }

  const getAllProduct = async () => {
    try {
      const response = await axios.get("http://localhost:8080/product/list", {
        withCredentials: true,
      });
      setProductList([...response.data, {product_id: 0, product_name: "Giấy chuẩn đầu ra"}]); 
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    setInitialOrderList(orderList); 
  }, [orderList])

  useEffect(() => {
    getAllProduct();
  }, []);


  const handleFilter = () => {
    let orderedFilterList = orderList;
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
        (order) => moment(order.rental_time, 'DD-MM-YYYY, HH:mm:ss').format('YYYY-MM-DD, HH:mm:ss').slice(0, 10) == rentalDate
      );
    }
    if (returnDate) {
      orderedFilterList = orderedFilterList.filter(
        (order) => moment(order.return_time, 'DD-MM-YYYY, HH:mm:ss').format('YYYY-MM-DD, HH:mm:ss').slice(0, 10) == returnDate
      );
    }
    if (checkExpired) {
      if (checkExpired == 2) {
        orderedFilterList = orderedFilterList.filter(
          (order) => moment().isBefore(moment(order.return_time, 'DD-MM-YYYY, HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')) == true
        )
      } else {
        orderedFilterList = orderedFilterList.filter(
          (order) => moment().isAfter(moment(order.return_time, 'DD-MM-YYYY, HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')) == true
        )
      }
    }
    setInitialOrderList(orderedFilterList);
  };


  return (
    <div>
      <div className="requestAdmin-filter-container">
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
            {productList?.map((product, index) => {
              return (
                <MenuItem value={product?.product_id} sx={{ fontSize: "14px" }} key={product?.product_id}>
                  {product?.product_name}
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
            InputLabelProps={{ shrink: true }}
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
            label={`Ngày kết thúc yêu cầu ${(index != 3) ? "dự kiến" : ""}`}
            InputLabelProps={{ shrink: true }}
            size="small"
            sx={{
              "& .MuiOutlinedInput-input": {
                fontSize: "14px",
              },
              width: '200px'
            }}
          />
        </FormControl>

        {(index == 1) && <FormControl sx={{ mt: 1, ml: 0, mr: 1, mb: 1, minWidth: 150 }} size="small">
          <InputLabel sx={{ fontSize: "14px" }}>
            Kiểm tra quá hạn
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            value={checkExpired}
            label="Kiểm tra quá hạn"
            onChange={(e) => {
              setCheckExpired(e.target.value);
            }}
            sx={{ fontSize: "14px" }}
          >
            <MenuItem value="" sx={{ fontSize: "14px" }}>
              <em>--Lựa chọn--</em>
            </MenuItem>
            {[{id: 1, value: 'Đã quá hạn'}, {id: 2, value: 'Chưa quá hạn'}].map((row, index) => {
              return (
                <MenuItem value={row.id} sx={{ fontSize: "14px" }} key={row.id}>
                  {row.value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>}

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
            setCheckExpired("");
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
                <TableHead sx={{backgroundColor: 'green'}}>
                  <TableRow>
                    <StyledTableCell style={{ minWidth: '7%' }}>ID</StyledTableCell>
                    <StyledTableCell style={{ minWidth: '10%' }}>Tên sản phẩm</StyledTableCell>
                    <StyledTableCell style={{ minWidth: '10%' }}>Số lượng</StyledTableCell>
                    <StyledTableCell style={{ minWidth: '30%' }}>Thời gian bắt đầu</StyledTableCell>
                    <StyledTableCell style={{ minWidth: '30%' }}>Thời gian kết thúc {(index == 3) ? '' : 'dự kiến'}</StyledTableCell>
                    {(index === 1) && <StyledTableCell style={{ minWidth: '20%' }}>Kiểm tra quá hạn</StyledTableCell>}
                    <StyledTableCell style={{ minWidth: '30%' }}>Trạng thái yêu cầu</StyledTableCell>
                    <StyledTableCell style={{ minWidth: '40%' }}>Tác vụ</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {initialOrderList.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} sx={{textAlign: 'center'}}>Không có yêu cầu nào</TableCell>
                    </TableRow>
                  ) : (
                    initialOrderList
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, rowIndex) => {
                        return (
                          <TableRow
                            role="checkbox"
                            tabIndex={-1}
                            key={rowIndex}
                            hover
                          >
                            <TableCell>{row?.order_id || row?.certificate_id}</TableCell>
                            <TableCell>{row.product_name}</TableCell>
                            <TableCell>{row.quantity}</TableCell>
                            <TableCell>{row.rental_time}</TableCell>
                            <TableCell>{row.return_time}</TableCell>
                            {(index === 1) && <TableCell>
                              {<div style={{backgroundColor: moment().isBefore(moment(row.return_time, 'DD-MM-YYYY, HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')) ? 'green' : 'red', color: 'white', textAlign: 'center'}}>
                                {moment().isBefore(moment(row.return_time, 'DD-MM-YYYY, HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')) ? 'Chưa quá hạn' : 'Đã quá hạn'}
                              </div>}
                            </TableCell>}
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
                                      fontFamily: '"Work Sans", sans-serif'
                                    }, 
                                  }}
                                >
                                  <Box sx={style}>
                                    <IoMdClose size={24} className="close-modal-button" onClick={handleClose}/>
                                    <Typography
                                      id="modal-modal-title"
                                      variant="h6"
                                      component="h2"
                                      sx={{
                                        fontWeight: 600
                                      }}
                                    >
                                      Thông tin chi tiết yêu cầu
                                    </Typography>
                                    <div className="modal-description"
                                    >
                                      <div style={{flex: 1}}>ID:</div>
                                      <div style={{flex: 1}}>{selectedOrderDetail?.order_id || selectedOrderDetail?.certificate_id}</div>
                                    </div>
                                    <div className="modal-description"
                                    >
                                      <div style={{flex: 1}}>Tên người tạo yêu cầu:</div>
                                      <div style={{flex: 1}}>{selectedOrderDetail?.fullname}</div>
                                    </div>
                                    {(selectedOrderDetail?.class) && 
                                    <div className="modal-description"
                                    >
                                      <div style={{flex: 1}}>Lớp:</div>
                                      <div style={{flex: 1}}>{selectedOrderDetail?.class}</div>
                                    </div>}
                                    <div className="modal-description"
                                    >
                                      <div style={{flex: 1}}>Email người tạo yêu cầu:</div>
                                      <div style={{flex: 1}}>{selectedOrderDetail?.email}</div>
                                    </div>
                                    <div className="modal-description"
                                    >
                                      <div style={{flex: 1}}>Số điện thoại:</div>
                                      <div style={{flex: 1}}>{selectedOrderDetail?.phone_number || selectedOrderDetail?.phonenumber}</div>
                                    </div>
                                    <div className="modal-description"
                                    >
                                      <div style={{flex: 1}}>Tên sản phẩm:</div>
                                      <div style={{flex: 1}}>{selectedOrderDetail?.product_name}</div>
                                    </div>
                                    <div className="modal-description"
                                    >
                                      <div style={{flex: 1}}>Số lượng:</div>
                                      <div style={{flex: 1}}>{selectedOrderDetail?.quantity}</div>
                                    </div>
                                    <div className="modal-description"
                                    >
                                      <div style={{flex: 1}}>Tổng tiền:</div>
                                      <div style={{flex: 1}}>{selectedOrderDetail?.total_money + 'VNĐ'}</div>
                                    </div>
                                    <div className="modal-description"
                                    >
                                      <div style={{flex: 1}}>Thời gian {(selectedOrderDetail?.product_type == 2 || selectedOrderDetail?.product_type == 4) ? 'tạo yêu cầu' : 'bắt đầu'}:</div>
                                      <div style={{flex: 1}}>{selectedOrderDetail?.rental_time}</div>
                                    </div>
                                    <div className="modal-description"
                                    >
                                      <div style={{flex: 1}}>Thời gian {(selectedOrderDetail?.product_type == 2) ? 'nhận hàng' : (selectedOrderDetail?.product_type == 4 ? 'nhận giấy chứng nhận' : 'kết thúc')} {(index == 3 ? ":" : 'dự kiến:')}</div>
                                      <div style={{flex: 1}}>{selectedOrderDetail?.return_time}</div>
                                    </div>
                                    <div className="modal-description"
                                    >
                                      <div style={{flex: 1}}>Trạng thái yêu cầu:</div>
                                      <div style={{flex: 1}}>{selectedOrderDetail?.description}</div>
                                    </div>
                                  </Box>
                                </Modal>
                                {(row.status == 1 || row.status == 5 || row.status == 9 || row.status == 13) && <Button
                                  onClick={() => {
                                    if (row.product_type != 4) {
                                      handleConfirmToApproved(row.order_id, row.product_id, row.quantity, row.status)
                                    } else {
                                      handleConfirmCertificate(row.certificate_id, 14); 
                                    }
                                  }
                                }
                                  sx={{ textTransform: "none", marginLeft: '5px'}}
                                  variant="contained"
                                  color="success"
                                  size="small"
                                  className="confirm-approved-btn"
                                >
                                  Chấp nhận
                                </Button>}

                                {(row.status == 1 || row.status == 5 || row.status == 9 || row.status == 13) && <Button
                                  onClick={() => {
                                    if (row.product_type != 4) handleConfirmToDenied(row.order_id, row.product_id, row.quantity, row.status)
                                    else handleConfirmCertificate(row.certificate_id, 15)
                                  }}
                                  sx={{ textTransform: "none", marginLeft: '5px' }}
                                  variant="contained"
                                  color="error"
                                  size="small"
                                  className="confirm-denied-btn"
                                >
                                  Từ chối
                                </Button>}

                                {(row.status == 2 || row.status == 6 || row.status == 10 || row.status == 14) && <Button
                                  onClick={() => {
                                    if(row.product_type != 4) handleConfirmToCompleted(row.order_id, row.product_id, row.quantity, row.status)
                                    else handleConfirmCertificate(row.certificate_id, 16)
                                  }}
                                  sx={{ textTransform: "none", marginLeft: '5px' }}
                                  variant="contained"
                                  color="error"
                                  size="small"
                                  className="confirm-completed-btn"
                                >
                                  Xác nhận hoàn tất
                                </Button>}
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
