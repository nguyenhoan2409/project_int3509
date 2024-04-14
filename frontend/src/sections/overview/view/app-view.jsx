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

// ----------------------------------------------------------------------

export default function AppView() {
  return (
    <Container maxWidth="xl">

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Doanh thu"
            total={714000}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Sinh viên đạt chuẩn"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Lợi nhuận"
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Số lượng yêu cầu"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Tỷ lệ sinh viên qua môn"
            subheader="(+3%) so với kỳ trước"
            chart={{
              series: [
                { label: "Bóng đá", value: 80 },
                { label: "Bóng bàn", value: 75 },
                { label: "Bóng chuyền hơi", value: 80 },
                { label: "Bóng rổ", value: 65 },
                { label: "Cầu lông", value: 68 },
                { label: "Bóng chuyền da", value: 85 },
                { label: "Golf", value: 80 },
              ],
            }}
          />
        </Grid>
        

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Tỷ lệ sinh viên đạt chuẩn đầu ra"
            chart={{
              series: [
                { label: "Đạt", value: 344 },
                { label: "Không đạt", value: 5435 },
              ],
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
