import { NextRequest, NextResponse } from "next/server"
import { UPLOAD_FILES_FIELD } from "@/const"
import { uploadFile } from "@/app/api/oss/upload/server"
import { IApi } from "@/ds/api"

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

  return NextResponse.json({ success: true, data })
}
