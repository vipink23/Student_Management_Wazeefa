import PermissionModel from '../Model/Permission.js';



const AddPermission = async (req, res) => {
  const { name } = req.body;
  try {
    const existPermission = await PermissionModel.find({ name: name });
    if (existPermission.length > 0) {
      res.status(200).json({ resText: "Permission Already Exist" });
    } else {
      await PermissionModel.create(req.body);
      res.status(200).json({ resText: "Added Sucessfully", status: "OK" });
    }
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

const GetAllPermission = async (req, res) => {
  try {
    const permissions = await PermissionModel.find({}).exec();
    res.status(200).json(permissions)
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

export default {GetAllPermission,AddPermission}