import mongoose from "mongoose";
const userSchema = new mongoose.Schema({ //attribute for user schema(is a method define for decelare in)
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,//for not spaces separated
    },
    role: {
        type: String,
        enum: ['admin', 'editor', 'contributor', 'viewer'], // Ensure only these roles can be assigned
        required: true,
        default: 'viewer', // Default role is 'user' if none is provided
    },
    password:{
        type:String,
        required:true,
       
    },
})
const UserModel = mongoose.model("user",userSchema);//convert schema to model object
export default UserModel;