import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  findEarliestTime,
  getNextWorkingSpecialist,
  createNewReservation,
  formatDate,
  errorHandler,
} from "@/utils";

const reserveVisit = async (req: Request, res: Response) => {
  try {
    let { earliestTime, availableSpecialistId } = await findEarliestTime();

    if (!availableSpecialistId || !earliestTime) {
      const nextSpecialist = await getNextWorkingSpecialist();
      if (!nextSpecialist) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "No available slots found.",
        });
      }
      availableSpecialistId = nextSpecialist._id;
      earliestTime = new Date(
        new Date().setHours(nextSpecialist.workingHours.start, 0, 0, 0)
      );
    }

    if (availableSpecialistId) {
      const newReservation = await createNewReservation(
        availableSpecialistId,
        earliestTime
      );

      res.status(StatusCodes.CREATED).json({
        success: true,
        reservationCode: newReservation.reservationCode,
        visibleCode: newReservation.visibleCode,
        visitTime: formatDate(newReservation.visitTime),
      });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "No available specialist found.",
      });
    }
  } catch (error) {
    errorHandler(error, res, "Error reserving the visit.");
  }
};

export default reserveVisit;
