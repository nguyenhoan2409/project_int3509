import React, { useState, useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";
import "./Request.css";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Layout from "../Layout/Layout";

export const Certificate = () => {
    const { id } = useParams();
    const [student, setStudent] = useState({});
    const [email, setEmail] = useState();
    const [phonenumber, setPhonenumber] = useState();
    const [checkCDR, setCheckCDR] = useState(false);
 
    function handleSubmit(event) {
        event.preventDefault();
    }

    const getScoreDetail = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/score/search/${id}`, {
            withCredentials: true,
          });
          const scores = response.data.student;
          const score = scores[0];
          console.log(score);
          setStudent(score);
          if(score.CDR === "Đ") {
            setCheckCDR(true)
          } else {
            setCheckCDR(false)
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
          if(!email || !phonenumber) {
            alert("Vui lòng nhập đầy đủ thông tin")
          }
          const response = await axios.post("http://localhost:8080/score/certificate", {
            mssv: student.mssv,
            fullname: student.fullname,
            class: student.class,
            univercity: student.univercity,
            email: email,
            phonenumber: phonenumber,
          }, {
            withCredentials: true,
          });
          alert("Đã gửi yêu cầu thành công");
        } catch (error) {
          console.error("Error fetching data:", error);
          if (error.response) {
            console.error("Server responded with:", error.response.data);
          }
        }
      }

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
                            value={student.fullname}
                            fullWidth
                            required
                        />

                        <TextField
                            type="number"
                            variant="outlined"
                            color="secondary"
                            label="MSSV"
                            value={student.mssv}
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
                            value={student.class}
                            fullWidth
                            required
                        />
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Trường"
                            value={student.univercity}
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
                        <p> Bóng đá : {student.football_score} .</p>
                        <p> Bóng rổ: {student.basketball_score} .</p>
                        <p> Bóng bàn: {student.tabletennis_score} .</p>
                        <p> Cầu lông: {student.bedminton_score} .</p>
                    </div>

                    <div className="score-detail-user">
                        <p> Bóng chuyền hơi: {student.air_volleyball_score} .</p>
                        <p> Bóng chuyền da: {student.volleyball_score} .</p>
                        <p> Taekwondo: {student.taekwondo_score} .</p>
                        <p> Golf: {student.golf_score} .</p>
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
