import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const useFormattedDate = (createdAt: string) => {
  const formattedDate = dayjs(createdAt).tz("Asia/Seoul").format("YYYY.MM.DD.");

  return formattedDate;
};

export default useFormattedDate;
