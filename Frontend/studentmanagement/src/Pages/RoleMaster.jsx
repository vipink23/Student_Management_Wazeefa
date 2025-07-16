import React, { useEffect, useState } from "react";
import DataTable from "../Components/DataTable";
import axios from "axios";

const RoleMaster = () => {
  const [roles, setRoles] = useState([]);

  const GetAllRoles = async () => {
    try {
      const res = await axios.get("http://localhost:8080/GetAllRole");
      setRoles(res.data);
    } catch (error) {
      console.log(error, "err");
    }
  };
  useEffect(() => {
    GetAllRoles();
  }, []);

  const Column = [
    { id: "slno", label: "SL No", minWidth: 170 },
    { id: "name", label: "Role Name", minWidth: 170 },
  ];
  return (
    <div>

      <DataTable TableTitle="ROLE" data={roles} columns={Column} />
    </div>
  );
};

export default RoleMaster;
