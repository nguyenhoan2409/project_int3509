import React, { useState } from "react";
import { Navbar } from "~/Components/Navbar/Navbar";
import { TextField, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import "./Request.css";

export const Certificate = () => {
    const [name, setName] = useState("");
    const [mssv, setMSSV] = useState("");
    const [classs, setClass] = useState("");
    const [univercity, setUnivercity] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [code, setCode] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        console.log(name, mssv, classs, univercity, email, phonenumber, code);
    }

    return (
        <div>
            <Navbar />
            <div className="createRequestContainer">
                <h2 className="createRequestTitle">Tạo yêu cầu</h2>
                <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>

                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Họ và tên "
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            fullWidth
                            required
                        />

                        <TextField
                            type="number"
                            variant="outlined"
                            color="secondary"
                            label="Mã sinh viên "
                            onChange={(e) => setMSSV(e.target.value)}
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
                            label="Lớp "
                            onChange={(e) => setClass(e.target.value)}
                            value={classs}
                            fullWidth
                            required
                        />
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Trường"
                            onChange={(e) => setUnivercity(e.target.value)}
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

                    <TextField
                        type="text"
                        variant="outlined"
                        color="secondary"
                        label="Mã xác nhận"
                        onChange={(e) => setCode(e.target.value)}
                        value={code}
                        required
                        fullWidth
                        sx={{ mb: 4 }}
                    />

                    <Button variant="outlined" type="submit" className="createRequestBtn">
                        Tạo yêu cầu
                    </Button>

                </form>
            </div>
        </div>
    );
};
