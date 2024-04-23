"use client";

import useKpiTotals from "@/lib/hooks/use-kpi-totals";
import useKpis from "@/lib/hooks/use-kpis";
import { AreaChart } from "@tremor/react";
import { useMemo } from "react";
import Widget from "../Widget";
import KPIsTabs from "./KpisTabs";

export default function KPIsWidget() {
  const { data, kpi, setKpi, kpiOption, warning, status } = useKpis();
  const { data: kpiTotals } = useKpiTotals();
  const chartData = useMemo(
    () =>
      (data?.dates ?? []).map((date: string, index: number) => {
        const value = Math.max(
          Number(data?.data[0][index]) || 0,
          Number(data?.data[1][index]) || 0
        );

        return {
          date: date.toUpperCase(),
          [kpiOption.label]: value,
        };
      }),
    [data?.data, data?.dates, kpiOption]
  );

  return (
    <Widget>
      <Widget.Title isVisuallyHidden>KPIs</Widget.Title>
      <KPIsTabs value={kpi} onChange={setKpi} totals={kpiTotals} />
      <Widget.Content
        status={status}
        noData={!chartData?.length}
        warning={warning?.message}
        className="pt-2 mt-4"
      >
        <AreaChart
          data={chartData}
          index="date"
          categories={[kpiOption.label]}
          valueFormatter={kpiOption.formatter}
          showLegend={false}
          intervalType="preserveStartEnd"
        />
      </Widget.Content>
    </Widget>
  );
}
