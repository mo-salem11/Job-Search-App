import { User } from "../../db/models/user.model.js";
import { appError } from "../utils/appError.js";
import { messages } from "../utils/common/messages.js";
import { catchError } from "./catchError.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { status } from "../utils/common/enum.js";
dotenv.config()

export const protectedRoutes = (roles)=>{

    return (
        catchError(async (req, res, next) => {
            let authorization = req.headers.authorization;
            if(!authorization) return next(new appError(messages.token.noToken, 400))
            if(!authorization.startsWith('Bearer ')){
               return next(new appError(messages.token.invalidBearerKey))
            }
            const token=authorization.split("Bearer ")[1];
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            if (!decoded) return next(new appError(messages.token.invalidPayload, 400))
            let authUser = await User.findById(decoded.userId);
            if (!authUser) return next(new appError(messages.user.userNotFound, 404))
            if(authUser.isDeleted==true) return next(new appError(messages.user.userNotFound, 404))   
            if(authUser.status==status.OFFLINE){
                return next(new appError(messages.user.login, 401))
            }
            if(!roles.includes(authUser.role)){
                return next(new appError(messages.user.notAuthorized, 401))
            }
            req.authUser = authUser
            next()
        })
    )
}