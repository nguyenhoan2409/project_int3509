import React, { useEffect, useState, useMemo } from "react";
import Layout from "../../Layout/Layout";
import "./RequestAdmin.css";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { TabPanelRequestAdmin } from "./TabPanelRequestAdmin";
import { useTheme } from "@mui/material/styles";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, reset } from "~/features/authSlice";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}


export const RequestAdmin = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  const theme = useTheme(); 
  const [value, setValue] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [orderListToBeAccepted, setOrderListToBeAccepted] = useState([]); 
  const [orderListAccepted, setOrderListAccepted] = useState([]); 
  const [orderListDenied, setOrderListDenied] = useState([]); 
  const [orderListCompleted, setOrderListCompleted] = useState([]); 
  const [openSnackBar, setOpenSnackBar] = useState(false); 
  const [msg, setMsg] = useState("");
  const [messageStackBar, setMessageStackBar] = useState("");
  
  const getAllOrder = async () => {
    try {
      const response1 = await axios.get(`http://localhost:8080/order/getAllOrder`, {
        withCredentials: true,
      });

      const response2 = await axios.get('http://localhost:8080/certificate/getAll', {
        withCredentials: true,
      })

      const response = [...response1?.data, ...response2?.data]; 
      response.map((order, index) => {
        order.rental_time = moment.utc(order.rental_time).format('DD-MM-YYYY, HH:mm:ss')
        order.return_time = moment.utc(order.return_time).format('DD-MM-YYYY, HH:mm:ss')
      });
      setOrderList(response);
      setOrderListToBeAccepted(response.filter(order => order.status == 1 || order.status == 5 || order.status == 9 || order.status == 13)); 
      setOrderListAccepted(response.filter(order => order.status == 2 || order.status == 6 || order.status == 10 || order.status == 14)); 
      setOrderListDenied(response.filter(order => order.status == 3 || order.status == 7 || order.status == 11 || order.status == 15)); 
      setOrderListCompleted(response.filter(order => order.status == 4 || order.status == 8 || order.status == 12 || order.status == 16))
    } catch (error) {
      if (error?.response?.data?.msg?.message === "jwt expired") { 
        dispatch(reset());
        dispatch(LogOut());
        navigate("/");
      }
      if (error?.response) {
        setMsg(error?.response?.data?.msg);
      }
    }
  };

  useEffect(() => {
    getAllOrder();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleOpenSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    setMessageStackBar(''); 
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  return (
    <Layout>
      <div style={{marginLeft: '30px'}}>
      <div className="title">Quản lý yêu cầu</div>
      <Snackbar open={openSnackBar} autoHideDuration={5000} onClose={handleCloseSnackBar} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
        <Alert
          onClose={handleCloseSnackBar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {messageStackBar}
        </Alert>
      </Snackbar>
      <div style={{ marginRight: '20px'}}>
        <Box
          sx={{
            bgcolor: "background.paper",
            width: "100%",
            "& .MuiAppBar-root": { backgroundColor: "#007e43" },
            "& .MuiTabs-indicator": { backgroundColor: "white" },
            
          }}
        >
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Đang chờ phê duyệt" {...a11yProps(0)} />
              <Tab label="Đã xác nhận" {...a11yProps(1)} />
              <Tab label="Đã từ chối" {...a11yProps(2)} />
              <Tab label="Đã hoàn thành" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <TabPanelRequestAdmin orderList={orderListToBeAccepted} getAllOrder={getAllOrder} index={value} 
              handleOpenSnackBar={handleOpenSnackBar} handleCloseSnackBar={handleCloseSnackBar} setMessageStackBar={setMessageStackBar}/>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <TabPanelRequestAdmin orderList={orderListAccepted} getAllOrder={getAllOrder} index={value}
              handleOpenSnackBar={handleOpenSnackBar} handleCloseSnackBar={handleCloseSnackBar} setMessageStackBar={setMessageStackBar}/>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <TabPanelRequestAdmin orderList={orderListDenied} getAllOrder={getAllOrder} index={value}
              handleOpenSnackBar={handleOpenSnackBar} handleCloseSnackBar={handleCloseSnackBar} setMessageStackBar={setMessageStackBar}/>
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              <TabPanelRequestAdmin orderList={orderListCompleted} getAllOrder={getAllOrder} index={value}
              handleOpenSnackBar={handleOpenSnackBar} handleCloseSnackBar={handleCloseSnackBar} setMessageStackBar={setMessageStackBar}/>
            </TabPanel>
          </SwipeableViews>
        </Box>
      </div>
    </div>
    </Layout>
  );
};
