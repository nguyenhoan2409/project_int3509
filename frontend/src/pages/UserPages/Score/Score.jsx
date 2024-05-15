import React, { useEffect, useMemo, useState } from "react";
import "./Score.css";
import axios from "~/hooks/use-axios";
import Layout from "../../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { TbCertificate } from "react-icons/tb";
import TablePagination from "@mui/material/TablePagination";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import * as locales from "@mui/material/locale";
import { useJwtExpiration } from "~/hooks/use-jwt-expired";

export const Score = () => {
  const theme = useTheme();
  const [mssv, setMssv] = useState("");
  const [name, setName] = useState("");
  const [classs, setClasss] = useState("");
  const [university, setUniversity] = useState("");
  const [scores, setScores] = useState([]);
  const [initialScoreList, setInitialScoreList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const handleJwtExpired = useJwtExpiration(); 
  const themeWithLocale = useMemo(
    () => createTheme(theme, locales["viVN"]),
    []
  );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getScoreList = async () => {
    try {
      const response = await axios.get("/score/list");
      setScores(response.data);
      setInitialScoreList(response.data);
    } catch (error) {
      handleJwtExpired(error); 
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  useEffect(() => {
    getScoreList();
  }, [mssv, name, classs, university]);

  const handleFilterScore = () => {
     let scoreFilterList = initialScoreList;
    if (mssv) {
      scoreFilterList = scoreFilterList.filter(
        (score) => score.mssv == mssv
      );
    }
    if (name) {
      scoreFilterList = scoreFilterList.filter(
        (score) => score.fullname == name
      );
    }
    if (classs) {
      scoreFilterList = scoreFilterList.filter(
        (score) => score.class == classs
      )
    }
    if(university) {
      scoreFilterList = scoreFilterList.filter(
        (score) => score.university == university
      )
    }
    setScores(scoreFilterList);

  }
  return (
    <div>
       <Layout>
      <div className="score-container">
        <div className="title">Tra cứu điểm</div>

        <div>
          <div className="score-header">
            <div className="search">
              <input
               className="search-input-user"
                type=""
                placeholder="Mssv .."
                onChange={(e) => setMssv(e.target.value)}
              />
               <input
               className="search-input-user"
                type=""
                placeholder="Họ và tên .."
                onChange={(e) => setName(e.target.value)}
              />
               <input
               className="search-input-user"
                type=""
                placeholder="Lớp .."
                onChange={(e) => setClasss(e.target.value)}
              />
               <input
               className="search-input-user"
                type=""
                placeholder="Trường .."
                onChange={(e) => setUniversity(e.target.value)}
              />
                <button className="search-btn-users" onClick={handleFilterScore}>Tìm kiếm</button>
            </div>
          </div>
          <div className="score-table">
            <ThemeProvider theme={themeWithLocale}>
            <table className="score-table-user">
              <thead>
                <tr className="score-table-tr">
                  <th className="score-table-header">MSSV</th>
                  <th className="score-table-header">Họ và Tên</th>
                  <th className="score-table-header">Lớp</th>
                  <th className="score-table-header">Trường</th>
                  <th className="score-table-header">Bóng đá</th>
                  <th className="score-table-header">Cầu lông</th>
                  <th className="score-table-header">Bóng bàn</th>
                  <th className="score-table-header">Bóng rổ</th>
                  <th className="score-table-header">Bóng chuyền hơi</th>
                  <th className="score-table-header">Bóng chuyền</th>
                  <th className="score-table-header">Võ</th>
                  <th className="score-table-header">Golf</th>
                  <th className="score-table-header">CĐR</th>
                </tr>
              </thead>
              <tbody>
                {scores?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        ).map((score, index) => (
                  <tr className="score-table-tr" key={index}>
                    <td className="mssv">{score.mssv}</td>
                    <td className="fullname">{score.fullname}</td>
                    <td className="class">{score.class}</td>
                    <td className="university">{score.university}</td>
                    <td className="football">{score.football_score}</td>
                    <td className="badminton">{score.badminton_score}</td>
                    <td className="tabletennis">{score.tabletennis_score}</td>
                    <td className="basketball">{score.basketball_score}</td>
                    <td className="volleyball">{score.volleyball_score}</td>
                    <td className="air_volleyball">{score.air_volleyball_score}</td>
                    <td className="taekwondo">{score.taekwondo_score}</td>
                    <td className="golf">{score.golf_score}</td>
                    <td className="certificate-icons CDR"><Link to={`/certificate/${score.mssv}`} >
                          <TbCertificate id = {score.mssv} />
                        </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {scores.length === 0 && <p className="no-data-user">Không có dữ liệu</p>}
            <TablePagination
                rowsPerPageOptions={[25, 100, 1000, 10000, 100000]}
                component="div"
                count={scores.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              </ThemeProvider>
          </div>
        </div>
    </div>
    </Layout>
    </div>
  );
};