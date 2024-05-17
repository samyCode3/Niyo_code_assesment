import { VerifyToken } from "@core/module/jwt-util"
import { NextFunction } from "express"

const secret = process.env.JWT_SECRET


export const  deserializeUser = async (
    req: Request | any,
    res:  Response |  any,
    next : NextFunction
     ) => 
     {
        try {
            let authHeader = req.headers['authorization']
            if(!authHeader) {
               return res.status(401).json({message: "UNAUTHORIZED"})
              
            }

            const token = authHeader.split(" ")[1]

            if(!token) {
                return res.status(401).json({message: "UNAUTHORIZED"})
            }

            let user: any = VerifyToken(token, process.env.SECRET_TOKEN)
            req.user = user
            
            next()
        } catch (error) {
              
               if(error.message == "jwt expired") {
                return res.status(401).json({message: "UNAUTHORIZED"})
               } else {
                return res.status(401).json({message: "UNAUTHORIZED"})
               }
               
        }
      
     }
