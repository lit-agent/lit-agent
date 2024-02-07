import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { uniq } from "lodash"
import { IProductListView } from "@/schema/product"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimeS = () => Math.floor(Date.now() / 1000)

export const maskName = (s: string) => s[0] + s.slice(1).replace(/./g, "*")
export const maskPhone = (s: string) =>
  s.slice(0, 3) +
  s.slice(3, s.length - 2).replace(/./g, "*") +
  s.slice(s.length - 2)

export const calculateProductBuyersCount = (product: IProductListView) => {
  return uniq(product.bills.map((bill) => bill.userId)).length
}

export const PHONE_REGEX = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9]){10,}$/,
)
