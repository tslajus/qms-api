import { Response, NextFunction } from "express";
import { AuthRequest } from "@/types";
import { StatusCodes } from "http-status-codes";
import { Visit } from "@/models";

const checkReservationCode = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reservationCode } = req.params;
    const visit = await Visit.findOne({ reservationCode });

    if (!visit) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No visit found for the given reservation code",
      });
    }

    req.visit = visit;
    next();
  } catch (error) {
    next(error);
  }
};

export default checkReservationCode;
