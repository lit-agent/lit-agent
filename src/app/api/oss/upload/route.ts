import { NextRequest, NextResponse } from "next/server"
import { IApi } from "@/schema/api"

import { OSS_DOMAIN, UPLOAD_FORM_ID } from "@/lib/oss/const"
import { last } from "lodash"
import { v4 } from "uuid"
import { oss } from "@/lib/oss/config"

export const uploadFileViaArrayBuffer = async (file: File) => {
  const suffix = last(file.name.split(".")) ?? ""
  const id = `${v4()}.${suffix}`

  console.log("[OSS] file --> arraybuffer")
  const arrayBuffer = await file.arrayBuffer()

  console.log("[OSS] oss upload")
  await oss.put(id, Buffer.from(arrayBuffer))

  console.log("[OSS] uploaded: ", { id })
  return OSS_DOMAIN + id
}

export async function POST(request: NextRequest): Promise<NextResponse<IApi>> {
  const formData = await request.formData()

  const files = formData.getAll(UPLOAD_FORM_ID) as File[]

  if (!files) throw new Error("should have files")

  const data = await Promise.all(
    files.map(async (file) => await uploadFileViaArrayBuffer(file)),
  )

  console.log("[OSS] result: ", data)

  return NextResponse.json({ success: true, data })
}

export async function GET(request: NextRequest): Promise<NextResponse<IApi>> {
  const id = v4()
  const signatureUrl = oss.signatureUrl(id, {
    method: "PUT",
    "Content-Type": "image/png",
  })
  console.log("[OSS] get signature url: ", signatureUrl)
  return NextResponse.json({ success: true, data: { signatureUrl } })
}
