import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { decryptToken } from "../utils/jwt";
// express.d.ts
import * as express from 'express';
import { general_error, wrong_credentials } from "../utils/responseSend";
declare global {
  namespace Express {
    interface Request {
      user?: User; // You can replace 'any' with a more specific type if you have a User type defined
    }
  }
}
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader) {
    wrong_credentials(res)
    return
  }

  const token = authHeader!.split(" ")[1];

  if (!token) {
    wrong_credentials(res)
    return
  }
  try {
    const decryptedToken = decryptToken(token)
    const user = await User.findOne({
      where: {
        id: decryptedToken.id
      },
      attributes: {
        exclude: ['password', 'deletedAt']
      }
    })

    if (!user) {
      wrong_credentials(res)
      return
    }

    req.user = user!
    next();
  } catch (error) {
    general_error(res)
    return
  }

};
