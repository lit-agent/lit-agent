import { MyUser } from "@/ds/user"
import { getChatChannelId } from "@/lib/channel"
import { union, unionBy } from "lodash"

export const followedByUsers = (user: MyUser) =>
  user.followedBy.map((s) => s.following)

export const followingUsers = (user: MyUser) =>
  user.following.map((s) => s.followedBy)

export const getFollowRelativeUsers = (user: MyUser) =>
  unionBy(followingUsers(user), followedByUsers(user), "id")
