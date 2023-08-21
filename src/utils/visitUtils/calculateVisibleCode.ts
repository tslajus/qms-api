import { Visit } from "@/models/Visit";
import moment from "moment-timezone";

const calculateVisibleCode = async (): Promise<string> => {
  const timezone = "UTC";
  const todayStart = moment.tz(timezone).startOf("day").toDate();
  const todayEnd = moment.tz(timezone).endOf("day").toDate();

  const todayVisits = await Visit.find({
    visitTime: { $gte: todayStart, $lte: todayEnd },
  });

  const visibleCodes = todayVisits.map((visit) =>
    parseInt(visit.visibleCode, 10)
  );

  const maxVisibleCode = Math.max(0, ...visibleCodes);

  const nextVisibleCode = maxVisibleCode + 1;

  return String(nextVisibleCode).padStart(4, "0");
};

export default calculateVisibleCode;
