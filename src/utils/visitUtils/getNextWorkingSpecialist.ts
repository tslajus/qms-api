import { Specialist } from "@/models/Specialist";
import { ISpecialist } from "@/types";
import { isToday } from "@/utils";

const getNextWorkingSpecialist = async (): Promise<ISpecialist | null> => {
  const now = new Date();

  const specialists = await Specialist.find({ hasADayOff: false }).sort({
    "workingHours.start": 1,
  });

  for (let specialist of specialists) {
    const isWorkingLaterToday = now.getHours() < specialist.workingHours.end;

    if (isWorkingLaterToday) {
      return specialist;
    } else {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const hasTomorrowOff = specialist.daysOff.some((dayOff) =>
        isToday(dayOff)
      );

      if (!hasTomorrowOff) {
        return specialist;
      }
    }
  }

  return null;
};

export default getNextWorkingSpecialist;
