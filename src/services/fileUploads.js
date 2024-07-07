import multer from "multer";
import { appError } from "../utils/appError.js";


const fileUpload = () => {
    const storage = multer.diskStorage({});
    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('application/pdf')) {
            cb(null, true);
        } else {
            cb(new appError('Only PDF files are allowed', 400), false);
        }
    }
    const upload = multer({ storage: storage, fileFilter });
    return upload;
};

   

export const uploadSingleField = fieldName => fileUpload().single(fieldName);

// export const uploadArrayOfFields = (fieldName, maxCount) => fileUpload().array(fieldName, maxCount);

// export const uploadFields = fields => {
//     const multerUpload = fileUpload();
//     return multerUpload.fields(fields);
// };
