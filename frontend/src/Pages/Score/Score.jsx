import React, { useEffect, useState } from "react";
import "./Score.css";
import axios from "axios";
import { Navbar } from "~/Components/Navbar/Navbar";
import { Footer } from "~/Components/Footer/Footer";
import Layout from "../Layout/Layout";

export const Score = () => {
  const [mssv, setMssv] = useState("");
  const [scores, setScores] = useState([]);

  const getScores = async () => {
    try {
      const response = await axios.get("http://localhost:8080/score/list");
      setScores(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  useEffect(() => {
    getScores();
  }, []);

  const searchHandle = async (event) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/score/search/${mssv}`
      );
      let st = response.data.student;
      setScores(st);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };
  console.log(scores);
  return (
    <div className="score-container">
      <Layout>
        <div className="main">
          <div className="score-header">
            <h2> Điểm học phần GDTC </h2>
            <div className="search">
              <input
                type=""
                placeholder="Tra cứu điểm..."
                onChange={(e) => setMssv(e.target.value)}
              />
              <button onClick={searchHandle}>Tìm kiếm</button>
            </div>
          </div>
          <table className="score-table-container">
            <thead>
              <tr className="score-table-row-container">
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
                <th className="score-table-header">Taekwondo</th>
                <th className="score-table-header">Golf</th>
                <th className="score-table-header">CĐR</th>
              </tr>
            </thead>
            <tbody>
              {scores?.map((score, index) => (
                <tr key={index} className="score-table-row-container">
                  <td className="score-table-data">{score.mssv}</td>
                  <td className="score-table-data">{score.fullname}</td>
                  <td className="score-table-data">{score.class}</td>
                  <td className="score-table-data">{score.univercity}</td>
                  <td className="score-table-data">{score.football_score}</td>
                  <td className="score-table-data">{score.bedminton_score}</td>
                  <td className="score-table-data">{score.tabletennis_score}</td>
                  <td className="score-table-data">{score.basketball_score}</td>
                  <td className="score-table-data">{score.volleyball_score}</td>
                  <td className="score-table-data">{score.air_volleyball_score}</td>
                  <td className="score-table-data">{score.taekwondo_score}</td>
                  <td className="score-table-data">{score.golf_score}</td>
                  <td className="score-table-data">{score.CDR}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  );
};
