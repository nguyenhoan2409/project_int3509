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
      const response = await axios.get("http://localhost:8080/score/list", {
        withCredentials: true,
      });
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
  }, [mssv]);

  const searchHandle = async (event) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/score/search/${mssv}`, {
          withCredentials: true,
        }
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
            <div className="search">
              <input
               className="search-input-user"
                type=""
                placeholder="Tra cứu điểm..."
                onChange={(e) => setMssv(e.target.value)}
              />
              <div className="search-btn">
                <button className="search-btn-users" onClick={searchHandle}>Tìm kiếm</button>
              </div>
            </div>
          </div>
          <div className="score-table">
            <table className="score-table-user">
              <thead>
                <tr className="score-table-tr">
                  <th className="mssv score-table-header">MSSV</th>
                  <th className="fullname score-table-header">Họ và Tên</th>
                  <th className="class score-table-header">Lớp</th>
                  <th className="univercity score-table-header">Trường</th>
                  <th className="football score-table-header">Bóng đá</th>
                  <th className="bedminton score-table-header">Cầu lông</th>
                  <th className="tabletennis score-table-header">Bóng bàn</th>
                  <th className="basketball score-table-header">Bóng rổ</th>
                  <th className="volleyball score-table-header">Bóng chuyền hơi</th>
                  <th className="air_volleyball score-table-header">Bóng chuyền</th>
                  <th className="taekwondo score-table-header">Taekwondo</th>
                  <th className="golf score-table-header">Golf</th>
                  <th className="CDR score-table-header">CĐR</th>
                </tr>
              </thead>
              <tbody>
                {scores?.map((score, index) => (
                  <tr className="score-table-tr" key={index}>
                    <td className="mssv">{score.mssv}</td>
                    <td className="fullname">{score.fullname}</td>
                    <td className="class">{score.class}</td>
                    <td className="univercity">{score.univercity}</td>
                    <td className="football">{score.football_score}</td>
                    <td className="bedminton">{score.bedminton_score}</td>
                    <td className="tabletennis">{score.tabletennis_score}</td>
                    <td className="basketball">{score.basketball_score}</td>
                    <td className="volleyball">{score.volleyball_score}</td>
                    <td className="air_volleyball">{score.air_volleyball_score}</td>
                    <td className="taekwondo">{score.taekwondo_score}</td>
                    <td className="golf">{score.golf_score}</td>
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