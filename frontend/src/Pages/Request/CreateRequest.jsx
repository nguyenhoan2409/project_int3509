import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Stack,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Request.css";
import Layout from "../Layout/Layout";
import { RiSubtractFill } from "react-icons/ri";
import { IoIosAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import axios from "axios";
import {useParams} from 'react-router-dom'

export const CreateRequest = () => {
  const {id} = useParams()
  const [quantity, setQuantity] = useState(1);
  const [totalMoney, setTotalMoney] = useState("");
  const [timelineId, setTimelineId] = useState("");
  const [rentalDate, setRentalDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [timelineList, setTimelineList] = useState([]);
  const [msg, setMsg] = useState("");

  const [errorRentalDate, setErrorRentalDate] = useState("");
  const [errorReturnDate, setErrorReturnDate] = useState("");
  const [errorTimeline, setErrorTimeline] = useState("");
  const [errorTotalMoney, setErrorTotalMoney] = useState("");
  const [product, setProduct] = useState([]);

  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

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

  useEffect(() => {
    getTimelineList();
  }, []);

  useEffect(() => {
    if (user) {
      setUserInfo(user);
    }
    if (isError) {
      console.log(isError);
    }
  }, [user, isError]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      validate("rentalDate");
      validate("returnDate");
      validate("timeline");
      validate("totalMoney");
      if (rentalDate && returnDate && timelineId && totalMoney) {
        const res = await axios.post(
          "http://localhost:8080/order/createOrder",
          {
            user_id: userInfo.user_id,
            product_id: product.product_id,
            quantity: parseInt(quantity),
            total_money: totalMoney,
            timeline_id: parseInt(timelineId),
            rental_date: rentalDate,
            return_date: returnDate,
            status: 6,
          },
          { withCredentials: true }
        );
        navigate("/request");
      }
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };

  const getDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/product/detail/${id}`);
      const product = response.data;
      setProduct(product[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  }
  useEffect(() => {
    getDetail();
  }, []);

  return (
    <Layout>
      <h2 className="createRequestTitle">Tạo yêu cầu</h2>
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
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
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
                helperText={errorRentalDate || "Ngày bắt đầu yêu cầu"}
                sx={{ mb: 4 }}
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
                value={returnDate}
                fullWidth
                error={!!errorReturnDate}
                helperText={errorReturnDate || "Ngày kết thúc yêu cầu dự kiến"}
                sx={{ mb: 4 }}
              />
            </Stack>

            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
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
              </TextField>

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
                    setQuantity(e.target.value);
                    setMsg("");
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
            </Stack>

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
            />
            <p style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>
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
