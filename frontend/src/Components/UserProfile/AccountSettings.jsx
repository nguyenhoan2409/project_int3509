import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

export const AccountSetting = () => {
  const { user, isError, message } = useSelector((state) => state.auth);

  return (
    <Card sx={{ minWidth: 275, p: 2 }} component={Paper}>
      <CardHeader title={`Personal Information`} sx={{ mb: 5 }} />

      <CardContent>
        <Box>
          <Box
            sx={{
              p: 1,
              border: "1px dashed rgba(0,0,0,0.3)",
              width: 120,
              height: 120,
              borderRadius: "100%",
              mb: 3,
            }}
          >
            <Avatar
              alt={user?.fullname}
              src="/assets/defaultAvatar.png"
              sx={{ width: 100, height: 100 }}
            />
          </Box>

          <TextField
            margin="normal"
            value={user?.fullname}
            fullWidth
            label="Your name"
            required
            id="fullWidth"
          />

          <TextField
            margin="normal"
            value={user?.phone_number}
            fullWidth
            label="Phone/Mobile"
            required
            id="fullWidth"
          />

          <TextField
            margin="normal"
            value={user?.email}
            fullWidth
            label="Email"
            type="email"
            required
            id="fullWidth"
          />
        </Box>
      </CardContent>

      <CardActions sx={{ alignItems: "flex-end", justifyContent: "flex-end" }}>
        <Button>Cancel</Button>
        <Button variant={"contained"}>Save change</Button>
      </CardActions>
    </Card>
  );
};
