import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Visit } from "@/models";
import { IVisit } from "@/types";
import { constants, errorHandler, checkExpiredVisits } from "@/utils";

interface FetchPatientsResponse {
  success: boolean;
  patients: IVisit[];
}

const fetchPatients = async (req: Request, res: Response) => {
  const { VISIT_STATUS } = constants;
  const { ACTIVE, PENDING } = VISIT_STATUS;

  try {
    await checkExpiredVisits();

    const specialistId = req.params.id;

    const patients = await Visit.find({
      specialistAssigned: specialistId,
      status: { $in: [PENDING, ACTIVE] },
    }).sort({
      status: 1,
      priority: -1,
      gotPriorityAt: -1,
      visitTime: 1,
    });

    const response: FetchPatientsResponse = {
      success: true,
      patients: patients,
    };

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    errorHandler(error, res, "Error fetching patients");
  }
};

export default fetchPatients;
