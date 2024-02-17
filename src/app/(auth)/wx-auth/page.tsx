"use client"
import { signOut, useSession } from "next-auth/react"
import { VerticalContainer } from "@/components/containers/vertical"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

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

  return (
    <VerticalContainer>
      <Button onClick={() => signOut()}>Sign Out</Button>

      <Label> Session</Label>

      <div>{JSON.stringify(session, null, 2)}</div>
    </VerticalContainer>
  )
}
