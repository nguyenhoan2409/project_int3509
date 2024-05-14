import React, { useEffect, useState } from "react";
import "./UserManagement.css";
import Layout from "~/components/Layout/Layout";
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
import { useJwtExpiration } from "~/hooks/use-jwt-expired";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#006d3a",
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
  const [initialUserList, setInitialUserList] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [address, setAddress] = useState("");
  const [roleId, setRoleId] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const handleJwtExpired = useJwtExpiration(); 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getUserList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/list", {
        withCredentials: true,
      });
      const users = response.data;
      setUsers(users.users);
      setInitialUserList(users.users);
    } catch (error) {
      handleJwtExpired(error); 
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };
  useEffect(() => {
    getUserList();
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
      getUserList();
    } catch (error) {
      handleJwtExpired(error); 
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };


  const updateUserToAdmin = async(user_id) => {
    const result = window.confirm('Bạn có chắc muốn thực hiện hành động này không?');
    if (result) {
        userToAdmin(user_id);
    } 
    }
  return (
    <Layout>
      <div className="title">Quản lý người dùng</div>

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

     <div style={{marginLeft : "20px", marginRight : "20px"}} >
     <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="customized table">
          <TableHead sx={{backgroundColor: "#006d3a"}}>
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
                <StyledTableCell align="right" className="stt">{index +1}</StyledTableCell>
                <StyledTableCell align="right" className="name">{user.fullname}</StyledTableCell>
                <StyledTableCell align="right" className="email">{user.email}</StyledTableCell>
                <StyledTableCell align="right" className="phone">{user.phone_number}</StyledTableCell>
                <StyledTableCell align="right" className="address">{user.address}</StyledTableCell>
                <StyledTableCell align="right" style={user.role_id === 1 ? {color: 'red'} : {color: '#007e43'}} className="role" id = {user.user_id}>
                  {user.role_id === 1 ? (
                    "Quản trị viên"
                  ) : (
                    "Người dùng"
                  )}
                </StyledTableCell>
                <StyledTableCell align="right" className="action" id = {user.user_id}> 
                    {user.role_id === 2 ? (
                      <div onClick={() => updateUserToAdmin(user.user_id)} style={{cursor: 'pointer', color: '#063678'}} id = {user.user_id}>
                      Cấp quyền admin
                    </div>
                    ) : (
                      <div id = {user.user_id}> </div>
                    )
                     }
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
     </div>
    </Layout>
  );
};
