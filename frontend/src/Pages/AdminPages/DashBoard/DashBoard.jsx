import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "~/features/authSlice";

export const AddScores = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, []);

  return <div>Nhập điểm</div>;
};
