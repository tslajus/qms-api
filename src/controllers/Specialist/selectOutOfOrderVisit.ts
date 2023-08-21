import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Visit } from "@/models";
import { constants, errorHandler } from "@/utils";

const selectOutOfOrderVisit = async (req: Request, res: Response) => {
  const { VISIT_STATUS } = constants;
  const { PENDING } = VISIT_STATUS;

  try {
    const { reservationCode } = req.body;

    const visitToUpdate = await Visit.findOne({
      reservationCode,
      status: PENDING,
    });

    if (!visitToUpdate) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Pending visit not found with the given reservation code.",
      });
    }

    visitToUpdate.priority = true;
    visitToUpdate.gotPriorityAt = new Date();
    await visitToUpdate.save();

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Visit selected out of order",
    });
  } catch (error) {
    errorHandler(error, res, "Error selecting visit out of order");
  }
};

export default selectOutOfOrderVisit;
