import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Swall from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export default function CreateStaffModal({
  open,
  handleClose,
  onSuccess,
  editData,
  value,
}) {
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    contact: "",
    username: "",
    password: "",
  });
  const GetAllRoles = async () => {
    try {
      const res = await axios.get("http://localhost:8080/GetAllRole");
      setRoles(res?.data);
    } catch (error) {
      console.log(error, "err");
    }
  };
  useEffect(() => {
    GetAllRoles();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8080/AddStaff", formData);
      if (res.data.status === "OK" && res.status === 200) {
        handleClose();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1900,
        });
        if (onSuccess) onSuccess();
      } else if (res.data.status === "exist") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.data.resText,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    } catch (error) {
      console.log(error, "error");
      handleClose();

      if (error.response.data.status === "exist") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.resText,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    }
  };

  const getstaffbyId =async ()=>{
    try {
        const res = await axios.get()
    } catch (error) {
        
    }
  }

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          {value === "edit" ? "EDIT  STAFF" : "ADD STAFF"}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
          {/* Row 1 */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Name"
              type="text"
              name="name"
              fullWidth
              size="small"
              onChange={handleChange}
            />
            <TextField
              label="Contact"
              type="number"
              name="contact"
              fullWidth
              size="small"
              onChange={handleChange}
            />
          </Box>

          {/* Row 2 */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Role"
              name="role"
              select
              size="small"
              fullWidth
              value={formData.role}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Select Role</em>
              </MenuItem>
              {roles?.map((item) => (
                <MenuItem key={item?._id} value={item?._id}>
                  {item?.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="UserName"
              type="text"
              name="username"
              fullWidth
              size="small"
              onChange={handleChange}
            />
          </Box>

          {/* Row 3 */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Password"
              type="password"
              name="password"
              style={{ width: "49%" }}
              size="small"
              onChange={handleChange}
            />
          </Box>
        </Box>

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 5 }}
        >
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
