import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "./LoginSignup.css";
import { Button, InputAdornment, TextField } from "@mui/material";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "~/hooks/use-axios";
import { MdError } from "react-icons/md";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export const NewPasswordForForgottenPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [valid, setValid] = useState();
  const param = useParams();
  const navigate = useNavigate();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const handleOpenSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const validate = (type) => {
    switch (type) {
      case "password":
        if (!password) {
          setErrorPassword("Vui lòng nhập mật khẩu.");
        }
        if (!confirmPassword) {
          setErrorConfirmPassword("Vui lòng nhập lại mật khẩu");
        }
        if (password && confirmPassword && password != confirmPassword) {
          setErrorConfirmPassword("Mật khẩu nhập lại không trùng khớp");
        }
        break;
      default:
        alert("Type không hợp lệ");
    }
  };

  useEffect(() => {
    const verifyUrl = async () => {
      try {
        const response = await axios.get(
          `/user/forgottenPassword/${param.id}/verify/${param.code}`
        );
        setValid(true);
      } catch (error) {
        console.log(error);
        setValid(false);
      }
    };
    verifyUrl();
  }, [param]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      validate("password");
      if (
        password &&
        confirmPassword &&
        !errorConfirmPassword &&
        !errorPassword
      ) {
        const response = await axios.patch("/user/createNewPassword", {
          user_id: param.id,
          newPassword: password,
          code: param.code,
        });
        if (response) {
          handleOpenSnackBar();
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={1000}
        onClose={handleOpenSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Đổi mật khẩu thành công, đang chuyển hướng
        </Alert>
      </Snackbar>
      {valid === undefined ? (
        <div className="emailVerifyContainer">
          <h1>Đang kiểm tra...</h1>
        </div>
      ) : valid === true ? (
        <div className="submitEmailForForgottenPassword">
          <form
            onSubmit={handleSubmit}
            className="submitEmailForForgottenPasswordFormContainer"
          >
            <TextField
              label="Mật khẩu mới"
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RiLockPasswordLine size={24} />
                  </InputAdornment>
                ),
              }}
              error={!!errorPassword}
              helperText={errorPassword}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorPassword("");
                setMsg("");
              }}
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label="Nhập lại mật khẩu mới"
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RiLockPasswordLine size={24} />
                  </InputAdornment>
                ),
              }}
              error={!!errorConfirmPassword}
              helperText={errorConfirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrorConfirmPassword("");
                setMsg("");
              }}
              onBlur={() => {
                validate("password");
              }}
              variant="outlined"
              size="small"
              fullWidth
            />

            {!errorPassword && <p className="erroInfo">{msg}</p>}

            <Button
              type="submit"
              variant="contained"
              size="large"
              color="success"
              fullWidth
              sx={{
                marginTop: "10px",
              }}
            >
              Đổi mật khẩu
            </Button>
          </form>
        </div>
      ) : (
        <div className="emailVerifyContainer">
          <MdError size={80} color="red" />
          <h1>
            Xác thực email không thành công, vui lòng kiểm tra lại link xác
            thực.
          </h1>
          <Button
            variant="contained"
            size="medium"
            sx={{ textTransform: "none", m: "8px" }}
            onClick={() => {
              navigate("/");
            }}
            color="success"
          >
            Quay về trang Đăng nhập
          </Button>
        </div>
      )}
    </>
  );
};
