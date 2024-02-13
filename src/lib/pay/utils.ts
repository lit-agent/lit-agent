import { env } from "@/env"
import { md5 } from "@/lib/utils"
import fetch from "node-fetch"
import { IRole, isTerminal } from "@/lib/pay/schema"
import { v4 } from "uuid"
import { nanoid } from "nanoid"

export const fetchShouqianba = async ({
  path,
  params,
  role,
}: {
  role: IRole
  path: string
  params: object
}) => {
  const sn = isTerminal(role) ? role.terminal_sn : role.vendor_sn
  const key = isTerminal(role) ? role.terminal_key : role.vendor_key

  const url = env.NEXT_PUBLIC_PAY_APP_DOMAIN + path
  // 要转义中文，否则链接无效
  const body = JSON.stringify(params)
  const sign = md5(body + key)
  const requestId = v4()
  console.debug("[sqb] req: ", { requestId, url, params })

  const response = await fetch(url, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: sn + " " + sign,
    },
  })
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
  }
  const data = await response.json()
  console.debug("[sqb] res: ", { requestId, data })

  if (data.result_code !== "200") {
    throw new Error(`[shouqianba] fetch failed`)
  }
  return data
}
