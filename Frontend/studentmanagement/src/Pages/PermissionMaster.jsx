import React, { useEffect, useState } from "react";
import DataTable from "../Components/DataTable";
import axios from "axios";

const PermissionMaster = () => {
  const [permission, setPermission] = useState([]);

  const GetAllPermission = async () => {
    try {
      const res = await axios.get("http://localhost:8080/GetAllPermission");
      setPermission(res.data);
    } catch (error) {
      console.log(error, "err");
    }
  };
  useEffect(() => {
    GetAllPermission();
  }, []);

  const Column = [
    { id: "slno", label: "SL No", minWidth: 170 },
    { id: "name", label: "Permission Name", minWidth: 170 },
  ];

  return (
    <div>
      <DataTable TableTitle="PERMISSION" data={permission} columns={Column} />
    </div>
  );
};

export default PermissionMaster;
