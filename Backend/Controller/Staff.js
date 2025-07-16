import StaffModel from "../Model/Staff.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AddStaff = async (req, res) => {
  try {
    const { username, password, role, name, contact } = req.body;

    if (!username || !password) {
      return res.status(400).json("Username and Password are required");
    }

    const existingStaff = await StaffModel.findOne({ name: name });
    if (existingStaff) {
      return res.status(401).json("Staff Already exist");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await StaffModel.create({
        username: username,
        password: hashedPassword,
        role: role,
        name: name,
        contact: contact,
      });
      return res.status(200).json({resText:"Added Successfully", status:"OK"});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server Error");
  }
};

const GetAllStaff = async (req, res) => {
  try {
    const staffs = await StaffModel.find({})
      .populate({
        path: "role",
        populate: {
          path: "permission",
          model: "Permission",
        },
      })
      .exec();
    res.status(200).json(staffs);
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};
const StaffLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await StaffModel.findOne({ username: username })
      .populate("role")
      .exec();
    if (!user) return res.status(404).json({ message: "username not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credential" });
    const accessToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
        name: user.name,
        role: {
          rolename: user.role.name,
          role_id: user.role._id,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      accessToken,
    });
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};
const UpdateStaff = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ resText: "Id is required" });
    }
    const staff = await StaffModel.findById(id).exec();
    if (!staff) {
      return res.status(404).json({ resText: "Student not found" });
    }
    await StaffModel.findByIdAndUpdate(id, req.body);
    return res
      .status(200)
      .json({ resText: "Updated Successfully", status: "OK" });
  } catch (error) {}
};
const DeleteStaff = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ resText: "Id is required" });
    }
    await StaffModel.findByIdAndDelete(id);
    res.status(200).json({ resText: "Deleted Successfully", status: "OK" });
  } catch (error) {}
};



export default { AddStaff, GetAllStaff, StaffLogin, UpdateStaff,DeleteStaff };
