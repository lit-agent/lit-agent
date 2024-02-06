import { fetchMessages } from "@/server/routers/message"
import { fetchAdminUser } from "@/server/user"

fetchAdminUser().then((user) => {
  if (!user) throw new Error("user should exist")

  fetchMessages(user.id).then((messages) => {
    console.log(`messages(${user.id}): `, messages)
  })
})
