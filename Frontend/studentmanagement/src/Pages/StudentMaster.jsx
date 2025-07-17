import DataTable from "../Components/DataTable";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import StudentModal from "./StudentModal";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const StudentMaster = () => {
  const [students, setStudent] = useState([]);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState({ val: "", id: "" });
  const user = useSelector((state) => state.user.user);
  const [decoded] = useState(() => {
    return jwtDecode(user?.token);
  });

  const getAllStudent = async (staffId) => {
    try {
      const res = await axios.get("http://localhost:8080/GetAllStudent", {
        params: { id: staffId },
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setStudent(res.data);
    } catch (error) {
      console.log(error, "err");
    }
  };

  useEffect(() => {
    if (decoded.role === "Super Admin") {
      getAllStudent();
    } else {
      getAllStudent(decoded.id);
    }
  }, [load]);
  const Column = [
    { id: "slno", label: "SL No", minWidth: 170 },
    { id: "studentname", label: "Student Name", minWidth: 170 },
    { id: "age", label: "Age", minWidth: 170 },
    { id: "contact", label: "Contact", minWidth: 170 },
    { id: "grade", label: "Grade", minWidth: 170 },
    { id: "staffName", label: "Under", minWidth: 170 },
    { id: "_id", label: "Action", minWidth: 170 },
  ];

  const handleReload = () => {
    console.log("reloadddd");

    setLoad((prev) => !prev);
  };

  const [editData, setEditData] = useState(null);
  const handleEdit = async (id, val) => {
    setVal((prev) => ({
      ...prev,
      val: val,
      id: id,
    }));
    try {
      const res = await axios.post(
        `http://localhost:8080/GetStudentById`,
        {
          id,
          permissions: decoded?.permission, // if needed in body
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      setEditData(res.data);
      setOpen(true);
    } catch (error) {
      if (error.response.data.status === false && error.status === 403) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.resText}. Please inform the higher authorities.`,
        });
      }
    }
  };
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const resp = await axios.post("http://localhost:8080/DeleteStudent", {
          id,
          permissions: decoded?.permission,
        });
        if (resp.data.status === "OK" && resp.status === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "Student has been deleted.",
            icon: "success",
          });
          handleReload();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      }
    } catch (error) {
      if (error.response.data.status === false && error.status === 403) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.resText}. Please inform the higher authorities.`,
        });
      }
    }
  };
  return (
    <div>
      <DataTable
        TableTitle="STUDENT"
        data={students}
        columns={Column}
        onSuccess={handleReload}
        setOpen={setOpen}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <StudentModal
        open={open}
        handleClose={() => setOpen(false)}
        onSuccess={handleReload}
        editData={editData}
        value={val}
      />
    </div>
  );
};

export default StudentMaster;
