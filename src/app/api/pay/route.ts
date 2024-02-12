"use server"

import { NextRequest, NextResponse } from "next/server"
import { IApi } from "@/schema/api"

export async function POST(request: NextRequest): Promise<NextResponse<IApi>> {
  return NextResponse.json({ success: true })
}
