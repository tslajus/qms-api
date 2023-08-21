import { Visit, Specialist } from "@/models";
import { constants } from "@/utils";

const findEarliestTime = async () => {
  const { VISIT_STATUS, VISIT_DURATION } = constants;
  const { ACTIVE, PENDING } = VISIT_STATUS;

  const specialists = await Specialist.find({
    isCurrentlyWorking: true,
    hasADayOff: false,
  });

  let earliestTime: Date | null = null;
  let availableSpecialistId: string | null = null;

  const now = new Date();
  now.setSeconds(0, 0);

  for (let specialist of specialists) {
    const visits = await Visit.find({
      specialistAssigned: specialist._id,
      status: { $in: [PENDING, ACTIVE] },
    }).sort({ visitTime: 1 });

    let proposedTime: Date;
    if (!visits.length || visits[0].visitTime.getTime() > now.getTime()) {
      proposedTime = now;
    } else {
      const lastVisitEndTime = new Date(
        visits[visits.length - 1].visitTime.getTime() + VISIT_DURATION
      );
      proposedTime = new Date(
        Math.max(now.getTime(), lastVisitEndTime.getTime())
      );
    }

    if (!earliestTime || proposedTime < earliestTime) {
      earliestTime = proposedTime;
      availableSpecialistId = specialist._id;
    }
  }

  return {
    earliestTime,
    availableSpecialistId,
  };
};

export default findEarliestTime;
