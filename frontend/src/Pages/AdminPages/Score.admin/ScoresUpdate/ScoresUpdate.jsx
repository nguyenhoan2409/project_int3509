import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ScoresManagement } from "../ScoreLayout/ScoreLayout";
import "./ScoresUpdate.css";
import { PiStudentDuotone } from "react-icons/pi";
import Layout from "~/Pages/Layout/Layout";

export const UpdateScores = () => {
  const { id } = useParams();
  const [scores, setScores] = useState([]);
  const [footballScore, setFootballScore] = useState();
  const [basketballScore, setBasketballScore] = useState();
  const [tabletennisScore, setTabletennisScore] = useState();
  const [badmintonScore, setbadmintonScore] = useState();
  const [airVolleyballScore, setAirVolleyballScore] = useState();
  const [volleyballScore, setVolleyballScore] = useState();
  const [taekwondoScore, setTaekwondoScore] = useState();
  const [golfScore, setGolfScore] = useState();
  const [CDR, setCDR] = useState();
  const [checkCDR, setCheckCDR] = useState();

  const getScoreDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/score/search/${id}`, {
          withCredentials: true
        }
      );
      const scores = response.data.student;
      const score = scores[0];
      setScores(score);
      setFootballScore(score.football_score);
      setBasketballScore(score.basketball_score);
      setTabletennisScore(score.tabletennis_score);
      setbadmintonScore(score.badminton_score);
      setAirVolleyballScore(score.air_volleyball_score);
      setVolleyballScore(score.volleyball_score);
      setTaekwondoScore(score.taekwondo_score);
      setGolfScore(score.golf_score);
      setCDR(score.CDR);
      if (score.CDR === "Đ") {
        setCheckCDR(true);
      } else {
        setCheckCDR(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };
  useEffect(() => {
    getScoreDetail();
  }, []);

  const getScoreUpdate = async () => {
    try {
        const response = await axios.patch("http://localhost:8080/score/update", {
          football_score: footballScore,
          basketball_score: basketballScore,
          tabletennis_score: tabletennisScore,
          badminton_score: badmintonScore,
          air_volleyball_score: airVolleyballScore,
          volleyball_score: volleyballScore,
          taekwondo_score: taekwondoScore,
          golf_score: golfScore,
          mssv: id,
        },
        {
          withCredentials: true
        })
        await axios.get("http://localhost:8080/score/CDR", {
          withCredentials: true
        })
        getScoreDetail();
    } catch(error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    <Layout>
      <div className="score-update-container">
        <ScoresManagement
        />
        <div
          className="score-main"
        >
          <div className="profile-student">
            <p className="profile-title"> Thông tin sinh viên </p>
            <div className="avatar">
              <PiStudentDuotone />
            </div>
            <div className="profile-student-row">
              <p>Mã sinh viên : </p> {scores.mssv}
            </div>
            <div className="profile-student-row">
              <p>Tên sinh viên: </p> {scores.fullname}
            </div>
            <div className="profile-student-row">
              <p>Lớp: </p> {scores.class}
            </div>
            <div className="profile-student-row">
              <p>Trường: </p>
              {scores.university}
            </div>
          </div>
          <div className="score-student">
            <p className="profile-title"> Thông tin điểm </p>
            <form>
              <div className="form-update-score">
                <div className="form-update-row-1">
                  <div className="form-update-row">
                    <label>Bóng đá: </label>
                    <input
                      type="text"
                      value={footballScore}
                      onChange={(event) => setFootballScore(event.target.value)}
                    />
                  </div>
                  <div className="form-update-row">
                    <label>Cầu lông: </label>
                    <input
                      type="text"
                      value={badmintonScore}
                      onChange={(event) =>
                        setbadmintonScore(event.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="form-update-row-1">
                  <div className="form-update-row">
                    <label>Bóng bàn: </label>
                    <input
                      type="text"
                      value={tabletennisScore}
                      onChange={(event) =>
                        setTabletennisScore(event.target.value)
                      }
                    />
                  </div>
                  <div className="form-update-row">
                    <label>Bóng rổ: </label>
                    <input
                      type="text"
                      value={basketballScore}
                      onChange={(event) =>
                        setBasketballScore(event.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="form-update-row-1">
                  <div className="form-update-row">
                    <label>Bóng chuyền hơi: </label>
                    <input
                      type="text"
                      value={airVolleyballScore}
                      onChange={(event) =>
                        setAirVolleyballScore(event.target.value)
                      }
                    />
                  </div>
                  <div className="form-update-row">
                    <label>Bóng chuyền da: </label>
                    <input
                      type="text"
                      value={volleyballScore}
                      onChange={(event) =>
                        setVolleyballScore(event.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="form-update-row-1">
                  <div className="form-update-row">
                    <label>Taekwondo: </label>
                    <input
                      type="text"
                      value={taekwondoScore}
                      onChange={(event) =>
                        setTaekwondoScore(event.target.value)
                      }
                    />
                  </div>
                  <div className="form-update-row">
                    <label>Golf:</label>
                    <input
                      type="text"
                      value={golfScore}
                      onChange={(event) => setGolfScore(event.target.value)}
                    />
                  </div>
                </div>
              </div>
            </form>

            <button onClick={getScoreUpdate} className="update-score-button">
              {" "}
              Cập nhật{" "}
            </button>
            {checkCDR === true && (
              <p className="check-cdr-msg"> Sinh viên đã đạt CĐR </p>
            )}
            {checkCDR === false && (
              <p className="check-cdr-msg-error"> Sinh viên chưa đạt CĐR </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
