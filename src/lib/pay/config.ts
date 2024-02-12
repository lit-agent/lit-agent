import { env } from "@/env"
import { ITerminal, IVendor } from "@/lib/pay/schema"

export const RETURN_URL = "https://lit.cs-magic.cn"

export const vendor: IVendor = {
  vendor_sn: env.PAY_VENDOR_SN,
  vendor_key: env.PAY_VENDOR_KEY,
}

export const terminal: ITerminal = {
  terminal_sn: env.PAY_TERMINAL_SN,
  terminal_key: env.PAY_TERMINAL_KEY,
}

export const operator = "markshawn"
