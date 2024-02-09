import { fetchMessages } from "@/routers/message"

import { fetchAdminUser } from "./_general"

fetchAdminUser().then((user) => {
  if (!user) throw new Error("user should exist")

  fetchMessages(user.id).then((messages) => {
    console.log(`messages(${user.id}): `, messages)
  })
})
