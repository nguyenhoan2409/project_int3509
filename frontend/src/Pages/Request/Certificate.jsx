import React, { useState } from "react";
import { Navbar } from "~/Components/Navbar/Navbar";
import { TextField, Button, Container, Stack, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import "./Request.css";

export const Certificate = () => {
    const [name, setName] = useState("");
    const [classs, setClass] = useState("");
    const [univercity, setUnivercity] = useState("");
    const [email, setEmail] = useState("");
    const [price, setPrice] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        console.log(name, classs, univercity, email,price);
    }

    return (
        <div>
            <Navbar />
            <div className="createRequestContainer">
                <h2 className="createRequestTitle">Tạo yêu cầu</h2>
                <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>

                        <TextField
                            type="number"
                            variant="outlined"
                            color="secondary"
                            label="Họ và tên "
                            onChange={(e) => setName(e.target.value)}
                            value={classs}
                            fullWidth
                            required
                        />

                    </Stack>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>

                        <TextField
                            type="number"
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
                        label="Chi phí cấp GCN"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
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
