import generate_token from "../utils/generate_tokens.js";
import User from "../models/user_model.js";
import sendAuthMail from "../services/send_mail.js";

const Login_service = (details,baseurl)=>{
    return new Promise((resolve,reject)=>{
        console.log(details);
        const username = details.username;
        const password = details.password;
        if ((username == "") || (password == "")) {
            reject({ message: "Empty fields in the request body" });
        }else if (!username || !password) {
            reject({ message: 'Missing fields in the request body' });
        } else{
            User.findOne({ UserID: username })    // set the search parameter
                .then((details) => {
                    if (details) {
                        if (details.Password == password) {
                            if(!details.isVerified){
                                const token = generate_token({UserID : details.UserID},'5m');
                                sendAuthMail(details.Email,baseurl,token)
                                .then(()=>{
                                    resolve({ message: "Auth mail send to the client" , userID : details.UserID});
                                })
                                .catch((err)=>{
                                    reject({message:'Error sending the mail'});
                                })
                            }else{
                                const token = generate_token({UserID : details.UserID},'1h');
                                resolve({ message: "Login Successful" , authToken : token , userID : details.UserID});
                            }
                        } else {
                            reject({ message: "Invalid Password" });
                        }
                    } else {
                        reject({ message: "User Not Found" });
                    }
                })
                .catch((err) => {
                    reject({ error: err });
                });
        }
    })
}

export default Login_service;