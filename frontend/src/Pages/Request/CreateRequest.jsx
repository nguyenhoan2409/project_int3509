import React, { useState } from "react";
import { Navbar } from "~/Components/Navbar/Navbar";
import { TextField, Button, Container, Stack, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import "./Request.css";

export const CreateRequest = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(firstName, lastName, email, dateOfBirth, password);
  }

  const currencies = [
    {
      value: "1",
      label: "7h-8h50",
    },
    {
      value: "2",
      label: "9h-11h50",
    },
    {
      value: "3",
      label: "13h-14h50",
    },
    {
      value: "4",
      label: "15h-16h50",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="createRequestContainer">
        <h2 className="createRequestTitle">Tạo yêu cầu</h2>
        <form onSubmit={handleSubmit} action={<Link to="/login" />}>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Tên sản phẩm"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              fullWidth
              required
            />
            <TextField
              type="number"
              variant="outlined"
              color="secondary"
              label="Số lượng"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              fullWidth
              required
            />
          </Stack>
          <TextField
            type="email"
            variant="outlined"
            color="secondary"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            fullWidth
            required
            sx={{ mb: 4 }}
          />
          <TextField
            type="number"
            variant="outlined"
            color="secondary"
            label="Tổng giá tiền"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            fullWidth
            sx={{ mb: 4 }}
          />

          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="date"
              variant="outlined"
              color="secondary"
              label="Ngày bắt đầu yêu cầu"
              onChange={(e) => setDateOfBirth(e.target.value)}
              value={dateOfBirth}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Lựa chọn"
              defaultValue=""
              color="secondary"
              helperText="Vui lòng chọn giờ bắt đầu yêu cầu"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="date"
              variant="outlined"
              color="secondary"
              label="Ngày kết thúc yêu cầu dự kiến"
              onChange={(e) => setDateOfBirth(e.target.value)}
              value={dateOfBirth}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Lựa chọn"
              defaultValue=""
              helperText="Vui lòng chọn giờ kết thúc yêu cầu"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Button variant="outlined" color="success" type="submit">
            Tạo yêu cầu
          </Button>
        </form>
      </div>
    </div>
  );
};
