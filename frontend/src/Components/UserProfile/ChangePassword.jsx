import { Box, Button, Card, CardActions, CardContent, CardHeader, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";

export const ChangePassword = () => {
  return (
    <Card sx={{ minWidth: 275, p: 2 }} component={Paper}>
      <CardHeader title={`Change Password`} sx={{ mb: 5 }} />

      <CardContent>
        <Box>
          <TextField
            margin="normal"
            fullWidth
            type="password"
            label="Old Password"
            required
            id="fullWidth"
          />

          <TextField
            margin="normal"
            fullWidth
            type="password"
            label="New Password"
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
