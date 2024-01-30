import express from 'express';
import authenticationController from '../controllers/authenticationController.js';

const router = express.Router();


router.get('/loginpage',(req,res)=>{
    res.render('loginpage.ejs');
});

router.get('/registerpage',(req,res)=>{
    res.render('registerpage.ejs');
});

// POST /auth/register
router.post('/register', authenticationController.Register);

// POST /auth/login
router.post('/login', authenticationController.Login); 

// verify route
router.get('/verify',authenticationController.verify);


export default router;
