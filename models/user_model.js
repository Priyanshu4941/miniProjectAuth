import mongoose from "./database.js";

const userSchema = new mongoose.Schema({     // this is the user collection schema , change is according to the needs      
    UserID: {                                 // Also change in the register_service
        type: String,
        unique: true,
        required: true 
    },
    Name:{
        type:String,
        required:true,
    },
    Email: { 
        type: String, 
        required: true 
    },
    Password: {
        type: String,
        required: true 
    },
    isVerified:{
        type : Boolean,
        default:false
    }
});

const User = new mongoose.model("Users", userSchema);

export default User;
