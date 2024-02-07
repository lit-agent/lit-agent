import { NextRequest, NextResponse } from "next/server"
import { uploadFile } from "@/lib/oss/upload/server"
import { IApi } from "@/schema/api"

import { UPLOAD_FILES_FIELD } from "@/lib/oss/const"

export async function POST(request: NextRequest): Promise<NextResponse<IApi>> {
  const formData = await request.formData()

  const files = formData.getAll(UPLOAD_FILES_FIELD) as File[]
  console.log({ formData, files })

  if (!files)
    return NextResponse.json({
      success: false,
      message: "should have files",
    })

  const data = await Promise.all(
    files.map(async (file) => await uploadFile(file)),
  )

  console.log("[OSS] post result: ", data)

  return NextResponse.json({ success: true, data })
}
