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
  // const [statisticalData, setStatisticalData] = useState(); 
  // const getStatisticalData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8080/admin/statisticalData', {withCredentials: true});  
  //     setStatisticalData(response.data); 
  //   } catch (error) {
  //     console.log(error); 
  //   }
  // }

  const statisticalData = 
  {
    "totalOrders": 18,
    "totalAwaitingOrders": 8,
    "totalAcceptedOrders": 2,
    "totalDeniedOrders": 1,
    "totalCompletedOrders": 7,
    "totalRevenue": 1790000,
    "recentlyOrders": [
        {
            "order_id": 23,
            "user_id": 20020407,
            "product_id": 11,
            "quantity": 1,
            "total_money": 340000,
            "timeline": null,
            "rental_time": "2024-04-16T14:32:03.000Z",
            "return_time": "2024-04-21T14:32:03.000Z",
            "status": 10,
            "note": "L, 0384839345, Ha Noi"
        },
        {
            "order_id": 20,
            "user_id": 20020001,
            "product_id": 11,
            "quantity": 1,
            "total_money": 340000,
            "timeline": 2,
            "rental_time": "2024-04-16T09:00:00.000Z",
            "return_time": "2024-04-16T11:53:46.000Z",
            "status": 12,
            "note": "S"
        },
        {
            "order_id": 24,
            "user_id": 20020407,
            "product_id": 8,
            "quantity": 1,
            "total_money": 300000,
            "timeline": 1,
            "rental_time": "2024-04-16T07:00:00.000Z",
            "return_time": "2024-04-16T08:50:00.000Z",
            "status": 5,
            "note": ""
        },
        {
            "order_id": 17,
            "user_id": 20020407,
            "product_id": 1,
            "quantity": 15,
            "total_money": 0,
            "timeline": 1,
            "rental_time": "2024-04-14T07:00:00.000Z",
            "return_time": "2024-04-14T08:50:00.000Z",
            "status": 1,
            "note": null
        },
        {
            "order_id": 18,
            "user_id": 20020407,
            "product_id": 5,
            "quantity": 15,
            "total_money": 0,
            "timeline": 1,
            "rental_time": "2024-04-14T07:00:00.000Z",
            "return_time": "2024-04-14T08:50:00.000Z",
            "status": 1,
            "note": "Please accept as soon as possible"
        }
    ],
    "totalStandardOuputAchievedStudents": 1,
    "standartSportOutputAchievedStudent": [
        {
            "label": "Bóng đá",
            "value": 100,
            "passedCount": 69,
            "totalCount": 69
        },
        {
            "label": "Bóng bàn",
            "value": 100,
            "passedCount": 1,
            "totalCount": 1
        },
        {
            "label": "Bóng chuyền hơi",
            "value": null,
            "passedCount": 0,
            "totalCount": 0
        },
        {
            "label": "Bóng rổ",
            "value": 95.65217391304348,
            "passedCount": 66,
            "totalCount": 69
        },
        {
            "label": "Cầu lông",
            "value": null,
            "passedCount": 0,
            "totalCount": 0
        },
        {
            "label": "Bóng chuyền da",
            "value": 100,
            "passedCount": 1,
            "totalCount": 1
        },
        {
            "label": "Võ taekwondo",
            "value": null,
            "passedCount": 0,
            "totalCount": 0
        },
        {
            "label": "Golf",
            "value": 100,
            "passedCount": 1,
            "totalCount": 1
        }
    ],
    "standartOutput": [
        {
            "label": "Đạt",
            "value": 1
        },
        {
            "label": "Không đạt",
            "value": 68
        }
    ]
}
  // useEffect(() => {
  //   getStatisticalData(); 
  // }, []); 
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Doanh thu"
            total={statisticalData.totalRevenue}
            color="success"
            icon={<MdOutlineSummarize size={30}/>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Sinh viên đạt chuẩn đầu ra"
            total={statisticalData.totalStandardOuputAchievedStudents}
            color="info"
            icon={<PiStudent size={30}/>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Tổng số lượng yêu cầu"
            total={statisticalData.totalOrders}
            color="info"
            icon={<TbSum size={30}/>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Yêu cầu đợi chấp nhận"
            total={statisticalData.totalAwaitingOrders}
            color="success"
            icon={<MdOutlineConfirmationNumber size={30}/>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Yêu cầu cần xác nhận hoàn tất"
            total={statisticalData.totalAcceptedOrders}
            color="success"
            icon={<MdIncompleteCircle size={30}/>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Yêu cầu đã từ chối"
            total={statisticalData.totalDeniedOrders}
            color="error"
            icon={<MdCancelPresentation size={30}/>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Yêu cầu đã hoàn tất"
            total={statisticalData.totalCompletedOrders}
            color="success"
            icon={<GiConfirmed size={30}/>}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Tỷ lệ sinh viên qua môn"
            subheader=""
            chart={{
              series: statisticalData.standartSportOutputAchievedStudent,
            }}
          />
        </Grid>
        

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Tỷ lệ sinh viên đạt chuẩn đầu ra"
            chart={{
              series: statisticalData.standartOutput,
            }}
          />
        </Grid>


        <Grid xs={12} md={6} lg={12}>
          <AppNewsUpdate
            title="Yêu cầu gần nhất"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

      </Grid>
    </Container>
  );
}
