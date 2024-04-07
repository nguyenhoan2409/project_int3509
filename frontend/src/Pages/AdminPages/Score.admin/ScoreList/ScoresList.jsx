import { ScoresManagement } from "../ScoreLayout/ScoreLayout";
import React, { useEffect, useState } from "react";
import "./ScoresList.css";
import axios from "axios";
import { Link } from "react-router-dom";
export const ScoresList = () => {
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
        <div>
            <ScoresManagement />
            <div className="scores-list-admin">
                <div className="main-admin">
                    <div className="score-header-admin">
                        <div className="search-admin">
                            <input
                                type=""
                                placeholder="Tra cứu điểm..."
                                onChange={(e) => setMssv(e.target.value)}
                            />
                            <div className="search-btn-admin">
                                <button onClick={searchHandle}>Tìm kiếm</button>
                            </div>
                        </div>
                    </div>
                    <div className="score-table-admin">
                        <table>
                            <thead>
                                <tr>
                                    <th className="mssv-admin">MSSV</th>
                                    <th className="fullname-admin">Họ và Tên</th>
                                    <th className="class-admin">Lớp</th>
                                    <th className="univercity-admin">Trường</th>
                                    <th className="football-admin">Bóng đá</th>
                                    <th className="bedminton-admin">Cầu lông</th>
                                    <th className="tabletennis-admin">Bóng bàn</th>
                                    <th className="basketball-admin">Bóng rổ</th>
                                    <th className="volleyball-admin">Bóng chuyền hơi</th>
                                    <th className="air_volleyball-admin">Bóng chuyền</th>
                                    <th className="taekwondo-admin">Taekwondo</th>
                                    <th className="golf-admin">Golf</th>
                                    <th className="CDR-admin">CĐR</th>
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
                </div>
            </div>
        </div>
    );
}