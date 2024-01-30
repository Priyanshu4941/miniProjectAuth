import User from "../models/user_model.js";
import sendAuthMail from "./send_mail.js";
import generate_token from "../utils/generate_tokens.js";

const Register_service= (userDetails,baseurl)=>{
    return new Promise((resolve,reject)=>{
        console.log(userDetails);
        const username = userDetails.username;
        const password = userDetails.password;
        const email = userDetails.email;
        const name = userDetails.name;

        if ((username == "") || (password == "") || (email == "") || (name=="")) {
            reject({ message: "Empty fields in the request body" });
        }else if (!username || !password || !email || !name) {
            reject({ message: 'Missing fields in the request body' });
        } else {
            const newUser = new User({     // append new fields according to your needs (append new fields in schema also)
                UserID: username,
                Password: password,
                Email: email,
                Name : name,
            });
            newUser.save()
                .then((details) => {
                    console.log(`token generated for verification ${details.UserID}`);
                    const token = generate_token({UserID : details.UserID},'5m');
                    sendAuthMail(details.Email,baseurl,token)
                    .then(()=>{
                        resolve({ message: "Auth mail send to the client", userID : details.UserID});
                    })
                    .catch((err)=>{
                        reject({message:'Error sending the mail'});
                    })
                    // resolve({message:'User Registered Sucessfully'});
                })
                .catch((err) => {
                    reject({ message: 'Username already exists'});
                });
        }
    })
}

export default Register_service;