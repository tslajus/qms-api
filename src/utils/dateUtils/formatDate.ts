import { format } from "date-fns";

const formatDate = (date: Date): string => {
  return format(date, "yyyy-MM-dd HH:mm:ss");
};

export default formatDate;
