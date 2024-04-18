import { faker } from "@faker-js/faker";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

import AppConversionRates from "../app-conversion-rates";
import AppCurrentSubject from "../app-current-subject";
import AppCurrentVisits from "../app-current-visits";
import AppNewsUpdate from "../app-news-update";
import AppOrderTimeline from "../app-order-timeline";
import AppWebsiteVisits from "../app-website-visits";
import AppWidgetSummary from "../app-widget-summary";
import { MdOutlineSummarize, MdCancelPresentation, MdIncompleteCircle, MdOutlineConfirmationNumber  } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { TbSum } from "react-icons/tb";
import { GiConfirmed } from "react-icons/gi";
import axios from "axios";
import { useEffect, useState } from "react";

// ----------------------------------------------------------------------

export default function AppView() {
  const [statisticalData, setStatisticalData] = useState(); 
  const getStatisticalData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/statisticalData', {withCredentials: true});  
      if (response.data) {
        setStatisticalData(response.data); 
      }
    } catch (error) {
      console.log(error); 
    }
  }

  useEffect(() => {
    getStatisticalData(); 
  }, []); 
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Doanh thu"
            total={statisticalData?.totalRevenue}
            color="success"
            icon={<MdOutlineSummarize size={30}/>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Sinh viên đạt chuẩn đầu ra"
            total={statisticalData?.totalStandardOuputAchievedStudents}
            color="info"
            icon={<PiStudent size={30}/>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Tổng số lượng yêu cầu"
            total={statisticalData?.totalOrders}
            color="info"
            icon={<TbSum size={30}/>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Yêu cầu đợi chấp nhận"
            total={statisticalData?.totalAwaitingOrders}
            color="success"
            icon={<MdOutlineConfirmationNumber size={30}/>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Yêu cầu cần xác nhận hoàn tất"
            total={statisticalData?.totalAcceptedOrders}
            color="success"
            icon={<MdIncompleteCircle size={30}/>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Yêu cầu đã từ chối"
            total={statisticalData?.totalDeniedOrders}
            color="error"
            icon={<MdCancelPresentation size={30}/>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Yêu cầu đã hoàn tất"
            total={statisticalData?.totalCompletedOrders}
            color="success"
            icon={<GiConfirmed size={30}/>}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Tỷ lệ sinh viên qua môn"
            subheader=""
            chart={{
              series: statisticalData?.standartSportOutputAchievedStudent,
            }}
          />
        </Grid> */}
        

        {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Tỷ lệ sinh viên đạt chuẩn đầu ra"
            chart={{
              series: statisticalData?.standartOutput,
            }}
          />
        </Grid> */}


        <Grid xs={12} md={6} lg={12}>
          <AppNewsUpdate
            title="Yêu cầu gần nhất"
            list={statisticalData?.recentlyOrders}
          />
        </Grid>

      </Grid>
    </Container>
  );
}
