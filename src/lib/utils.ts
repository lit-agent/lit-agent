import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimeS = () => Math.floor(Date.now() / 1000)

export const maskName = (s: string) => s[0] + s.slice(1).replace(/./g, "*")
