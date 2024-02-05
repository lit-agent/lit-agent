import { MyUser } from "@/ds/user"
import { unionBy } from "lodash"

export const getFollowedByUsers = (user: MyUser) =>
  user.followedBy.map((s) => s.following)

export const getFollowingUsers = (user: MyUser) =>
  user.following.map((s) => s.followedBy)

export const getFollows = (user: MyUser) => {
  const follows = user.following.map((v) => ({
    ...v,
    targetUser: v.followedBy,
  }))

  const set = follows.map((f) => f.followedById)

  user.followedBy.forEach((f) => {
    if (!set.some((s) => s === f.following.id)) {
      follows.push({ ...f, targetUser: f.following })
    }
  })

  console.log("-- follows: ", follows)
  return follows
}

export const getFollowRelativeUsers = (user: MyUser) =>
  unionBy(getFollowingUsers(user), getFollowedByUsers(user), "id")
