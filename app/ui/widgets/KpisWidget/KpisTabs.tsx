import { KpiTotals, KpiType, KPI_OPTIONS } from "@/lib/types/kpis";
import { cx } from "@/lib/utils";

type KpisTabsProps = {
  value: KpiType;
  onChange: (kpi: KpiType) => void;
  totals?: KpiTotals;
};

export default function KpisTabs({
  onChange,
  value: selectedKpi,
  totals,
}: KpisTabsProps) {
  return (
    <div
      role="tablist"
      className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-wrap rounded-t-xl overflow-hidden -mt-6 -mx-6"
    >
      {KPI_OPTIONS.map(({ label, value, formatter }) => (
        <button
          key={value}
          role="tab"
          aria-selected={selectedKpi === value}
          data-state={value === selectedKpi ? "active" : undefined}
          className={cx("group relative cursor-pointer p-6 md:p-9 text-left md:text-center text-secondary hover:bg-primaryLight transition-colors",
            "sm:data-[state=active]:border-b-4 sm:data-[state=active]:border-primary data-[state=active]:text-primary sm:mb-2",
            "dark:text-neutral-50 dark:hover:bg-secondary")}
          onClick={() => onChange(value)}
        >
          <div className="flex flex-col gap-2 w-fit md:mx-auto">
            <span className="text-md lg:text-lg font-medium truncate capitalize">
              {label}
            </span>
            <span
              className="text-gray-500 text-left font-normal"
              aria-hidden={true}
            >
              {totals ? formatter(totals[value]) : "-"}
            </span>
          </div>
          <div className="hidden absolute h-3 w-3 bg-primary start-1/2 -bottom-5 -translate-x-1/2 -translate-y-1/2 sm:group-data-[state='active']:block" style={{
            clipPath: "polygon(50% 50%, 0 0, 100% 0)",
          }}/>
        </button>
      ))}
    </div>
  );
}
