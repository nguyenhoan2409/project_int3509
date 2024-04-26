import { Backdrop, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMe, LogOut, reset } from "~/features/authSlice";
import Layout from "~/Pages/Layout/Layout";
import { AppView } from "~/sections/overview/view";
import "./AdminHome.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AdminHome = () => {
  const dispatch = useDispatch();
  const [statisticalData, setStatisticalData] = useState(null);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const getStatisticalData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/admin/statisticalData", {
        withCredentials: true,
      });
      // console.log(`response::`, response.data);
      setStatisticalData(response.data);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg?.message === "jwt expired") { 
        dispatch(reset());
        dispatch(LogOut());
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getMe());
    getStatisticalData();
  }, []);

  return (
    <Layout>
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        {loading ? (
          <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : statisticalData ? (
          <AppView
            totalOrder={statisticalData?.totalOrders || 0}
            totalOrderWaiting={statisticalData?.totalAwaitingOrders || 0}
            totalAcceptedOrders={statisticalData?.totalAcceptedOrders || 0}
            totalDeniedOrders={statisticalData?.totalDeniedOrders || 0}
            totalCompletedOrders={statisticalData?.totalCompletedOrders || 0}
            totalPrice={statisticalData?.totalRevenue || 0}
            totalStudentStandard={statisticalData?.totalStandardOuputAchievedStudents || 0}
            studentStandardOutput={
              statisticalData?.standartOutput || [
                {
                  label: "Đạt",
                  value: 1,
                },
                {
                  label: "Không đạt",
                  value: 68,
                },
              ]
            }
            orders={statisticalData?.recentlyOrders || []}
          />
        ) : (
          <h1>Chưa có dữ liệu thống kê</h1>
        )}
      </Container>
    </Layout>
  );
};
