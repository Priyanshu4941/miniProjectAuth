import Jwt from "jsonwebtoken";

const generate_token = (Data,duration)=>{
    const token = Jwt.sign({Data},process.env.secretkey,{expiresIn: duration});
    return token;
};

export default generate_token;