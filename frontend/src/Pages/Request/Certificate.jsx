import React, { useState, useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";
import "./Request.css";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Layout from "../Layout/Layout";

export const Certificate = () => {
    const { id } = useParams();
    const [footballScore, setFootballScore] = useState();
    const [basketballScore, setBasketballScore] = useState();
    const [tabletennisScore, setTabletennisScore] = useState();
    const [bedmintonScore, setBedmintonScore] = useState();
    const [airVolleyballScore, setAirVolleyballScore] = useState();
    const [volleyballScore, setVolleyballScore] = useState();
    const [taekwondoScore, setTaekwondoScore] = useState();
    const [golfScore, setGolfScore] = useState();
    const [checkCDR, setCheckCDR] = useState(false);
    const [univercity, setUnivercity] = useState();
    const [fullname, setFullname] = useState();
    const [mssv, setMssv] = useState();
    const [classs, setClasss] = useState();
    const [email, setEmail] = useState();
    const [phonenumber, setPhonenumber] = useState();
 
    function handleSubmit(event) {
        event.preventDefault();
    }

    const getScoreDetail = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/score/search/${id}`);
          const scores = response.data.student;
          const score = scores[0];
          setFullname(score.fullname);
          setMssv(score.mssv);
          setClasss(score.class);
          setUnivercity(score.univercity);
          setFootballScore(score.football_score);
          setBasketballScore(score.basketball_score);
          setTabletennisScore(score.tabletennis_score);
          setBedmintonScore(score.bedminton_score);
          setAirVolleyballScore(score.air_volleyball_score);
          setVolleyballScore(score.volleyball_score);
          setTaekwondoScore(score.taekwondo_score);
          setGolfScore(score.golf_score);
          if(score.CDR === "Đ") {
            setCheckCDR(true)
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          if (error.response) {
            console.error("Server responded with:", error.response.data);
          }
        }
      }
      useEffect(() => {
        getScoreDetail();
      }, [])
      const CertificateRequest = async () => {
        try {
          const response = await axios.post("http://localhost:8080/score/certificate", {
            mssv: mssv,
            fullname: fullname,
            class: classs,
            univercity: univercity,
            email: email,
            phonenumber: phonenumber,
          });

        } catch (error) {
          console.error("Error fetching data:", error);
          if (error.response) {
            console.error("Server responded with:", error.response.data);
          }
        }
      }
      console.log(mssv, fullname, classs, univercity, email, phonenumber );
    return (
            <Layout>
            <h2 className="createRequestTitle">Tạo yêu cầu </h2>
            <div className="createRequestMain">
        
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>

                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Họ và tên"
                            value={fullname}
                            fullWidth
                            required
                        />

                        <TextField
                            type="number"
                            variant="outlined"
                            color="secondary"
                            label="MSSV"
                            value={mssv}
                            fullWidth
                            required
                        />

                    </Stack>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>

                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Lớp"
                            value={classs}
                            fullWidth
                            required
                        />
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Trường"
                            value={univercity}
                            fullWidth
                            required
                        />
                    </Stack>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>

                        <TextField
                            type="email"
                            variant="outlined"
                            color="secondary"
                            label="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
                        />
                        <TextField
                            type="number"
                            variant="outlined"
                            color="secondary"
                            label="Số điện thoại"
                            onChange={(e) => setPhonenumber(e.target.value)}
                            value={phonenumber}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
                        />
                    </Stack>

                    <div className="score-detail-user">
                        <p> Bóng đá : {footballScore} .</p>
                        <p> Bóng rổ: {basketballScore} .</p>
                        <p> Bóng bàn: {tabletennisScore} .</p>
                        <p> Cầu lông: {bedmintonScore} .</p>
                    </div>

                    <div className="score-detail-user">
                        <p> Bóng chuyền hơi: {airVolleyballScore} .</p>
                        <p> Bóng chuyền da: {volleyballScore} .</p>
                        <p> Taekwondo: {taekwondoScore} .</p>
                        <p> Golf: {golfScore} .</p>
                    </div>

                </form>
                {checkCDR && <Button variant="outlined" type="submit" className="createRequestBtn" onClick={CertificateRequest}>
                        Tạo yêu cầu
                    </Button>}

                    {!checkCDR && <p style = {{color: 'red', textAlign: 'center', marginTop: '10px', marginBottom: '10px', fontSize: '18px'}}>Bạn chưa đạt CĐR</p>}
                    {!checkCDR && <Button variant="outlined" type="submit" className="createRequestBtn" disabled>
                        Tạo yêu cầu
                    </Button>}
            </div>
        </Layout>
    );
};
