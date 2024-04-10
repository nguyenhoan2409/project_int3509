import React, { useEffect, useState } from "react";
import "./Score.css";
import axios from "axios";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import { TbCertificate } from "react-icons/tb";

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
              <div className="search-btn">
                <button onClick={searchHandle}>Tìm kiếm</button>
              </div>
            </div>
          </div>
          <div className="score-table">
            <table>
              <thead>
                <tr>
                  <th className="mssv">MSSV</th>
                  <th className="fullname">Họ và Tên</th>
                  <th className="class">Lớp</th>
                  <th className="univercity">Trường</th>
                  <th className="football">Bóng đá</th>
                  <th className="bedminton">Cầu lông</th>
                  <th className="tabletennis">Bóng bàn</th>
                  <th className="basketball">Bóng rổ</th>
                  <th className="volleyball">Bóng chuyền hơi</th>
                  <th className="air_volleyball">Bóng chuyền</th>
                  <th className="taekwondo">Taekwondo</th>
                  <th className="golf">Golf</th>
                  <th className="CDR">CĐR</th>
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
                    <td className="certificate-icons"><Link to={`/certificate/${score.mssv}`} >
                          <TbCertificate />
                        </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
};
