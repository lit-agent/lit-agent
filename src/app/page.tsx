import { getServerAuthSession } from "@/server/auth"
import Home_ from "@/app/page_"
import moment from "moment/moment"

// console.log("-- moment locals: ", moment.locales())

export default async function HomePage() {
  const session = await getServerAuthSession()

  if (!session || !session.user) {
    console.log("-- session not initialized: ", session)
    return null
  }

  return <Home_ user={session.user} />
}
