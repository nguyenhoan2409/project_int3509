import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ScoresManagement } from "../ScoreLayout/ScoreLayout";
import "./ScoresUpdate.css";
import { PiStudentDuotone } from "react-icons/pi";
import Layout from "~/components/Layout/Layout";
import { useJwtExpiration } from "~/hooks/use-jwt-expired";

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
  const [checkCDR, setCheckCDR] = useState();
  const [checkValue, setCheckValue] = useState(false);
  const [msg, setMsg] = useState("");
  const handleJwtExpired = useJwtExpiration(); 

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
      if (score.CDR === "Đ") {
        setMsg("Sinh viên đã đạt chuẩn đầu ra");
        setCheckValue(true);
      } else {
        setMsg("Sinh viên chưa đạt chuẩn đầu ra");
        setCheckValue(false);
      }
    } catch (error) {
      handleJwtExpired(error); 
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };
  useEffect(() => {
    getScoreDetail();
  }, []);

  const scoreUpdate = async () => {
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
      handleJwtExpired(error); 
      console.error("Error fetching data:", error);
    }
  }
  const handleUpdate = () => {
    if(footballScore < 0 || footballScore > 10
      || basketballScore < 0 || basketballScore > 10
      || tabletennisScore < 0 || tabletennisScore > 10
      || badmintonScore < 0 || badmintonScore > 10
      || airVolleyballScore < 0 || airVolleyballScore > 10
      || volleyballScore < 0 || volleyballScore > 10
      || taekwondoScore < 0 || taekwondoScore > 10
      || golfScore < 0 || golfScore > 10) {
      setMsg("Điểm phải nhỏ hoặc bằng 10 và lớn hơn hoặc bằng 0");
      setCheckValue(false)
    } else {
      scoreUpdate();
      setCheckValue(true);
      setMsg("Đã cập nhật điểm thành công");
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
              <p>Mã sinh viên : {scores.mssv} </p>
            </div>
            <div className="profile-student-row">
              <p>Tên sinh viên: {scores.fullname} </p>
            </div>
            <div className="profile-student-row">
              <p>Lớp: {scores.class} </p>
            </div>
            <div className="profile-student-row">
              <p>Trường: {scores.university} </p>
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
                      type="number"
                      value={footballScore}
                      onChange={(event) => setFootballScore(event.target.value)}
                      name="football_score"
                    />
                  </div>
                  <div className="form-update-row">
                    <label>Cầu lông: </label>
                    <input
                      type="number"
                      value={badmintonScore}
                      onChange={(event) =>
                        setbadmintonScore(event.target.value)
                      }
                      name="badminton_score"
                    />
                  </div>
                </div>
                <div className="form-update-row-1">
                  <div className="form-update-row">
                    <label>Bóng bàn: </label>
                    <input
                      type="number"
                      value={tabletennisScore}
                      onChange={(event) =>
                        setTabletennisScore(event.target.value)
                      }
                      name = "tabletennis_score"
                    />
                  </div>
                  <div className="form-update-row">
                    <label>Bóng rổ: </label>
                    <input
                      type="number"
                      value={basketballScore}
                      onChange={(event) =>
                        setBasketballScore(event.target.value)
                      }
                      name="basketball_score"
                    />
                  </div>
                </div>
                <div className="form-update-row-1">
                  <div className="form-update-row">
                    <label>Bóng chuyền hơi: </label>
                    <input
                      type="number"
                      value={airVolleyballScore}
                      onChange={(event) =>
                        setAirVolleyballScore(event.target.value)
                      }
                      name = "airVolleyball_score"
                    />
                  </div>
                  <div className="form-update-row">
                    <label>Bóng chuyền da: </label>
                    <input
                      type="number"
                      value={volleyballScore}
                      onChange={(event) =>
                        setVolleyballScore(event.target.value)
                      }
                      name = "volleyball_score"
                    />
                  </div>
                </div>
                <div className="form-update-row-1">
                  <div className="form-update-row">
                    <label>Taekwondo: </label>
                    <input
                      type="number"
                      value={taekwondoScore}
                      onChange={(event) =>
                        setTaekwondoScore(event.target.value)
                      }
                      name="taekwondo_score"
                    />
                  </div>
                  <div className="form-update-row">
                    <label>Golf:</label>
                    <input
                      type="number"
                      value={golfScore}
                      onChange={(event) => setGolfScore(event.target.value)}
                      name="golf_score"
                    />
                  </div>
                </div>
              </div>
            </form>

            {checkValue === true && (
              <p className="check-cdr-msg"> {msg} </p>
            )}
            {checkValue === false && (
              <p className="check-cdr-msg-error"> {msg} </p>
            )}

            <button onClick={handleUpdate} className="update-score-button">
              CẬP NHẬT
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
