import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const secretkey = process.env.secretkey;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Missing Token, Please send token' });
    }

    const token = authHeader;

    jwt.verify(token, secretkey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        // console.log(req.user);
        next();
    });
};

export default verifyToken;
