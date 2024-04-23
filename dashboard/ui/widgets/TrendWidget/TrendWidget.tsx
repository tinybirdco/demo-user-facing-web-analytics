"use client";

import useTrend from "@/lib/hooks/use-trend";
import { BarChart } from "@tremor/react";
import { useMemo } from "react";
import Widget from "../Widget";
import { formatTime } from "@/lib/utils";

export default function TrendWidget() {
  const { data, status, warning } = useTrend();
  const chartData = useMemo(
    () =>
      (data?.data ?? []).map((d) => ({
        Date: formatTime(d.t),
        "Number of visits": d.visits,
      })),
    [data]
  );

  return (
    <Widget>
      <div className="flex items-center justify-between">
        <Widget.Title>Users in last 30 minutes</Widget.Title>
        <h3 className="text-gray-500 font-normal text-xl">
          {data?.totalVisits ?? 0}
        </h3>
      </div>
      <Widget.Content
        status={status}
        loaderSize={40}
        noData={!chartData?.length}
        warning={warning?.message}
      >
        <BarChart
          data={chartData}
          index="Date"
          categories={["Number of visits"]}
          className="h-32"
          showXAxis={false}
          showYAxis={false}
          showLegend={false}
          showGridLines={false}
        />
      </Widget.Content>
    </Widget>
  );
}
