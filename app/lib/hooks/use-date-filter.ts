import { DateRangePickerValue } from "@tremor/react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DateFilter, daysToSubstract } from "../types/date-filter";
import { formatDate, substractDays } from "../utils";

export default function useDateFilter() {
  const query = useSearchParams();
  const [dateRangePickerValue, setDateRangePickerValue] =
    useState<DateRangePickerValue>();

  const setDateFilter = useCallback(
    ({ from, to, selectValue }: DateRangePickerValue) => {
      const lastDays = selectValue ?? DateFilter.Custom;

      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("last_days", lastDays);

      if (lastDays === DateFilter.Custom && from && to) {
        searchParams.set("start_date", formatDate(from));
        searchParams.set("end_date", formatDate(to));
      } else {
        searchParams.delete("start_date");
        searchParams.delete("end_date");
      }
      window.history.pushState(null, "", `?${searchParams.toString()}`);
    },
    []
  );

  const lastDaysParam = query.get("last_days") as DateFilter;
  const lastDays: DateFilter =
    typeof lastDaysParam === "string" &&
    Object.values(DateFilter).includes(lastDaysParam)
      ? lastDaysParam
      : DateFilter.Last7Days;

  const { startDate, endDate } = useMemo(() => {
    const today = new Date();
    if (lastDays === DateFilter.Custom) {
      const startDateParam = query.get("start_date") as string;
      const endDateParam = query.get("end_date") as string;

      const startDate =
        startDateParam ||
        formatDate(substractDays(+daysToSubstract[DateFilter.Last7Days], today));
      const endDate = endDateParam || formatDate(today);

      return { startDate, endDate };
    }

    const startDate = formatDate(substractDays(+daysToSubstract[lastDays]));

    const endDate = formatDate(today)

    return { startDate, endDate };
  }, [lastDays, query]);

  useEffect(() => {
    setDateRangePickerValue({
      from: new Date(startDate),
      to: new Date(endDate),
      selectValue: lastDays === DateFilter.Custom ? undefined : lastDays,
    });
  }, [startDate, endDate, lastDays]);

  const onDateRangePickerValueChange = useCallback(
    ({ from, to, selectValue }: DateRangePickerValue) => {
      if (from && to) {
        setDateFilter({ from, to, selectValue });
      } else {
        setDateRangePickerValue({ from, to, selectValue });
      }
    },
    [setDateFilter]
  );

  return {
    startDate,
    endDate,
    dateRangePickerValue,
    onDateRangePickerValueChange,
  };
}
