import { Response } from "express";
import { AuthRequest } from "@/types";
import { StatusCodes } from "http-status-codes";
import { constants, errorHandler } from "@/utils";

const cancelVisit = async (req: AuthRequest, res: Response) => {
  const { VISIT_STATUS } = constants;
  const { CANCELED } = VISIT_STATUS;

  try {
    const visit = req.visit!;

    visit.status = CANCELED;
    visit.doneAt = new Date();
    await visit.save();

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Visit canceled successfully.",
      status: visit.status,
    });
  } catch (error) {
    errorHandler(error, res, "Error canceling the visit.");
  }
};

export default cancelVisit;
