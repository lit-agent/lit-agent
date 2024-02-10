import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { uniq, uniqBy } from "lodash"
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

export const getBuyersOfProduct = (product?: IProductListView) =>
  product
    ? uniqBy(
        product.bills.map((bill) => bill.user),
        "id",
      )
    : []

export const countBuyersOfProduct = (product?: IProductListView) => {
  return getBuyersOfProduct(product).length
}

export const PHONE_REGEX = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9]){10,}$/,
)
