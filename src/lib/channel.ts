export const getChatChannelId = (...userIds: string[]) =>
  userIds.sort().join("-") + "_chat"

export const getBroadcastChannelId = (userId: string) => userId + "_broadcast"
