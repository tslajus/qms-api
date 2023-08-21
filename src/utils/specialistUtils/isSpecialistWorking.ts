import cron from "node-cron";
import { ISpecialist } from "@/types";

const isSpecialistWorking = (specialist: ISpecialist): boolean => {
  const now = new Date();
  const hour = now.getHours();

  const formattedToday = now.toISOString().slice(0, 10);

  if (
    specialist.daysOff.some(
      (dayOff) => dayOff.toISOString().slice(0, 10) === formattedToday
    )
  ) {
    return false;
  }

  if (
    (specialist.workingHours.start <= specialist.workingHours.end &&
      hour >= specialist.workingHours.start &&
      hour < specialist.workingHours.end) ||
    (specialist.workingHours.start > specialist.workingHours.end &&
      (hour >= specialist.workingHours.start ||
        hour < specialist.workingHours.end))
  ) {
    if (
      hour < specialist.workingHours.lunchBreakStart ||
      hour >= specialist.workingHours.lunchBreakEnd
    ) {
      return true;
    }
  }

  return false;
};

export default isSpecialistWorking;
