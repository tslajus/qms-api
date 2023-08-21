import { Visit } from "@/models";
import { calculateVisibleCode } from "@/utils";

const createNewReservation = async (
  availableSpecialistId: string,
  earliestTime: Date
) => {
  const currentDayVisitCount = await calculateVisibleCode();
  const visibleCode = String(currentDayVisitCount).padStart(4, "0");
  const todayDate = new Date().toISOString().slice(0, 10);
  const reservationCode = `${todayDate}-${visibleCode}`;

  const newReservation = new Visit({
    reservationCode,
    visibleCode,
    visitTime: earliestTime,
    specialistAssigned: availableSpecialistId,
  });

  const savedReservation = await newReservation.save();

  return savedReservation;
};

export default createNewReservation;
