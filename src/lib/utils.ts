import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { IProductListView } from "@/schema/product"
import { createHash } from "crypto"
import uniqBy from "lodash/uniqBy"
import { IBillListView } from "@/schema/bill"
import { sum } from "lodash"

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
        product.bills.map((bill) => bill.bill.user),
        "id",
      )
    : []

export const countBuyersOfProduct = (product?: IProductListView) => {
  return getBuyersOfProduct(product).length
}

export const PHONE_REGEX = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9]){10,}$/,
)

// md5加密
export const md5 = (signStr: string): string => {
  if (!signStr || signStr.trim() === "") {
    throw new Error("sign can not be null")
  }
  const hash = createHash("md5")
  hash.update(signStr, "utf-8")
  return hash.digest("hex")
}

export const isClient = () => typeof window !== "undefined"

export const getBillValue = (bill: IBillListView) =>
  sum(bill.products.map((p) => p.count * p.price))
