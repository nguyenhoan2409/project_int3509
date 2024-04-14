import React, { useEffect, useState } from "react";
import "./UserManagement.css";
import Layout from "~/Pages/Layout/Layout";
import { Box, Container, LinearProgress, Typography } from "@mui/material";
import TableUserManager from "./TableUserManager";

function createData(user_id, fullname, email, phone_number, address, role_id) {
  return { user_id, fullname, email, phone_number, address, role_id };
}

const rows = [
  createData(1111, "Frozen yoghurt", "example@gmail.com", "0123456789", "HCM", 1),
  createData(1123, "Ice cream sandwich", "example1@gmail.com", "0123456788", "HN", 2),
  createData(1124, "Eclair", "example@gmail222.com", "0123456787", "DN", 2),
  createData(1134, "Cupcake", "example@gmail3.com", "0123456786", "HN", 2),
  createData(1122, "Gingerbread", "example@gmail4.com", "0123456733", "HCM", 2),
];

const sleep = (ms = 500) => new Promise((rs) => setTimeout(rs, ms));

export const UserManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);

      await sleep();
      setData(rows);
    } catch (error) {
      console.log(`error get data user manager`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // call api get data user manager
    getData();
  }, []);

  // fake accept user to admin role
  const handleOnAcceptRoleAdmin = async (user) => {
    console.log(`accepts user :::`, user);
    // find user in data user manager
    const cloneData = [...data];
    if (!cloneData.length) return;

    // find index user in data array
    const index = cloneData.findIndex((t) => t.user_id === user.user_id);

    console.log(index);

    // if not found
    if (index === -1) return;

    // If found set role_id = 1
    try {
      setLoading(true);

      cloneData[index] = {
        ...cloneData[index],
        role_id: 1,
      };

      await sleep();

      setData(cloneData);
    } catch (error) {
      console.log(`accept user to role admin error`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          textAlign: "center",
          p: 2,
          background: (theme) => theme.palette.grey["200"],
          color: (theme) => theme.palette.success.main,
        }}
      >
        <Typography variant="h5">Quản lý người dùng</Typography>
      </Box>

      <Container sx={{ mt: 2 }} maxWidth="lg">
        <Box sx={{ width: "100%", position: "relative" }}>
          {loading ? (
            <Box sx={{ position: "absolute", top: -10, width: "100%" }}>
              <LinearProgress />
            </Box>
          ) : null}

          <TableUserManager rows={data} onAcceptRoleAdmin={handleOnAcceptRoleAdmin} />
        </Box>
      </Container>
    </Layout>
  );
};
