import jwt, { JwtPayload, VerifyCallback } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { AuthRequest } from "@/types";
import { StatusCodes } from "http-status-codes";
import { errorHandler, constants } from "@/utils";

const { TEMP } = constants;
const JWT_SECRET = process.env.JWT_SECRET || TEMP.SECRET_KEY;

const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const verifyCallback: VerifyCallback = (err, decoded) => {
      if (err) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: "Failed to authenticate token" });
      }
      const payload = decoded as JwtPayload;

      if (!payload.id) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: "Invalid token payload" });
      }

      req.userId = payload.id;
      next();
    };

    jwt.verify(token, JWT_SECRET, verifyCallback);
  } catch (error) {
    errorHandler(error, res);
  }
};

export default authenticate;
