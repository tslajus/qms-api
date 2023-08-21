import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  constants,
  errorHandler,
  findVisitsByStatus,
  mapVisitToResponse,
  checkExpiredVisits,
} from "@/utils";

const getVisits = async (req: Request, res: Response) => {
  const { VISIT_STATUS, DISPLAY_BOARD_ITEM_COUNT } = constants;
  const { ACTIVE, PENDING, COMPLETED, CANCELED } = VISIT_STATUS;
  const limit = DISPLAY_BOARD_ITEM_COUNT;

  try {
    await checkExpiredVisits();

    const activeVisits = await findVisitsByStatus(ACTIVE, limit, {
      visitTime: -1,
    });

    let remainingSpots = limit - activeVisits.length;

    const pendingVisits =
      remainingSpots > 0
        ? await findVisitsByStatus(PENDING, remainingSpots, {
            priority: -1,
            gotPriorityAt: -1,
            visitTime: 1,
          })
        : [];

    remainingSpots -= pendingVisits.length;

    const completedVisits =
      remainingSpots > 0
        ? await findVisitsByStatus(COMPLETED, remainingSpots, {
            doneAt: -1,
          })
        : [];

    remainingSpots -= completedVisits.length;

    const canceledVisits =
      remainingSpots > 0
        ? await findVisitsByStatus(CANCELED, remainingSpots, {
            doneAt: -1, //
          })
        : [];

    const allVisits = [
      ...activeVisits,
      ...pendingVisits,
      ...completedVisits,
      ...canceledVisits,
    ].map(mapVisitToResponse);

    res.status(StatusCodes.OK).json(allVisits);
  } catch (error) {
    errorHandler(error, res, "Error getting visits");
  }
};
export default getVisits;
