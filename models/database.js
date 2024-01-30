import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
    console.log('Connected to Database');
})
.catch((err)=>{
    console.log(err);
    console.log('Error in Connecting to Database');
})

export default mongoose;