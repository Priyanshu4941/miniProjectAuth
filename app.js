import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authentication from  "./routes/auth.js";
import files from "./routes/files.js";

const port =3000;
const app =  express();

const corsOptions = {
    origin: '*', 
    optionsSuccessStatus: 200 
};

//middlewares
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

// routes 
app.use("/auth",authentication);
app.use("/file",files);

// server running on port
app.listen((port),()=>{
    console.log(`Server running on port ${port}`);
});