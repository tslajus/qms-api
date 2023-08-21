import { Document } from "mongoose";
import { Request } from "express";
import { VISIT_STATUS } from "@/utils/constants";

export interface IVisit extends Document {
  reservationCode: string;
  visibleCode: string;
  visitTime: Date;
  specialistAssigned: ISpecialist["_id"];
  status: VISIT_STATUS;
  doneAt?: Date;
  priority: boolean;
  gotPriorityAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface ISpecialist extends Document {
  username: string;
  password: string;
  name: string;
  cabinetNumber: number;
  daysOff: Date[];
  hasADayOff: boolean;
  workingHours: {
    start: number;
    end: number;
    lunchBreakStart: number;
    lunchBreakEnd: number;
  };
  isCurrentlyWorking: boolean;
}

export interface AuthRequest extends Request {
  userId?: string | number;
  visit?: IVisit;
}
