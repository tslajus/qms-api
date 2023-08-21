import { Visit } from "@/models";
import { IVisit } from "@/types";
import { VISIT_STATUS } from "@/utils/constants";

type SortOrder = 1 | -1;
type SortObject = {
  [key in keyof IVisit]?: SortOrder;
};

const findVisitsByStatus = async (
  status: VISIT_STATUS,
  limit?: number,
  sort?: SortObject
) => {
  const query = Visit.find({ status });

  if (sort) {
    query.sort(sort);
  }

  if (limit) {
    query.limit(limit);
  }

  return await query
    .populate({ path: "specialistAssigned", select: "cabinetNumber" })
    .exec();
};

export default findVisitsByStatus;
