import Register_service from "../services/register_service.js";
import Login_service from "../services/login_service.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import User from "../models/user_model.js";
dotenv.config();

const authenticationController = {

    Register : (req,res)=>{
        const baseurl = `${req.protocol}://${req.get('host')}`;
        Register_service(req.body,baseurl)
        .then((message)=>{
            console.log(message);
            res.status(200).json(message);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        })
    },

    Login : (req,res)=>{
        const baseurl = `${req.protocol}://${req.get('host')}`;
        Login_service(req.body,baseurl)
        .then((message)=>{
            console.log(message);
            res.status(200).json(message);
        })
        .catch((err)=>{
            console.log(err);
            res.status(200).json(err);
        })
    },

    verify:(req,res)=>{
        const token = req.query.token;
        if(!token){
            res.status(500).json({message: "Please send token"});
        }else{
            jwt.verify(token,process.env.secretkey,(err,decoded)=>{
                if(err){
                    res.status(401).json({message:"Invalid token"});
                }else{
                    req.user=decoded;
                    console.log(req.user);
                    User.findOne({UserID:req.user.Data.UserID})
                    .then((details)=>{
                        console.log(details);
                        if(details){  
                            if(!details.isVerified){
                                User.updateOne({UserID:details.UserID},{isVerified:true})
                                .then(()=>{
                                    res.status(200).json({message:"Verified Successfully"});
                                })
                                .catch((Err)=>{
                                    res.status(500).json({message:"Unable to verfiy"});
                                })
                            }else{
                                res.status(200).json({message:"you are already verifed"});
                            }
                        }else{
                            res.status(500).json({message:"User not found"});
                        }
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({message:"Invalid service"});
                    })
                }
            });
        }
    }
}

export default authenticationController;