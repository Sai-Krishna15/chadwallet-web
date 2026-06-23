import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  if (!price) return "$0.00";
  if (price < 0.0001) return "$" + price.toPrecision(3);
  if (price < 1) return "$" + price.toFixed(4);
  return "$" + price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatPercent(percent: number | undefined): string {
  if (percent === undefined || percent === null) return "0.00%";
  const sign = percent >= 0 ? "+" : "";
  return `${sign}${percent.toFixed(2)}%`;
}

export function formatCompactNumber(number: number): string {
  if (!number) return "$0";
  return new Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1,
    style: 'currency',
    currency: 'USD'
  }).format(number);
}
