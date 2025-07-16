import {
  Container,
  Paper,
  Avatar,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Link,
} from "@mui/material";
// import Grid2 from '@mui/material/Unstable_Grid2';
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { deepOrange } from "@mui/material/colors";
import { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <Container maxWidth="xs">
      <Paper elevation={7} sx={{ marginTop: 14, padding: 2 }}>
        <Avatar
          sx={{
            bgcolor: deepOrange[500],
            mx: "auto",
            mb: 2,
            textAlign: "center",
          }}
        >
          <LockOpenIcon />
        </Avatar>
        <Typography variant="h5" component="h1" sx={{ textAlign: "center" }}>
          {" "}
          Sign In
        </Typography>
        <Box
          component="form"
          //   sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
          sx={{ mt: 10 }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            label="UserName"
            type="text"
            fullWidth
            name="username"
            sx={{ mb: 2 }}
            size="small"
            onChange={handleChange}
            value={formData.username}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            name="password"
            size="small"
            onChange={handleChange}
            value={formData.password}
          />
          <Button
            variant="outlined"
            fullWidth
            sx={{ mb: 5, mt: 4 }}
            type="submit"
          >
            Submit
          </Button>

          <Grid container justifyContent="space-between">
            <Grid size={{ xs: 12, sm: 6 }}>
              <Link>Forget Password</Link>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Link>Sign Up</Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
