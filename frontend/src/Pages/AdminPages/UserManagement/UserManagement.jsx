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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, reset } from "~/features/authSlice";
import TablePagination from "@mui/material/TablePagination";


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
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  const [users, setUsers] = useState([]);
  const [userList, setUserList] = useState([]);
  const [initialUserList, setInitialUserList] = useState([]);
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [address, setAddress] = useState("");
  const [roleId, setRoleId] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/list", {
        withCredentials: true,
      });
      const users = response.data;
      setUsers(users.users);
      setUserList(users.users);
      setInitialUserList(users.users);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
      if (error?.response?.data?.msg?.message === "jwt expired") { 
        dispatch(reset());
        dispatch(LogOut());
        navigate("/");
      }
    }
  };
  useEffect(() => {
    getUsers();
  }, [name, email, phone_number, address, roleId]);

  const handleFilterUser = () => {
    let filteredUserList = initialUserList
    if(name) {
      filteredUserList = filteredUserList.filter(
        (user) => user.fullname == name
      )
    }
    if(email) {
      filteredUserList = filteredUserList.filter(
        (user) => user.email == email
      )
    }
    if(phone_number) {
      filteredUserList = filteredUserList.filter(
        (user) => user.phone_number == phone_number
      )
    }
    if(address) {
      filteredUserList = filteredUserList.filter(
        (user) => user.address == address
      )
    }
    if(roleId) {
      if(roleId === "Quản trị viên") {
        filteredUserList = filteredUserList.filter(
          (user) => user.role_id == 1
        )
      }
      if(roleId === "Người dùng") {
        filteredUserList = filteredUserList.filter(
          (user) => user.role_id == 2
        )
      }
    }
    setUsers(filteredUserList);
  };

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
          placeholder="Họ và tên ..."
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="search-user-input-admin"
          placeholder="Email ..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="search-user-input-admin"
          placeholder="SĐT ..."
          onChange={(e) => setPhone_number(e.target.value)}
        />
        <input
          className="search-user-input-admin"
          placeholder="Địa chỉ ..."
          onChange={(e) => setAddress(e.target.value)}
        />
         <select className="search-user-select-admin" onChange={(e) => setRoleId(e.target.value)} placeholder="Quyền">
           <option> -- Quyền -- </option>
           <option>Người dùng </option>
           <option>Quản trị viên </option>
          </select>

        <div className="search-btn-admin">
          <button
            className="search-user-btn-admin"
            onClick={handleFilterUser}
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">STT</StyledTableCell>
              <StyledTableCell align="right">Họ và tên</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">SĐT</StyledTableCell>
              <StyledTableCell align="right">Địa chỉ</StyledTableCell>
              <StyledTableCell align="right">Quyền</StyledTableCell>
              <StyledTableCell align="right">Thao tác</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        ).map((user, index) => (
              <StyledTableRow key={user.user_id}>
                <StyledTableCell align="right">{index +1}</StyledTableCell>
                <StyledTableCell align="right">{user.fullname}</StyledTableCell>
                <StyledTableCell align="right">{user.email}</StyledTableCell>
                <StyledTableCell align="right">{user.phone_number}</StyledTableCell>
                <StyledTableCell align="right">{user.address}</StyledTableCell>
                <StyledTableCell align="right">
                  {user.role_id === 1 ? (
                    "Quản trị viên"
                  ) : (
                    "Người dùng"
                  )}
                </StyledTableCell>
                <StyledTableCell align="right"> 
                    {user.role_id === 2 && 
                    <Button onClick={() => userToAdmin(user.user_id)}>
                      Cấp quyền admin
                    </Button> }
                    </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {users.length === 0 && <p className="no-data-user">Không có dữ liệu</p>}
            <TablePagination
                rowsPerPageOptions={[25, 100, 1000, 10000, 100000]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
      </TableContainer>
    </Layout>
  );
};
