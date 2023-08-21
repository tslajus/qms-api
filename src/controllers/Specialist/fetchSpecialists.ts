import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Specialist } from "@/models";

const fetchSpecialists = async (req: Request, res: Response) => {
  const specialists = await Specialist.find({});

  const simplifiedSpecialists = specialists.map((specialist) => ({
    name: specialist.name,
    hasADayOff: specialist.hasADayOff,
    workingHours: specialist.workingHours,
    isCurrentlyWorking: specialist.isCurrentlyWorking,
  }));

  res.status(StatusCodes.OK).json({
    message: "Specialists fetched successfully",
    specialists: simplifiedSpecialists,
  });
};

export default fetchSpecialists;
