import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "~/features/authSlice";

export const AddStudents = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, []);

  return <div>Thêm danh sách sinh viên</div>;
};
