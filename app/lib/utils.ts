export const cx = (...args: (string | undefined | false)[]) =>
  args.filter(Boolean).join(" ");

export const formatNumber = (num: number) => Intl.NumberFormat().format(+num);

export function kFormatter(value: number): string {
  return value > 999 ? `${(value / 1000).toFixed(1)}K` : String(value);
}

export function formatMinSec(totalSeconds: number) {
  if (isNaN(totalSeconds)) return "0s";

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const padTo2Digits = (value: number) => value.toString().padStart(2, "0");
  return `${minutes ? `${minutes}m` : ""} ${padTo2Digits(seconds)}s`;
}

export function formatPercentage(value: number) {
  return `${value ? (value * 100).toFixed(2) : "0"}%`;
}

const ONE_DAY_IN_MILLIS = 60 * 60 * 1000 * 24;

export function substractDays(days: number, date?: string | Date) {
  let aux = date;
  if (!date) {
    aux = new Date();
  } else {
    aux = typeof date === "string" ? new Date(date) : date;
  }
  aux.setTime(aux.getTime() - days * ONE_DAY_IN_MILLIS);
  return aux;
}

export function formatDate(date: string | Date) {
  const aux = typeof date === "string" ? new Date(date) : date;
  return aux.toISOString().split("T")[0];
}

export function formatPrettyDate(date: string | Date) {
  const aux = typeof date === "string" ? new Date(date) : date;
  return aux.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(date: string | Date) {
  const aux = typeof date === "string" ? new Date(date) : date;
  return aux.toLocaleTimeString(undefined, { timeStyle: "short" });
}
