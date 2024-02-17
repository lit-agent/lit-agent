"use client"
import { useSession } from "next-auth/react"

export default async function WxAuthPage({
  searchParams: { code },
}: {
  searchParams: { code: string }
}) {
  // const wxServerAuth = new WxServerAuth(code)
  // const { headimgurl: image, nickname: name } = await wxServerAuth.getUserInfo()
  //
  // return <UserAvatarWithName user={{ name, image }} />

  const session = useSession()

  return <div>{JSON.stringify(session, null, 2)}</div>
}
