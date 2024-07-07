import { Router } from "express";
import { validation } from "../../middleware/validation.js";
import { applyToJobValidation } from "./application.validation.js";
import { protectedRoutes } from "../../middleware/auth.js";
import { role } from "../../utils/common/enum.js";
import { applyToJob } from "./application.controller.js";
import { uploadSingleField } from "../../services/fileUploads.js";


const applicationRouter=Router();

applicationRouter.post('/',uploadSingleField('userResume'),validation(applyToJobValidation),protectedRoutes(role.USER),applyToJob)

export default applicationRouter;