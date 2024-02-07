"use client"

import { ITaskView } from "@/ds/task"

export const TaskRoomPage = ({ task }: { task: ITaskView }) => {
  return <div>{task.id}</div>
}
