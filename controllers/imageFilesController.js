import Images from "../models/images_model.js";
import save_image_file_service from "../services/save_image_file_service.js";


const imageFilesController = {

    save: (req,res)=>{
        save_image_file_service(req.file,req.params.id)
        .then((response)=>{
            res.status(200).json(response);
        })
        .catch((err)=>{
            res.status(500).json(err);
        })
    },


    get: (req,res)=>{
        const userID = req.params.id;
    
        Images.findOne({ UserID: userID })
            .then((data) => {
                if (!data) {
                    return res.status(404).json({ error: "Image not found" });
                } else {
                    const contentType = data.Image.startsWith("/9j/") ? 'image/jpeg' : 'image/png';
                    res.set('Content-Type', contentType);
                    res.send(Buffer.from(data.Image, 'base64'));
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
            });
    }
};

export default imageFilesController;