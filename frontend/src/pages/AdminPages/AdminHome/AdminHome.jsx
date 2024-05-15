import { Backdrop, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMe, LogOut, reset } from "~/features/authSlice";
import Layout from "~/components/Layout/Layout";
import { AppView } from "~/sections/overview/view";
import "./AdminHome.scss";
import axios from "~/hooks/use-axios";
import { useJwtExpiration } from "~/hooks/use-jwt-expired";

export const AdminHome = () => {
  const dispatch = useDispatch();
  const [statisticalData, setStatisticalData] = useState(null);
  const [loading, setLoading] = useState(false); 
  const handleJwtExpired = useJwtExpiration(); 

  const getStatisticalData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/admin/statisticalData");
      setStatisticalData(response.data);
    } catch (error) {
      handleJwtExpired(error); 
      console.log(error);
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
            studentOverSubjects = {statisticalData?.standartSportOutputAchievedStudent || []}
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
