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
  CircularProgress,
} from "@mui/material";
// import Grid2 from '@mui/material/Unstable_Grid2';
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { deepOrange } from "@mui/material/colors";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Login } from "./Features/Redux-Auth/UserSlicer";
import Swal from "sweetalert2";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("http://localhost:8080/Login", formData);
      console.log(resp);
      if (resp.data.status === "OK" && resp.status === 200) {
        setIsLoading(true);
        const decoded = jwtDecode(resp.data.accessToken);
        dispatch(Login(decoded));
        if (decoded.role === "Super Admin") {
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error, "err");
      if (error.response.data.status === false && error.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.message}`,
        });
      } else if (
        error.response.data.status === "Invalid" &&
        error.status === 400
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.message}`,
        });
      }
    }
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
            required
            sx={{ mb: 2 }}
            size="small"
            onChange={handleChange}
            value={formData.username}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            name="password"
            size="small"
            onChange={handleChange}
            value={formData.password}
          />
          {/* <Button
            variant="outlined"
            fullWidth
            sx={{ mb: 5, mt: 4 }}
            type="submit"
          >
            Submit
          </Button> */}
          <Button
            variant="outlined"
            fullWidth
            sx={{ mb: 5, mt: 4, position: "relative" }}
            type="submit"
            disabled={isLoading} // disable button while loading
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: "primary.main" }} />
            ) : (
              "Submit"
            )}
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
