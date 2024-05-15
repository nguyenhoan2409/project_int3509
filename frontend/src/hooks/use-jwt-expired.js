import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, reset } from "~/features/authSlice";

export function useJwtExpiration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (error) => {
    if (error?.response?.data?.msg?.message === "jwt expired") {
      alert(
        "Phiên đăng nhập đã hết hiệu lực, vui lòng đăng nhập lại để tiếp tục."
      );
      dispatch(reset());
      dispatch(LogOut());
      navigate("/");
    }
  };
}
