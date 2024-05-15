import React, { useState, useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";
import "./Request.css";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import Layout from "../../../components/Layout/Layout";
import { useSelector } from "react-redux";
import { CreateRequest } from "./CreateRequest";
import { useJwtExpiration } from "~/hooks/use-jwt-expired";

export const Certificate = () => {
    const { id } = useParams();
    const [student, setStudent] = useState({});
    const [email, setEmail] = useState();
    const [phonenumber, setPhonenumber] = useState();
    const [checkCDR, setCheckCDR] = useState(false);
    const [msg, setMsg] = useState("");
    const {user} = useSelector((state) => state.auth); 
    const navigate = useNavigate();
    const handleJwtExpired = useJwtExpiration(); 
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
          setStudent(score);
          if(score.CDR === "Đ") {
            setCheckCDR(true)
          } else {
            setCheckCDR(false)
            setMsg("Bạn chưa đạt chuẩn đầu ra")
          }
        } catch (error) {
          handleJwtExpired(error); 
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
          if(msg.length === 0) {
            const response = await axios.post("http://localhost:8080/certificate/create", {
            mssv: student.mssv,
            fullname: student.fullname,
            class: student.class,
            university: student.university,
            email: email,
            phonenumber: phonenumber,
            status: 13, 
            user_id: user?.user_id
          }, {
            withCredentials: true,
          });
          navigate("/request");
          }
        } catch (error) {
          handleJwtExpired(error); 
          console.error("Error fetching data:", error);
          if (error.response) {
            console.error("Server responded with:", error.response.data);
          }
        }
      }
      
      const validate = (type) => {
        switch (type) {
          case "email":
            if (!email) {
              setMsg("Vui lòng nhập email");
            } else {
              if (!email.includes("@")) {
                setMsg("Định dạng email cần có @");
              } else {
                const [, afterAt] = email.split("@");
                if (!afterAt || !afterAt.trim()) {
                  setMsg("Cần viết thêm sau @");
                }
    
                const [domain, extension] = afterAt.split(".");
                if (!domain || !extension) {
                  setMsg("Cần viết thêm sau @");
                }
              }
              if(email.includes("@") && email.includes(".")) {
                setMsg("");
              }
            }
            break;
        
          case "phonenumber":
            if (!phonenumber) {
              setMsg("Vui lòng nhập số điện thoại");
            } else {
              if (!/^(0\d{9}|(\+84|\(84\))\d{9})$/.test(phonenumber)) {
                setMsg(
                  "Số điện thoại không hợp lệ, định dạng chuẩn 10 số dạng 0xxxx.. hoặc +84xxxx.."
                );
              } else {
                setMsg("");
              }
            }
            break;
          default:
            alert("Type không hợp lệ");
        }
      };
      console.log("msg: ", msg);
    return (
            <Layout>
            <h2 className="title">Tạo yêu cầu </h2>
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
                            InputLabelProps={{ shrink: true }}
                        />

                        <TextField
                            type="number"
                            variant="outlined"
                            color="secondary"
                            label="MSSV"
                            value={student.mssv}
                            fullWidth
                            required
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Trường"
                            value={student.university}
                            fullWidth
                            required
                            InputLabelProps={{ shrink: true }}
                        />
                    </Stack>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>

                        <TextField
                            type="email"
                            variant="outlined"
                            color="secondary"
                            label="Email"
                            id = "email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            onBlur={() => {
                              validate("email");
                            }}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
                        />
                        <TextField
                            type="number"
                            variant="outlined"
                            color="secondary"
                            label="Số điện thoại"
                            id = "phonenumber"
                            onChange={(e) => setPhonenumber(e.target.value)}
                            value={phonenumber}
                            onBlur={() => {
                              validate("phonenumber");
                            }}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
                        />
                    </Stack>

                    <div className="score-detail-user">
                        <p> Bóng đá : {student.football_score} .</p>
                        <p> Bóng rổ: {student.basketball_score} .</p>
                        <p> Bóng bàn: {student.tabletennis_score} .</p>
                        <p> Cầu lông: {student.badminton_score} .</p>
                    </div>

                    <div className="score-detail-user">
                        <p> Bóng chuyền hơi: {student.air_volleyball_score} .</p>
                        <p> Bóng chuyền da: {student.volleyball_score} .</p>
                        <p> Võ: {student.taekwondo_score} .</p>
                        <p> Golf: {student.golf_score} .</p>
                    </div>

                </form>
                <div style={{color: 'red', textAlign: 'center', marginTop: '10px', marginBottom: '10px', fontSize: '18px'}} className = "msg-request">{msg}</div>
                {checkCDR && <Button variant="outlined" type="submit" className="createRequestBtn" onClick={CertificateRequest}>
                        Tạo yêu cầu
                    </Button>}
                {!checkCDR && <Button variant="outlined" type="submit" className="createRequestBtn" disabled>
                        Tạo yêu cầu
                    </Button>}
            </div>
        </Layout>
    );
};