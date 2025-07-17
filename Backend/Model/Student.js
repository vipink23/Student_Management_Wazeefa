import mongoose from 'mongoose';
const { Schema } = mongoose;

const StudentSchema = Schema({
    name:{
        type:String,
        required : true
    },
    age:{
        type:String,
        required : true
    },
    grade:{
        type:String,
        required:true
    },
    contact :{
        type:String,
        required : true
    },
    staff:{
        type:mongoose.Types.ObjectId,
        ref:"Staff"
    }
});

const Studentschema = mongoose.model("Student", StudentSchema);
export default Studentschema;