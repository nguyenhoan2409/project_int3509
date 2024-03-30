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
          <table>
            <thead>
              <tr>
                <th>MSSV</th>
                <th>Họ và Tên</th>
                <th>Lớp</th>
                <th>Trường</th>
                <th>Bóng đá</th>
                <th>Cầu lông</th>
                <th>Bóng bàn</th>
                <th>Bóng rổ</th>
                <th>Bóng chuyền hơi</th>
                <th>Bóng chuyền</th>
                <th>Taekwondo</th>
                <th>Golf</th>
                <th>CĐR</th>
              </tr>
            </thead>
            <tbody>
              {scores?.map((score, index) => (
                <tr key={index}>
                  <td>{score.mssv}</td>
                  <td>{score.fullname}</td>
                  <td>{score.class}</td>
                  <td>{score.univercity}</td>
                  <td>{score.football_score}</td>
                  <td>{score.bedminton_score}</td>
                  <td>{score.tabletennis_score}</td>
                  <td>{score.basketball_score}</td>
                  <td>{score.volleyball_score}</td>
                  <td>{score.air_volleyball_score}</td>
                  <td>{score.taekwondo_score}</td>
                  <td>{score.golf_score}</td>
                  <td>{score.CDR}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  );
};
