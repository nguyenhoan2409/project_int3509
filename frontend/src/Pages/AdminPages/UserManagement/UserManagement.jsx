import React, { useEffect, useState } from "react";
import "./UserManagement.css";
import Layout from "~/Pages/Layout/Layout";
import { Box, Container, LinearProgress, Typography } from "@mui/material";
import { Button, Chip } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#007e43",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [userList, setUserList] = useState([]);
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/list", {
        withCredentials: true,
      });
      const users = response.data;
      setUsers(users.users);
      setUserList(users.users);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  const searchUser = () => {
    const filteredData = userList.filter((user) =>
      user.fullname.toLowerCase().includes(name.toLowerCase())
    );
    setUsers(filteredData);
    if (filteredData.length === 0) {
      setMsg("Không tìm thấy người dùng");
    } else {
      setMsg("");
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const userToAdmin = async (user_id) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/user/user-to-admin/${user_id}`,
        {
          role_id: 1,
        },
        { withCredentials: true }
      );
      getUsers();
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };
  return (
    <Layout>
      <Box
        sx={{
          textAlign: "center",
          p: 2,
          background: (theme) => theme.palette.grey["200"],
          color: (theme) => theme.palette.success.main,
        }}
      >
        <Typography variant="h5">Quản lý người dùng</Typography>
      </Box>

      <div className="search-user">
        <input
          className="search-user-input-admin"
          placeholder="Tra cứu ..."
          onChange={(e) => setName(e.target.value)}
        />
        <div className="search-btn-admin">
          <button
            className="search-score-btn-admin"
            onClick={() => searchUser()}
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">ID</StyledTableCell>
              <StyledTableCell align="right">Họ và tên</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">SĐT</StyledTableCell>
              <StyledTableCell align="right">Địa chỉ</StyledTableCell>
              <StyledTableCell align="right">Quyền</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users?.map((user) => (
              <StyledTableRow key={user._id}>
                <StyledTableCell align="right">{user.user_id}</StyledTableCell>
                <StyledTableCell align="right">{user.fullname}</StyledTableCell>
                <StyledTableCell align="right">{user.email}</StyledTableCell>
                <StyledTableCell align="right">
                  {user.phone_number}
                </StyledTableCell>
                <StyledTableCell align="right">{user.address}</StyledTableCell>
                <StyledTableCell align="right">
                  {user.role_id === 1 ? (
                    "Admin"
                  ) : (
                    <Button onClick={() => userToAdmin(user.user_id)}>
                      {" "}
                      Cấp quyền admin{" "}
                    </Button>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
            <StyledTableRow>
              <StyledTableCell align="center" colSpan={7}>
                {msg}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};
