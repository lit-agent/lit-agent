import { WxServerAuth } from "@/lib/wx/server"
import { UserAvatarWithName } from "@/components/user/user-avatar-with-name"

export default async function WxAuthPage({
  searchParams: { code },
}: {
  searchParams: { code: string }
}) {
  const wxServerAuth = new WxServerAuth(code)
  const { headimgurl: image, nickname: name } = await wxServerAuth.getUserInfo()

  return <UserAvatarWithName user={{ name, image }} />
}
