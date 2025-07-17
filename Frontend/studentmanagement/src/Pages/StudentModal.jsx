import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

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

export default function StudentModal({
  open,
  handleClose,
  onSuccess,
  editData,
  value,
}) {
  const [staff, setStaff] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    grade: "",
    contact: "",
    staff: "",
  });
  const user = useSelector((state) => state.user.user);
  const [decoded] = useState(() => {
    return jwtDecode(user?.token);
  });

  const GetAllStaff = async () => {
    try {
      const res = await axios.get("http://localhost:8080/GetAllStaff", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setStaff(res?.data);
    } catch (error) {
      console.log(error, "err");
    }
  };
  useEffect(() => {
    GetAllStaff();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (decoded?.role !== "Super Admin" && decoded?.id) {
      setFormData((prev) => ({ ...prev, staff: decoded.id }));
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8080/AddStudent", {
        ...formData,
        permissions: decoded?.permission,
      });
      if (res.data.status === "OK" && res.status === 200) {
        if (onSuccess) onSuccess();
        handleClose();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1900,
        });
        setFormData(() => ({
          name: "",
          age: "",
          grade: "",
          contact: "",
          staff: "",
        }));
      } else if (res.data.status === "exist") {
        handleClose();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.data.resText,
        });
      }
    } catch (error) {
      console.log(error, "error");
      handleClose();

      if (error.response?.data?.status === "exist") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.resText,
        });
      } else if (error.response.data.status === false && error.status === 403) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.resText}. Please inform the higher authorities.`,
        });
      }
    }
  };

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData?.name || "",
        contact: editData?.contact || "",
        staff: editData?.staff || "",
        grade: editData?.grade || "",
        age: editData?.age || "",
      });
    }
  }, [editData]);

  const handleUpdate = async () => {
    console.log(editData);
    const data = {
      name: formData.name !== editData?.name ? formData.name : editData?.name,
      contact:
        formData.contact !== editData?.contact
          ? formData.contact
          : editData?.contact,
      staff:
        formData.staff !== editData?.staff ? formData.staff : editData?.staff,
      grade:
        formData.grade !== editData?.grade ? formData.grade : editData?.grade,
      age: formData.age !== editData?.age ? formData.age : editData?.age,
    };
    console.log(data);

    try {
      const response = await axios.put(
        `http://localhost:8080/UpdateStudent/${value?.id}`,
        data
      );
      if (response.data.status === "OK" && response.status === 200) {
        handleClose();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been Updated",
          showConfirmButton: false,
          timer: 1900,
        });
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.log(error, "errr");
    }
  };

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
          {value?.val === "edit" ? "EDIT  STUDENT" : "ADD STUDENT"}
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
              value={formData.name}
            />
            <TextField
              label="Contact"
              type="number"
              name="contact"
              fullWidth
              size="small"
              value={formData.contact}
              onChange={handleChange}
            />
          </Box>
          {/* Row 2 */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Age"
              type="text"
              name="age"
              fullWidth
              size="small"
              value={formData.age}
              onChange={handleChange}
            />
            <TextField
              label="Grade"
              type="text"
              name="grade"
              fullWidth
              size="small"
              value={formData.grade}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Under"
              name="staff"
              select
              size="small"
              style={{ width: "49%" }}
              value={
                decoded?.role === "Super Admin"
                  ? formData.staff || ""
                  : decoded?.id || ""
              }
              onChange={
                decoded?.role === "Super Admin" ? handleChange : undefined
              }
              disabled={decoded?.role !== "Super Admin"}
              error={
                decoded?.role === "Super Admin" &&
                formData.staff &&
                !staff?.some((item) => item._id === formData.staff)
              }
              helperText={
                decoded?.role === "Super Admin" &&
                formData.staff &&
                !staff?.some((item) => item._id === formData.staff)
                  ? "Selected staff is not available in the list."
                  : ""
              }
            >
              <MenuItem value="">
                <em>Select Staff</em>
              </MenuItem>
              {staff?.map((item) => (
                <MenuItem key={item?._id} value={item?._id}>
                  {item?.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 5 }}
        >
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          {value?.val === "edit" ? (
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
