import { Response } from "express";
import { AuthRequest, IVisit } from "@/types";
import { StatusCodes } from "http-status-codes";
import {
  formatTimeDifference,
  formatDate,
  errorHandler,
  constants,
} from "@/utils";

const viewTimeLeft = async (req: AuthRequest, res: Response) => {
  const { VISIT_STATUS } = constants;
  const { ACTIVE, PENDING, COMPLETED, CANCELED } = VISIT_STATUS;

  try {
    const visit = req.visit! as IVisit;
    const currentTime = new Date();
    const timeDifference =
      (visit.visitTime.getTime() - currentTime.getTime()) / (60 * 1000);

    const timeLeft = formatTimeDifference(timeDifference);

    const response: {
      success: true;
      timeLeft: {
        days: number;
        hours: number;
        minutes: number;
      };
      status:
        | typeof ACTIVE
        | typeof PENDING
        | typeof COMPLETED
        | typeof CANCELED;
      doneAt?: Date | string;
    } = {
      success: true,
      timeLeft,
      status: visit.status,
    };

    if (visit.status === COMPLETED || visit.status === CANCELED) {
      if (visit.doneAt) {
        response.doneAt = formatDate(visit.doneAt);
      }
    }

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    errorHandler(error, res, "Error fetching the time left");
  }
};

export default viewTimeLeft;
