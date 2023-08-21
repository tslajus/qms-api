import { Visit } from "@/models";
import { constants } from "@/utils";

const checkExpiredVisits = async () => {
  const { VISIT_STATUS, VISIT_EXPIRATION_TIME } = constants;
  const { CANCELED, PENDING, ACTIVE } = VISIT_STATUS;

  const now = new Date();
  const expirationTime = new Date(now.getTime() - VISIT_EXPIRATION_TIME);

  await Visit.updateMany(
    {
      visitTime: { $lt: expirationTime },
      status: { $in: [PENDING, ACTIVE] },
    },
    { status: CANCELED }
  );
};

export default checkExpiredVisits;
