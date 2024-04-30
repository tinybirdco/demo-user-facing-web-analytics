import { queryPipe } from "../api";
import { Trend, TrendData } from "../types/trend";
import useDateFilter from "./use-date-filter";
import useQuery from "./use-query";
import { formatTime } from "../utils";

export async function getTrend([
  date_from,
  date_to,
]: Array<string>): Promise<Trend> {
  const { data } = await queryPipe<TrendData>("trend", { date_from, date_to });
  const visits = data.map(({ visits }) => visits);
  const dates = data.map(({ t }) => {
    return formatTime(t);
  });
  const totalVisits = visits.reduce((a, b) => a + b, 0);

  return {
    visits,
    dates,
    totalVisits,
    data,
  };
}

export default function useTrend() {
  const { startDate, endDate } = useDateFilter();
  return useQuery([startDate, endDate, "trend"], getTrend);
}
