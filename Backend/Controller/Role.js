import RoleModel from "../Model/Role.js";
const AddRole = async (req, res) => {
  const { name } = req.body;
  try {
    const existStudent = await RoleModel.find({ name: name });
    if (existStudent.length > 0) {
      res.status(200).json({ resText: "Role Already Exist" });
    } else {
      await RoleModel.create(req.body);
      res.status(200).json({ resText: "Added Sucessfully", status: "OK" });
    }
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

const GetAllRoles = async (req, res) => {
  try {
    const roles = await RoleModel.find({}).populate("permission").exec();
    res.status(200).json(roles)
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

export default { AddRole, GetAllRoles };
