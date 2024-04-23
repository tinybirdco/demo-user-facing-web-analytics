import { useSearchParams } from "next/navigation";
import { queryPipe } from "../api";
import { KPI_OPTIONS, KpiType, KpisData, isKpi } from "../types/kpis";
import { formatPrettyDate, formatTime } from "../utils";
import useDateFilter from "./use-date-filter";
import useQuery from "./use-query";

const arrayHasCurrentDate = (dates: string[], isHourlyGranularity: boolean) => {
  const today = new Date();
  const now = isHourlyGranularity ? formatTime(today) : formatPrettyDate(today);
  return dates[dates.length - 1] === now;
};

async function getKpis([kpi, date_from, date_to]: [
  KpiType,
  string,
  string,
  string
]) {
  const { data: queryData } = await queryPipe<KpisData>("kpis", {
    date_from,
    date_to,
  });
  const isHourlyGranularity = !!date_from && !!date_to && date_from === date_to;
  const dates = queryData.map(({ date }) =>
    isHourlyGranularity ? formatTime(date) : formatPrettyDate(date)
  );
  const isCurrentData = arrayHasCurrentDate(dates, isHourlyGranularity);

  const data = isCurrentData
    ? queryData.reduce(
        (acc, record, index) => {
          const value = record[kpi] ?? 0;

          const pastValue = index < queryData.length - 1 ? value : "";
          const currentValue = index > queryData.length - 3 ? value : "";

          const [pastPart, currentPart] = acc;

          return [
            [...pastPart, pastValue],
            [...currentPart, currentValue],
          ];
        },
        [[], []] as (number | string)[][]
      )
    : [queryData.map((value) => value[kpi] ?? 0), [""]];

  return {
    dates,
    data,
  };
}

export default function useKpis() {
  const { startDate, endDate } = useDateFilter();
  const searchParams = useSearchParams();
  const kpiParam = searchParams.get("kpi");
  const kpi = isKpi(kpiParam) ? kpiParam : "visits";
  const kpiOption = KPI_OPTIONS.find(({ value }) => value === kpi)!;
  const query = useQuery([kpi, startDate, endDate, "kpis"], getKpis);

  const setKpi = (kpi: KpiType) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("kpi", kpi);
    window.history.pushState(null, "", `?${searchParams.toString()}`);
  };

  return {
    setKpi,
    kpi,
    kpiOption,
    ...query,
  };
}
