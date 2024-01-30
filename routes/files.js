import express from 'express';
import imageFilesController from '../controllers/imageFilesController.js';
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const router = express.Router();

// POST /file/image/save/:id , image will be saved using id
router.post('/image/save/:id', upload.single('image'), imageFilesController.save);

// GET /file/image/get/:id 
router.get('/image/get/:id', imageFilesController.get);


export default router;
