import React, { useEffect } from "react";
import "./home.css";
import { Navbar } from "~/Components/Navbar/Navbar";
import Cookies from "universal-cookie";
import { Footer } from "~/Components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "~/features/authSlice";
import Layout from "../Layout/Layout";

export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());  
  }, []);
  return (
    <div className="hero">
      <Layout>
        <div className="hero-main">
          <div className="title">
            Giới thiệu về trung tâm giáo dục thể chất và thể thao
          </div>
          <div style={{
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "600",
            marginTop: "-30px"
          }}>
            Đại học quốc gia Hà Nội
          </div>
          <div className="hero-text">
            Trung tâm Giáo dục Thể chất và Thể thao, ĐHQGHN được thành lập theo
            Quyết định số 1652/QĐ-TCCB ngày 04/5/2009 của Giám đốc Đại học Quốc
            gia Hà Nội.
          </div>
          <div className="hero-text"> I. CHỨC NĂNG VÀ NHIỆM VỤ</div>
          <div className="hero-text"> I.1. Chức năng </div>
          <div>
            {" "}
            Giảng dạy môn Giáo dục Thể chất trong tất cả các chương trình đào
            tạo bậc đại học, trung học phổ thông chuyên thuộc ĐHQGHN và các đơn
            vị khác theo yêu cầu và khả năng của Trung tâm; làm đầu mối tổ chức
            các hoạt động thể dục thể thao, thi đấu thể dục thể thao trong
            ĐHQGHN theo yêu cầu nhiệm vụ.
          </div>
          <div className="hero-text"> I.2. Nhiệm vụ </div>
          <div>
            {" "}
            I.2.1. Xây dựng kế hoạch, nội dung chương trình môn Giáo dục Thể
            chất hàng năm và từng giai đoạn theo đúng quy định của Bộ Giáo dục
            và Đào tạo, của ĐHQGHN và thống nhất với các thủ trưởng đơn vị đào
            tạo trong ĐHQGHN, trình Giám đốc ĐHQGHN phê duyệt.{" "}
          </div>
          <div>
            {" "}
            I.2.2. Tiếp nhận HSSV từ các đơn vị đào tạo trong ĐHQGHN để tổ chức
            thực hiện chương trình môn Giáo dục Thể chất phù hợp với kế hoạch
            đào tạo của Trung tâm đã được Giám đốc ĐHQGHN phê duyệt.{" "}
          </div>
          <div>
            {" "}
            I.2.3. Cấp chứng chỉ môn Giáo dục Thể chất cho HSSV đã hoàn thành
            chương trình môn học.
          </div>
          <div>
            {" "}
            I.2.4. Tổ chức nghiên cứu khoa học (NCKH), biên soạn giáo trình, tài
            liệu tham khảo, nghiên cứu đổi mới phương pháp giảng dạy môn Giáo
            dục Thể chất để nâng cao chất lượng đào tạo và tập huấn, bồi dưỡng
            nâng cao chuyên môn nghiệp vụ cho đội ngũ giảng viên, cán bộ quản lý
            theo yêu cầu công tác.
          </div>
          <div>
            {" "}
            I.2.5. Lập kế hoạch tổ chức các giải thể dục thể thao trong ĐHQGHN;
            thành lập và huấn luyện các đội tuyển của ĐHQGHN để tham gia các
            giải từ cấp thành phố, ngành Giáo dục và Đào tạo đến các giải Quốc
            gia.
          </div>
          <div>
            {" "}
            I.2.6. Phối hợp với Công đoàn, Đoàn Thanh niên, Hội Sinh viên ĐHQGHN
            tổ chức các hoạt động thể dục thể thao cho CBVC, HSSV trong ĐHQGHN.
          </div>
          <div>
            {" "}
            I.2.7. Tư vấn về chuyên môn cho các đơn vị trự c thuộc ĐHQGHN để tổ
            chức các hoạt động thể dục thể thao và các hoạt động khác liên quan
            đến lĩnh vực Giáo dục Thể chất cho CBVC, HSSV khi có yêu cầu.
          </div>
          <div>
            {" "}
            I.2.8. Quản lý, xây dựng, sửa chữa, cơ sở vật chất và mua mới trang
            thiết bị, dụng cụ phục vụ công tác giảng dạy và phong trào thể dục
            thể thao của Trung tâm theo sự phân cấp của Giám đốc ĐHQGHN.
          </div>
          <div>
            {" "}
            I.2.9. Xây dựng và quản lý các câu lạc bộ thể dục thể thao trực
            thuộc ĐHQGHN.
          </div>
          <div>
            {" "}
            I.2.10. Thực hiện các nhiệm vụ khác do Giám đốc ĐHQGHN giao.
          </div>
          <div className="hero-text"> II. TỔ CHỨC VÀ NHÂN SỰ </div>
          <div className="hero-text"> II.1. Tổ chức bộ máy của Trung tâm</div>
          <div>
            {" "}
            II.1.1. Ban Giám đốc Trung tâm gồm: Giám đốc và 2 Phó Giám đốc.
          </div>
          <div> II.1.2. Hội đồng Khoa học và Đào tạo.</div>
          <div> II.1.3. Các phòng chức năng giúp việc cho Giám đốc:</div>
          <div> a. Phòng Hành chính - Tổ chức.</div>
          <div> b. Phòng Đào tạo và quản lý người học.</div>
          <div> c. Phòng Thể thao.</div>
          <div> II.1.4. Bộ môn trực thuộc:</div>
          <div> a. Bộ môn Lý luận và các môn thể thao cá nhân;</div>
          <div> b. Bộ môn Các môn thể thao tập thể;</div>
          <div> c. Bộ môn Thể dục.</div>
          <div> II.1.5. Các Hội đồng tư vấn.</div>
          <div className="hero-text"> II.2. Đội ngũ cán bộ của Trung tâm </div>
          <div>
            {" "}
            - Tổng số CBVC và người lao động tính đến 31/12/2017 là 34, trong đó
            gồm 25 cán bộ - giảng viên, 05 chuyên viên và nhân viên.
          </div>
          <div>
            {" "}
            - Trình độ: có 02 TS, 19 ThS, 04 NCS, 01 học viên Cao học; 07 giảng
            viên chính.
          </div>
          <div>
            {" "}
            1. Giám đốc Trung tâm được xây dựng kế hoạch biên chế hàng năm trên
            cơ sở số lượng chỉ tiêu nhân lực do ĐHQGHN phê duyệt và số lượng
            nhân lực do Trung tâm xác định trên cơ sở khối lượng công việc và
            nguồn thu bổ sung.{" "}
          </div>
          <div>
            {" "}
            2. Trung tâm thực hiện công tác tuyển dụng, sử dụng và quản lý CBVC
            theo cách tiếp cận quản trị nguồn nhân lực phù hợp các quy định của
            ĐHQGHN và các văn bản pháp luật của Nhà nước có liên quan.{" "}
          </div>
          <div className="hero-text"> III. TÀI CHÍNH VÀ CƠ SỞ VẬT CHẤT </div>
          <div className="hero-text">
            {" "}
            III.1. Trung tâm là đơn vị dự toán cấp 2 trực thuộc ĐHQGHN, có con
            dấu và tài khoản riêng, được quản lý độc lập và thực hiện theo Luật
            ngân sách Nhà nước.
          </div>
          <div className="hero-text">
            {" "}
            III.2. Các nguồn tài chính của Trung tâm{" "}
          </div>
          <div>- Kinh phí sự nghiệp do ĐHQGHN cấp.</div>
          <div>- Nguồn thu từ học phí của HSSV.</div>
          <div>- Nguồn thu từ các hoạt động liên kết đào tạo, NCKH.</div>
          <div>
            - Nguồn tài trợ, viện trợ của các tổ chức, cá nhân trong và ngoài
            nước.
          </div>
          <div>- Các nguồn kinh phí khác.</div>
          <div>
            Các nguồn kinh phí của Trung tâm được quản lý tập trung, thống nhất
            theo quy định của Bộ Tài chính và ĐHQGHN.
          </div>
          <div className="hero-text"> III.3. Cơ sở vật chất của Trung tâm </div>
          <div> Hiện Trung tâm làm việc trên 03 địa điểm:</div>
          <div>
            {" "}
            Văn phòng làm việc đặt tại Nhà Đa năng, Khu Liên hợp thể thao
            ĐHQGHN, 2 địa điểm giảng dạy là Khu Liên hợp thể thao ĐHQGHN và KTX
            Mễ Trì.
          </div>
          <div>
            {" "}
            Trong tương lai Trung tâm sẽ chuyển về khu đô thị Láng Hoà lạc, và
            dự án sẽ hoàn thành vào năm 2020. Theo quy hoạch chung của dự án thì
            khu Trung tâm GDTC có diện tích là 43,9 ha, được tổ chức như một tổ
            hợp hoàn chỉnh, đồng bộ với các công trình phục vụ cho nhu cầu của
            ĐHQGHN và dân cư khu vực, đấp ứng nhu cầu thi đấu Quốc gia và Quốc
            tế với các công trình chính như: Sân vận động trung tâm, tổ hợp nhà
            thi đấu thể thao, bể bơi, và các sân tập ngoài trời.
          </div>
          <div className="hero-text">
            {" "}
            IV. MỐI QUAN HỆ CÔNG TÁC CỦA TRUNG TÂM
          </div>
          <div className="hero-text">
            {" "}
            IV.1. Trung tâm có quan hệ bình đẳng, mật thiết và hữu cơ với các
            đơn vị khác trong ĐHQGHN; có trách nhiệm phối hợp chặt chẽ cùng nhau
            thực hiện công tác đào tạo, bồi dưỡng môn Giáo dục Thể chất, triển
            khai NCKH, tổ chức các hoạt động thể dục thể thao góp phần thực hiện
            mục tiêu chung của ĐHQGHN.
          </div>
          <div className="hero-text">
            IV.2. Trung tâm được hợp tác với các cơ sở đào tạo, các tổ chức khác
            trong và ngoài ĐHQGHN về đào tạo, NCKH và bồi dưỡng đội ngũ giảng
            viên Giáo dục Thể chất, được quan hệ với các tổ chức và cá nhân nước
            ngoài, ký kết các văn bản hợp tác, trao đổi khoa học và đào tạo phù
            hợp các quy định của Nhà nước và của ĐHQGHN./.
          </div>
        </div>
      </Layout>
    </div>
  );
};
