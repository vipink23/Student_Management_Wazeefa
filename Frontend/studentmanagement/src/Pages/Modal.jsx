import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export default function ModalForm({ open, handleClose, title }) {
  const [formData, setFormData] = useState({
    name: "",
    permission: [],
  });

  const [permissions, setPermissions] = useState([]);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;

    if (name === "permission") {
      setFormData((prev) => {
        const alreadyChecked = prev.permission.includes(value);
        return {
          ...prev,
          permission: checked
            ? [...prev.permission, value]
            : prev.permission.filter((id) => id !== value),
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit =async () => {
    const res= await axios.post("http://localhost:8080/AddRole", formData);
    console.log(res,'ress');
    
    handleClose();
  };

  const GetAllPermission = async () => {
    try {
      const res = await axios.get("http://localhost:8080/GetAllPermission");
      setPermissions(res.data);
    } catch (error) {
      console.log(error, "err");
    }
  };
  useEffect(() => {
    GetAllPermission();
  }, []);

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
          ADD {title}
        </Typography>

        <Box>
          <TextField
            label="Name"
            type="text"
            name="name"
            fullWidth
            size="small"
            sx={{ flex: 1, mt: 4 }}
            onChange={handleChange}
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Permissions
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {permissions?.map((perm) => (
                <FormControlLabel
                  key={perm._id}
                  control={
                    <Checkbox
                      name="permission"
                      value={perm._id}
                      checked={formData.permission.includes(String(perm._id))}
                      onChange={handleChange}
                    />
                  }
                  label={perm.name}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}
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
