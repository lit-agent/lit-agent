import UserHomePage from "@/components/user-home.page"
import { ensureServerUser, getServerUser } from "@/server/auth"

export default async function ServerUserHomePage() {
  const user = await ensureServerUser()

  return <UserHomePage user={user} />
}
