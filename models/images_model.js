import mongoose from "./database.js";

const profileImgSchema = new mongoose.Schema({
    UserID : {
        required :true,
        unique : true,
        type : String
    },
    Image : {
        required : true,
        type : String
    },
});

const Images = new mongoose.model("images",profileImgSchema);
export default Images;
