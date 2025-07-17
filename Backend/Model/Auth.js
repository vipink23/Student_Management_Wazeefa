import mongoose from 'mongoose';
const { Schema } = mongoose;

const AuthSchema = Schema({
    firstname:{
        type:String,
        required : true
    },
    lastname:{
        type:String,
        required : true
    },
    role:{
        type:mongoose.Types.ObjectId,
        ref:"Role",
        required:true
    },
    username :{
        type:String,
        required : true
    },
    password :{
        type:String,
        required:true
    },

});

const Authschema = mongoose.model("Auth", AuthSchema);
export default Authschema;