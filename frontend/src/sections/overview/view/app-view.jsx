import { faker } from "@faker-js/faker";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import { useMemo } from "react";
import AppConversionRates from "../app-conversion-rates";
import AppCurrentVisits from "../app-current-visits";
import AppNewsUpdate from "../app-news-update";
import AppWidgetSummary from "../app-widget-summary";
import { MdOutlineSummarize, MdCancelPresentation, MdIncompleteCircle, MdOutlineConfirmationNumber  } from "react-icons/md";
import { PiStrategy, PiStudent } from "react-icons/pi";
import { TbSum } from "react-icons/tb";
import { GiConfirmed } from "react-icons/gi";

// ----------------------------------------------------------------------

const defaultDataStudentOverSubjects = [
  {
    label: "Bóng đá",
    value: 100,
    passedCount: 69,
    totalCount: 69,
  },
  {
    label: "Bóng bàn",
    value: 100,
    passedCount: 1,
    totalCount: 1,
  },
  {
    label: "Bóng chuyền hơi",
    value: null,
    passedCount: 0,
    totalCount: 0,
  },
  {
    label: "Bóng rổ",
    value: 95.65217391304348,
    passedCount: 66,
    totalCount: 69,
  },
  {
    label: "Cầu lông",
    value: null,
    passedCount: 0,
    totalCount: 0,
  },
  {
    label: "Bóng chuyền da",
    value: 100,
    passedCount: 1,
    totalCount: 1,
  },
  {
    label: "Võ taekwondo",
    value: null,
    passedCount: 0,
    totalCount: 0,
  },
  {
    label: "Golf",
    value: 100,
    passedCount: 1,
    totalCount: 1,
  },
];

const defaultOrders = [...Array(5)].map((_, index) => ({
  mssv: faker.string.numeric(4),
  fullname: faker.person.fullName(),
  product_id: 1,
  rental_time: faker.date.recent(),
  status: 1,
}));

export default function AppView({
  totalPrice = 0,
  totalStudentStandard = 0,
  totalOrder = 0,
  totalOrderWaiting = 0,
  totalAcceptedOrders = 0, 
  totalDeniedOrders = 0, 
  totalCompletedOrders = 0,
  studentStandardOutput = [],
  orders = [],
  studentOverSubjects = [],
}) {
  const resultStudentOverSubjects = useMemo(() => {
    let data = !studentOverSubjects.length ? defaultDataStudentOverSubjects : studentOverSubjects;
    return data.map((t) => ({ ...t, value: t?.value ?? 0 }));
  }, [studentOverSubjects]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Thống kê
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Doanh thu"
            total={totalPrice || 0}
            color="success"
            icon={<MdOutlineSummarize size={30} color="green"/>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Sinh viên đạt chuẩn đầu ra"
            total={totalStudentStandard || 0}
            color="info"
            icon={<PiStudent size={30} color="green"/>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Tổng số lượng yêu cầu"
            total={totalOrder}
            color="warning"
            icon={<TbSum size={30} color="green"/>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Yêu cầu đợi chấp nhận"
            total={totalOrderWaiting}
            color="error"
            icon={<MdOutlineConfirmationNumber size={30} color="green"/>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Yêu cầu đợi cần xác nhận hoàn tất"
            total={totalAcceptedOrders}
            color="error"
            icon={<MdOutlineConfirmationNumber size={30} color="green"/>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Yêu cầu đã từ chối"
            total={totalDeniedOrders}
            color="error"
            icon={<MdCancelPresentation size={30} color="red"/>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Yêu cầu đã hoàn tất"
            total={totalCompletedOrders}
            color="error"
            icon={<GiConfirmed size={30} color="green"/>}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Tỉ lệ sinh viên qua môn"
            // subheader="(+43%) than last year"
            chart={{
              series: resultStudentOverSubjects,
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Tỷ lệ sinh viên đạt chuẩn đầu ra"
            chart={{
              series: studentStandardOutput,
            }}
          />
        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <AppNewsUpdate title="Yêu cầu gần nhất" list={orders?.length ? orders : defaultOrders} />
        </Grid>
      </Grid>
    </Container>
  );
}
