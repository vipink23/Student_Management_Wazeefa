import StudentModel from "../Model/Student.js";
import mongoose from "mongoose";

const AddStudent = async (req, res) => {
  const { name } = req.body;
  try {
    const existStudent = await StudentModel.find({ name: name });
    if (existStudent.length > 0) {
      res.status(200).json({ resText: "Student Already Exist", status:"exist" });
    } else {
      await StudentModel.create(req.body);
      res.status(200).json({ resText: "Added Sucessfully", status: "OK" });
    }
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};
const GetAllStudents = async (req, res) => {
  try {
    const students = await StudentModel.find({}).populate("staff").exec();
    const studentsData = students.map((st) => ({
      _id: st?._id,
      studentname: st?.name,
      grade: st?.grade,
      contact: st?.contact,
      age: st?.age,
      staffName: st.staff?.name || "",
      staff_id: st.staff?._id || null,
    }));

    res.status(200).json(studentsData);
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};
const GetStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ resText: "Id is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ resText: "Invalid ID format" });
    }

    const student = await StudentModel.findById(id).exec();

    if (!student) {
      return res.status(404).json({ resText: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ resText: "Internal Server Error" });
  }
};

const UpdateStudent = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ resText: "Id is required" });
    }
    const student = await StudentModel.findById(id).exec();
    if (!student) {
      return res.status(404).json({ resText: "Student not found" });
    }
    await StudentModel.findByIdAndUpdate(id, req.body);
    return res
      .status(200)
      .json({ resText: "Updated Successfully", status: "OK" });
  } catch (error) {}
};
const DeleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ resText: "Id is required" });
    }
    await StudentModel.findByIdAndDelete(id);
    res.status(200).json({ resText: "Deleted Successfully", status: "OK" });
  } catch (error) {}
};

export default {
  AddStudent,
  GetAllStudents,
  GetStudentById,
  UpdateStudent,
  DeleteStudent,
};
