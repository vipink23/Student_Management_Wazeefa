import DataTable from "../Components/DataTable";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import StudentModal from "./StudentModal";

const StudentMaster = () => {
  const [students, setStudent] = useState([]);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState({ val: "", id: "" });

  const getAllStudent = async () => {
    try {
      const res = await axios.get("http://localhost:8080/GetAllStudent");
      setStudent(res.data);
    } catch (error) {
      console.log(error, "err");
    }
  };
  useEffect(() => {
    getAllStudent();
  }, [load]);
  const Column = [
    { id: "slno", label: "SL No", minWidth: 170 },
    { id: "studentname", label: "Student Name", minWidth: 170 },
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
      const res = await axios.get(`http://localhost:8080/GetStudentById/${id}`);
      console.log(res.data, "response");
      setEditData(res.data);
      setOpen(true); // open modal
    } catch (error) {
      console.error("Error fetching staff by ID:", error);
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
        const resp = await axios.delete(
          `http://localhost:8080/DeleteStudent/${id}`
        );
        if (resp.data.status === "OK" && resp.status === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "Staff has been deleted.",
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
      console.error("Delete error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete staff.",
        icon: "error",
      });
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
