import Images from "../models/images_model.js";

const save_image_file_service = (file, userID) => {

    return new Promise((resolve, reject) => {
        if (!file) {
            return reject({ message: "No file provided" });
        }

        const imageBuffer = file.buffer.toString("base64");
        // console.log(imageBuffer);
        console.log(userID);

        const image = new Images({
            Image: imageBuffer,
            UserID: userID,
        });

        image
            .save()
            .then(() => {
                resolve({ message: "Profile image saved successfully" });
            })
            .catch((err) => {
                console.log(err);
                Images.updateOne({ UserID: userID }, { Images: imageBuffer })
                    .then(() => {
                        resolve({ message: "Profile image updated successfully" });
                    })
                    .catch((err) => {
                        reject({ message: "Error uploading/updating image" });
                    });
            });
    });
};

export default save_image_file_service;
