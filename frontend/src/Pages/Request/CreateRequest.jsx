import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Stack,
  MenuItem,
  IconButton,
} from "@mui/material";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useRoutes,
} from "react-router-dom";
import "./Request.css";
import Layout from "../Layout/Layout";
import { RiSubtractFill } from "react-icons/ri";
import { IoIosAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import moment from "moment";

export const CreateRequest = () => {
  const { product_id } = useParams();
  const {user} = useSelector(state => state.auth); 
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [totalMoney, setTotalMoney] = useState("");
  const [timelineId, setTimelineId] = useState("");
  const [rentalDate, setRentalDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [note, setNote] = useState("");
  const [timelineList, setTimelineList] = useState([]);
  const [phone, setPhone] = useState(user?.phone_number); 
  const [address, setAddress] = useState(user?.address); 
  const [msg, setMsg] = useState("");

  const [errorRentalDate, setErrorRentalDate] = useState("");
  const [errorReturnDate, setErrorReturnDate] = useState("");
  const [errorTimeline, setErrorTimeline] = useState("");
  const [errorTotalMoney, setErrorTotalMoney] = useState("");
  const navigate = useNavigate();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const handleOpenSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };
  

  const validate = (type) => {
    switch (type) {
      case "rentalDate":
        if (!rentalDate) {
          setErrorRentalDate("Vui lòng nhập ngày bắt đầu yêu cầu.");
        }
        break;
      case "returnDate":
        if (!returnDate) {
          setErrorReturnDate("Vui lòng nhập ngày kết thúc yêu cầu dự kiến.");
        }
        if (returnDate && returnDate < rentalDate) {
          setErrorReturnDate("Ngày kết thúc không thể sau ngày bắt đầu.");
        }
        break;
      case "timeline":
        if (!timelineId) {
          setErrorTimeline("Vui lòng lựa chọn khung giờ");
        }
        break;
      case "totalMoney":
        if (!totalMoney) {
          setErrorTotalMoney("Vui lòng nhập tổng số tiền");
        }
        break;
      default:
        alert("Type không hợp lệ");
    }
  };

  const getTimelineList = async () => {
    try {
      const res = await axios.get("http://localhost:8080/timeline/getAll", {
        withCredentials: true,
      });
      setTimelineList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/product/detail/${product_id}`, {withCredentials: true}
      );
      setTotalMoney(response.data[0].price);
      setProduct(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  const sizeClothes = [
    {
      value: "S",
      label: "S",
    },
    {
      value: "M",
      label: "M",
    },
    {
      value: "L",
      label: "L",
    },
    {
      value: "XL",
      label: "XL",
    },
    {
      value: "XXL",
      label: "XXL",
    },
  ];

  useEffect(() => {
    getTimelineList();
    getProductDetail();
  }, []);


  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setTotalMoney((quantity - 1) * product.price);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    setTotalMoney((quantity + 1) * product.price);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      validate("rentalDate");
      validate("returnDate");
      validate("timeline");
      if (rentalDate && returnDate && timelineId && !errorReturnDate) {
        const res = await axios.post(
          "http://localhost:8080/order/createOrder",
          {
            user_id: user?.user_id,
            product_id: product.product_id,
            quantity: product.product_type == 3 ? 1 : parseInt(quantity),
            total_money: product.product_type == 1 ? 0 : totalMoney,
            timeline_id: parseInt(timelineId),
            rental_date: rentalDate,
            return_date: returnDate,
            status:
              product.product_type == 1 ? 1 : product.product_type == 2 ? 9 : 5,
            note: note,
          },
          { withCredentials: true }
        );
        handleOpenSnackBar();
        setTimeout(() => {
          navigate("/request");
        }, 1000);
      }
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };

  const handleSubmitForBuying = async (e) => {
    try {
      e.preventDefault(); 
      const res = await axios.post(
        "http://localhost:8080/order/createOrder",
        {
          user_id: user?.user_id,
          product_id: product.product_id,
          quantity: product.product_type == 3 ? 1 : parseInt(quantity),
          total_money: product.product_type == 1 ? 0 : totalMoney,
          timeline_id: null,
          rental_date: moment().locale('vi').format('YYYY-MM-DD'),
          return_date: moment().locale('vi').add(5, "days").format('YYYY-MM-DD'),
          status: 9,
          note: (!note) ? ('M' + ', ' + phone + ', ' + address) : (note + ', ' + phone + ', ' + address)
        },
        { withCredentials: true }
      );
      handleOpenSnackBar();
      setTimeout(() => {
        navigate("/request");
      }, 1000);
    } catch (error) {
      console.log(error); 
      setMsg(error.response.data.message);
    }
  }

  return (
    <Layout>
      <h2 className="createRequestTitle">Tạo yêu cầu</h2>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={1000}
        onClose={handleOpenSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Yêu cầu đã được tạo thành công, đang chuyển hướng...
        </Alert>
      </Snackbar>
      <div className="createRequestContainer">
        <div className="create-request-container-left">
          <img
            src={product.thumbnail}
            alt="thumbnail"
            className="create-request-productImg"
          />
          <p className="create-request-productName">{product.product_name}</p>
        </div>
        <div className="create-request-container-right">
          <form onSubmit={(product.product_type == 2) ? handleSubmitForBuying : handleSubmit} className="create-request-form-container">
            {(product.product_type != 2) && <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="date"
                variant="outlined"
                color="secondary"
                onChange={(e) => {
                  setRentalDate(e.target.value);
                  setMsg("");
                  setErrorRentalDate("");
                }}
                value={rentalDate}
                fullWidth
                error={!!errorRentalDate}
                helperText={errorRentalDate}
                label="Ngày bắt đầu yêu cầu"
                sx={{ mb: 4 }}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                type="date"
                variant="outlined"
                color="secondary"
                onChange={(e) => {
                  setReturnDate(e.target.value);
                  setMsg("");
                  setErrorReturnDate("");
                }}
                onBlur={() => validate("returnDate")}
                value={returnDate}
                fullWidth
                error={!!errorReturnDate}
                helperText={errorReturnDate}
                label="Ngày kết thúc yêu cầu dự kiến"
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 4 }}
              />
            </Stack>}

            {(product.product_type == 2) && <TextField
                label="Địa chỉ"
                fullWidth
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 4 }}
            />}

            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              {(product.product_type != 2) && <TextField
                name="createRequest-timeline"
                id="outlined-select-currency"
                select
                label="Lựa chọn khung giờ"
                defaultValue=""
                value={timelineId}
                onChange={(e) => {
                  setTimelineId(e.target.value);
                  setMsg("");
                  setErrorTimeline("");
                }}
                color="secondary"
                error={!!errorTimeline}
                helperText={errorTimeline}
                sx={{ flex: 1 }}
              >
                {timelineList.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>}

              {(product.product_type == 2) && <TextField
                label="Số điện thoại"
                fullWidth
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                InputLabelProps={{ shrink: true }}
              />}

              {product.product_type != 3 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onClick={decreaseQuantity}
                    className="create-request-changeQuantity"
                  >
                    <RiSubtractFill />
                  </IconButton>
                  <TextField
                    type="number"
                    label="Số lượng"
                    value={quantity}
                    InputProps={{ inputProps: { min: 1 } }}
                    onChange={(e) => {
                      setQuantity(parseInt(e.target.value));
                      setTotalMoney(parseInt(e.target.value) * product.price);
                      setMsg("");
                    }}
                    onBlur={() => {
                      if (!quantity || quantity == 0) {setQuantity(1); setTotalMoney(product.price)}; 
                    }}
                    sx={{ margin: "0 10px 0 10px" }}
                  />
                  <IconButton
                    onClick={increaseQuantity}
                    className="create-request-changeQuantity"
                  >
                    <IoIosAdd />
                  </IconButton>
                </div>
              )}
            </Stack>

            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              {(product.product_type == 2) && <TextField
                id="outlined-select-currency"
                select
                label="Kích cỡ"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                fullWidth
              >
                {sizeClothes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>}

              {product.product_type != 1 && (
                <TextField
                  type="number"
                  variant="outlined"
                  color="secondary"
                  label="Tổng số tiền"
                  onChange={(e) => {
                    setTotalMoney(e.target.value);
                    setMsg("");
                    setErrorTotalMoney("");
                  }}
                  value={totalMoney}
                  fullWidth
                  error={!!errorTotalMoney}
                  helperText={errorTotalMoney}
                  sx={{ mb: 4 }}
                  disabled
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">VNĐ</InputAdornment>
                    ),
                  }}
                />
              )}
            </Stack>

            {product.product_type != 2 && (
              <TextField
                id="outlined-multiline-flexible"
                label="Lời ghi chú"
                multiline
                maxRows={4}
                fullWidth
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              />
            )}
            <p style={{ color: "red", marginBottom: "10px", fontSize: "14px" }} className="errorInfo">
              {msg}
            </p>
            <Button
              variant="outlined"
              type="submit"
              className="createRequestBtn"
            >
              Tạo yêu cầu
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};
