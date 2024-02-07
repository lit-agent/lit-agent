export const getChatId = (...userIds: string[]) =>
  userIds.toSorted().join("-") + "_chat"

export const getBroadcastId = (userId: string) => userId + "_broadcast"
