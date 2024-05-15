import { ScoresManagement } from "../ScoreLayout/ScoreLayout";
import React, { useEffect, useState, useRef } from "react";
import "./ScoresList.css";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Layout from "~/components/Layout/Layout";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useDispatch } from "react-redux";
import TablePagination from "@mui/material/TablePagination";
import { useJwtExpiration } from "~/hooks/use-jwt-expired";

export const ScoresList = () => {
  const [mssv, setMssv] = useState("");
  const [name, setName] = useState("");
  const [classs, setClasss] = useState("");
  const [university, setUniversity] = useState("");
  const [CDR, setCDR] = useState("");
  const [scores, setScores] = useState([]);
  const [initialScoreList, setInitialScoreList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const tableRef = useRef(null);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleJwtExpired = useJwtExpiration(); 

  const getScoreList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/score/list", {withCredentials: true});
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
  }, [mssv, name, classs, university, CDR]);

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
    if(CDR) {
      if(CDR === "Đạt") {
        scoreFilterList = scoreFilterList.filter(
          (score) => score.CDR == "Đ"
        ) }
      if(CDR === "Không") {
        scoreFilterList = scoreFilterList.filter(
          (score) => score.CDR !== "Đ"
        )}
    }
    setScores(scoreFilterList);
  }
  return (
    <Layout>
      <div>
        <ScoresManagement
        />
        <div
          className="scores-list-admin"
        >
          <div className="main-admin">
            <div className="score-header-admin">
              <div className="search-admin">
              <input
               className="search-input-admin"
                type=""
                placeholder="Mssv .."
                onChange={(e) => setMssv(e.target.value)}
              />
               <input
               className="search-input-admin"
                type=""
                placeholder="Họ và tên .."
                onChange={(e) => setName(e.target.value)}
              />
               <input
               className="search-input-admin"
                type=""
                placeholder="Lớp .."
                onChange={(e) => setClasss(e.target.value)}
              />
               <input
               className="search-input-admin"
                type=""
                placeholder="Trường .."
                onChange={(e) => setUniversity(e.target.value)}
              />
               <select className="search-select-admin" onChange={(e) => setCDR(e.target.value)}  name = "CDR">
                <option>--CDR--</option>
                <option>Đạt</option>
                <option>Không </option>
                 </select>
                <button className="search-score-btn-admin" onClick={handleFilterScore}>Tìm kiếm</button>
               <DownloadTableExcel
                    filename="physical-scores"
                    sheet="scores"
                    currentTableRef={tableRef.current}
                >
                   <button className = "search-score-btn-admin"> Tải xuống </button>
                </DownloadTableExcel>
          
                
              </div>
            </div>
            <div className="table-admin">
              

              <table className="score-table-admin" ref={tableRef}>
                <thead>
                  <tr className="score-tr-admin">
                    <th className="mssv-admin">MSSV</th>
                    <th className="fullname-admin">Họ và Tên</th>
                    <th className="class-admin">Lớp</th>
                    <th className="university-admin">Trường</th>
                    <th className="football-admin">Bóng đá</th>
                    <th className="badminton-admin">Cầu lông</th>
                    <th className="tabletennis-admin">Bóng bàn</th>
                    <th className="basketball-admin">Bóng rổ</th>
                    <th className="volleyball-admin">Bóng chuyền hơi</th>
                    <th className="air_volleyball-admin">Bóng chuyền</th>
                    <th className="taekwondo-admin">Võ</th>
                    <th className="golf-admin">Golf</th>
                    <th className="CDR-admin">CĐR</th>
                    <th className="action-admin">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {scores?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        ).map((score, index) => (
                    <tr className="score-tr-admin" key={index}>
                      <td className="mssv-admin-td">{score.mssv}</td>
                      <td className="fullname-admin-td">{score.fullname}</td>
                      <td className="class-admin-td">{score.class}</td>
                      <td className="university-admin-td">{score.university}</td>
                      <td className="football-admin-td">{score.football_score}</td>
                      <td className="badminton-admin-td">{score.badminton_score}</td>
                      <td className="tabletennis-admin-td">{score.tabletennis_score}</td>
                      <td className="basketball-admin-td">{score.basketball_score}</td>
                      <td className="volleyball-admin-td">{score.volleyball_score}</td>
                      <td className="air_volleyball-admin-td">{score.air_volleyball_score}</td>
                      <td className="taekwondo-admin-td">{score.taekwondo_score}</td>
                      <td className="golf-admin-td">{score.golf_score}</td>
                      <td className="CDR-admin-td">{score.CDR}</td>
                      <td className="action-admin-td">
                        {" "}
                        <Link to={`/admin/scores/update/${score.mssv}`}>
                          <FaEdit id = {index + 1 }/>
                        </Link>{" "}
                      </td>
                    </tr>
                  ))}
  
                </tbody>
              </table>
              {scores.length === 0 && (
                    <p className="no-data-admin"> Không có dữ liệu </p>
                  )}
              <TablePagination
                rowsPerPageOptions={[25, 100, 1000, 10000, 100000]}
                component="div"
                count={scores.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
