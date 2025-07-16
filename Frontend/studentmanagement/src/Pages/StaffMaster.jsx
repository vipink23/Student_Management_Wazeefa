import React, { useEffect, useState } from "react";
import DataTable from "../Components/DataTable";
import axios from "axios";
import CreateStaffModal from "./CreateStaffModal";

const StaffMaster = () => {
  const [staff, setStaff] = useState([]);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [val,setVal]= useState(null)

  const getAllStaff = async () => {
    try {
      const res = await axios.get("http://localhost:8080/GetAllStaff");
      setStaff(res.data);
    } catch (error) {
      console.log(error, "err");
    }
  };

  useEffect(() => {
    getAllStaff();
  }, [load]);

  const Column = [
    { id: "slno", label: "SL No", minWidth: 170 },
    { id: "name", label: "Staff Name", minWidth: 170 },
    { id: "contact", label: "Contact", minWidth: 170 },
    { id: "_id", label: "Action", minWidth: 170 },
  ];

  const handleReload = () => {
    setLoad((prev) => !prev);
  };

  const [editData, setEditData] = useState(null);

  const handleEdit = (row, val) => {
    setEditData(row);
    setVal(val)
    console.log(val, "val");

    setOpen(true); // open modal
  };

  return (
    <div>
      <DataTable
        TableTitle="STAFF"
        data={staff}
        columns={Column}
        onSuccess={handleReload}
        setOpen={setOpen}
        handleEdit={handleEdit}
      />

      <CreateStaffModal
        open={open}
        handleClose={() => setOpen(false)}
        onSuccess={handleReload}
        editData={editData}
        value={val}
      />
    </div>
  );
};

export default StaffMaster;
