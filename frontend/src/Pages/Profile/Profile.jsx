import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { Box, Container, Grid, Typography } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import { Link, useParams } from "react-router-dom";
import { AccountSetting } from "~/Components/UserProfile/AccountSettings";
import { ChangePassword } from "~/Components/UserProfile/ChangePassword";
import { YourOrders } from "~/Components/UserProfile/YourOrders";
import Layout from "../Layout/Layout";
import "./Profile.css";

const MENUS = [
  {
    label: "Account setting",
    to: "/user/accountsettings",
    icon: <AccountCircleIcon fontSize="small" />,
    id: "accountsettings",
  },
  {
    label: "My Orders",
    to: "/user/yourorders",
    icon: <AddShoppingCartIcon fontSize="small" />,
    id: "yourorders",
  },
  {
    label: "Change Password",
    to: "/user/changepassword",
    icon: <ChangeCircleIcon fontSize="small" />,
    id: "changepassword",
  },
];

export const Profile = () => {
  const { activepage } = useParams();

  return (
    <div className="userprofile">
      <Layout>
        <Container maxWidth="xl" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid md={2} item>
              <Typography sx={{ color: (theme) => theme.palette.grey["500"], fontWeight: "bold" }}>
                Personal
              </Typography>

              <Box sx={{ mt: 1 }}>
                <Paper sx={{ width: 320, maxWidth: "100%" }}>
                  <MenuList>
                    {MENUS.map((item) => {
                      return (
                        <MenuItem
                          component={Link}
                          to={item.to}
                          selected={item.id === activepage}
                          key={item.id}
                          sx={{ py: 2 }}
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText>{item.label}</ListItemText>
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Paper>
              </Box>
            </Grid>

            <Grid md={10} item>
              {activepage === "accountsettings" && <AccountSetting />}
              {activepage === "changepassword" && <ChangePassword />}
              {activepage === "yourorders" && <YourOrders />}
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </div>
  );
};
