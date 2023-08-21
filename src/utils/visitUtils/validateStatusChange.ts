import { IVisit } from "@/types";
import { constants } from "@/utils";

const validateStatusChange = (
  visit: IVisit,
  status: string,
  activeVisit: IVisit | null
): string | null => {
  const { VISIT_STATUS } = constants;
  const { ACTIVE, COMPLETED } = VISIT_STATUS;

  if (status === ACTIVE && activeVisit) {
    return "There's already an active visit for this specialist.";
  }
  if (!visit) {
    return "Visit not found or doesn't belong to this specialist.";
  }
  if (status === COMPLETED && visit.status !== ACTIVE) {
    return "Only active visits can be marked as completed.";
  }
  if (status === ACTIVE && visit.status === ACTIVE) {
    return "The visit is already active.";
  }
  return null;
};

export default validateStatusChange;
