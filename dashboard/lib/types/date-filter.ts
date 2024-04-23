export enum DateFilter {
  Today = "tdy",
  Last7Days = "w",
  Last30Days = "t",
  MonthToDate = "m",
  Last12Months = "y",
  Custom = "custom",
}

export type DateRangePickerOption = {
  value: string;
  text: string;
  startDate: Date;
};

export const dateFormat = "YYYY-MM-DD";

export const daysToSubstract = {
  [DateFilter.Today]: "0",
  [DateFilter.Last7Days]: "7",
  [DateFilter.Last30Days]: "30",
  [DateFilter.MonthToDate]: new Date().getDate(),
  [DateFilter.Last12Months]: "365",
};
