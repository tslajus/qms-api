import { Response } from "express";
import { AuthRequest } from "@/types";
import { StatusCodes } from "http-status-codes";
import { Visit } from "@/models";
import { constants, errorHandler, validateStatusChange } from "@/utils";

const markVisitStatus = async (req: AuthRequest, res: Response) => {
  const { VISIT_STATUS } = constants;
  const { ACTIVE, COMPLETED, CANCELED } = VISIT_STATUS;

  try {
    const { reservationCode } = req.params;
    const { status } = req.body;

    const activeVisit = await Visit.findOne({
      specialistAssigned: req.userId,
      status: ACTIVE,
    });

    const visitToUpdate = await Visit.findOne({
      reservationCode,
      specialistAssigned: req.userId,
    });

    if (!visitToUpdate) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Visit not found or doesn't belong to this specialist.",
      });
    }

    const errorMessage = validateStatusChange(
      visitToUpdate,
      status,
      activeVisit
    );
    if (errorMessage) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: errorMessage,
      });
    }

    if (status === ACTIVE) {
      visitToUpdate.visitTime = new Date();
    }

    if (status === COMPLETED || status === CANCELED) {
      visitToUpdate.doneAt = new Date();
    }

    visitToUpdate.status = status;
    await visitToUpdate.save();

    res.status(StatusCodes.OK).json({
      success: true,
      message: `Visit marked as ${status}`,
    });
  } catch (error) {
    errorHandler(error, res, "Error updating visit status");
  }
};

export default markVisitStatus;
