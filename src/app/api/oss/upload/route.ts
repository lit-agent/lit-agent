import { NextRequest, NextResponse } from "next/server"
import { uploadFile } from "@/server/oss"

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file = data.get("file") as unknown as File

  if (!file) return NextResponse.json({ success: false })

  await uploadFile(file)

  return NextResponse.json({ success: true })
}
