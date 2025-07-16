import mongoose from "mongoose";
const { Schema } = mongoose;

const StaffSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Types.ObjectId,
    ref:"Role"
  },
  contact: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
    password: {
    type: String,
    required: true,
  },
});

const Staffschema = mongoose.model("Staff", StaffSchema);
export default Staffschema;
