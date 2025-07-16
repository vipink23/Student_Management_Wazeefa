import mongoose from 'mongoose';
const { Schema } = mongoose;

const RoleSchema = Schema({
    name:{
        type:String,
        required : true
    },
    permission:[{
        type:mongoose.Types.ObjectId,
        ref:"Permission"
    }]
});

const Roleschema = mongoose.model("Role", RoleSchema);
export default Roleschema;