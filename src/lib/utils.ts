import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { IProductListView } from "@/ds/product"
import { uniq } from "lodash"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimeS = () => Math.floor(Date.now() / 1000)

export const maskName = (s: string) => s[0] + s.slice(1).replace(/./g, "*")

export const calculateProductBuyersCount = (product: IProductListView) => {
  return uniq(product.bills.map((bill) => bill.userId)).length
}
