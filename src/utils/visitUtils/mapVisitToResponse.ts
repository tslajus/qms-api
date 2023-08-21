import { IVisit } from "@/types";

const mapVisitToResponse = (visit: IVisit) => ({
  reservationCode: visit.reservationCode,
  visibleCode: visit.visibleCode,
  visitTime: visit.visitTime,
  status: visit.status,
  cabinetNumber: visit.specialistAssigned.cabinetNumber,
  priority: visit.priority,
  gotPriorityAt: visit.gotPriorityAt,
});

export default mapVisitToResponse;
