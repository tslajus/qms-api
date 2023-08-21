import cron from "node-cron";
import { ISpecialist } from "@/types";
import { Specialist } from "@/models";
import { isSpecialistWorking, constants } from "@/utils";
import { SPECIALIST_STATUS_UPDATE_INTERVAL } from "../constants";

const updateIsCurrentlyWorkingStatus = async () => {
  const { SPECIALIST_STATUS_UPDATE_INTERVAL } = constants;
  try {
    const specialists = await Specialist.find({}).exec();
    const promises: Promise<ISpecialist | null>[] = [];

    for (const specialist of specialists) {
      const isWorking = isSpecialistWorking(specialist);
      promises.push(
        Specialist.findByIdAndUpdate(specialist._id, {
          isCurrentlyWorking: isWorking,
        }).exec()
      );
    }

    await Promise.all(promises);
    console.log("Updated isCurrentlyWorking status for all specialists.");
  } catch (error) {
    console.error("Error updating isCurrentlyWorking status:", error);
  }
};

cron.schedule(
  `*/${SPECIALIST_STATUS_UPDATE_INTERVAL} * * * *`,
  updateIsCurrentlyWorkingStatus
);

const startSpecialistStatusUpdates = () => {
  updateIsCurrentlyWorkingStatus();
  console.log("Working status updates initialized.");
};

export default startSpecialistStatusUpdates;
