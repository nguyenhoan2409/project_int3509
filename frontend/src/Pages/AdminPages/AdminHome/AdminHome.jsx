import { Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "~/features/authSlice";
import Layout from "~/Pages/Layout/Layout";
import { AppView } from "~/sections/overview/view";


export const AdminHome = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <Layout>
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <AppView />
      </Container>
    </Layout>
  );
};
