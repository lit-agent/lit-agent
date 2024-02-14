import { NextRequest, NextResponse } from "next/server"
import { IApi } from "@/schema/api";
import { URL } from 'url';
import { bindWxOpenIdToUser, getOpenId } from "@/lib/wx/wx-auth";

export async function GET(request: NextRequest): Promise<NextResponse<IApi>> {
  const url = new URL(request.url);
  console.log(`getCode api url:${url}`);
  const queryParams = url.searchParams;
  const code = queryParams.get('code');
  const userId = queryParams.get('state');
  if(!code || !userId) {
    throw new Error("wechat access failed, code or userId is null")
  }
  const openId = getOpenId(code);
  bindWxOpenIdToUser(userId, code);
  return NextResponse.json({ success: true, data: "success" });
}