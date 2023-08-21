import { constants } from "@/utils";

const formatTimeDifference = (differenceInMinutes: number) => {
  const { MINUTES_IN_AN_HOUR, HOURS_IN_A_DAY } = constants;

  const isPast = differenceInMinutes < 0;

  differenceInMinutes = Math.abs(differenceInMinutes);

  const days = Math.floor(
    differenceInMinutes / (MINUTES_IN_AN_HOUR * HOURS_IN_A_DAY)
  );
  differenceInMinutes -= days * MINUTES_IN_AN_HOUR * HOURS_IN_A_DAY;

  const hours = Math.floor(differenceInMinutes / MINUTES_IN_AN_HOUR);
  differenceInMinutes -= hours * MINUTES_IN_AN_HOUR;

  const minutes = Math.floor(differenceInMinutes);

  return {
    days: isPast ? -days : days,
    hours: isPast ? -hours : hours,
    minutes: isPast ? -minutes : minutes,
  };
};

export default formatTimeDifference;
