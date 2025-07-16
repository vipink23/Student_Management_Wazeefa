import mongoose from 'mongoose';
const { Schema } = mongoose;

const PermissionSchema = Schema({
    name:{
        type:String,
        required : true
    },
});

const Permissionchema = mongoose.model("Permission", PermissionSchema);
export default Permissionchema;