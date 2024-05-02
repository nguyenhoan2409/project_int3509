import { ScoresManagement } from "../ScoreLayout/ScoreLayout";
import React, { useEffect, useState, useRef } from "react";
import "./ScoresList.css";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Layout from "~/Pages/Layout/Layout";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useDispatch } from "react-redux";
import { reset } from "numeral";
import { LogOut } from "~/features/authSlice";


export const ScoresList = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  const [mssv, setMssv] = useState("");
  const [scores, setScores] = useState([]);
  const tableRef = useRef(null);
  var initialScoreList = []; 
  const getScores = async () => {
    try {
      console.log("reloaded")
      const response = await axios.get("http://localhost:8080/score/list", {withCredentials: true});
      setScores(response.data);
      initialScoreList = response.data; 
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
      if (error?.response?.data?.msg?.message === "jwt expired") { 
        dispatch(reset());
        dispatch(LogOut());
        navigate("/");
      }
    }
  };
  useEffect(() => {
    getScores();
  }, [mssv]);

  const searchHandle = async (event) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/score/search/${mssv}`, {
          withCredentials: true
        }
      );
      let st = response.data.student;
      setScores(st);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };
  
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
                  placeholder="Tra cứu điểm..."
                  onChange={(e) => {setMssv(e.target.value);}}
                />
                <div className="search-btn-admin">
                  <button className="search-score-btn-admin" onClick={searchHandle}>Tìm kiếm</button>
                </div>

                <DownloadTableExcel
                    filename="physical-scores"
                    sheet="scores"
                    currentTableRef={tableRef.current}
                >

                   <button className = "download-btn"> Tải xuống </button>

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
                    <th className="taekwondo-admin">Taekwondo</th>
                    <th className="golf-admin">Golf</th>
                    <th className="CDR-admin">CĐR</th>
                    <th className="action-admin">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {scores?.map((score, index) => (
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
                          <FaEdit />
                        </Link>{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
