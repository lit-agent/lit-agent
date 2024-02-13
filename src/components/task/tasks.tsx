import { api } from "@/lib/trpc/react"
import { useState } from "react"
import TaskListView from "@/components/task/task-list-view"
import Link from "next/link"
import { UniversalTabs } from "@/components/_universal/tabs"
import { JIUGU_TASK_PAGE_TITLE } from "@/config"
import { ITaskView } from "@/schema/task"

export function AllTasks() {
  const filters = ["正在进行", "往期回顾", "全部"] as const
  type Filter = (typeof filters)[number]
  const [filter, setFilter] = useState<Filter>("全部")

  const { data: tasks = [] } = api.task.listTasks.useQuery()

  const filteredTasks = tasks.filter(
    (task) =>
      filter === "全部" ||
      (filter === "正在进行" && !isExpired(task)) ||
      (filter === "往期回顾" && isExpired(task)),
  )

  return (
    <UniversalTabs
      title={JIUGU_TASK_PAGE_TITLE}
      filters={filters}
      filter={filter}
      setFilter={setFilter}
    >
      {filteredTasks.map((task, index) => (
        <TaskListView task={task} key={index} />
      ))}
    </UniversalTabs>
  )
}

export const MyTasks = () => {
  const filters = ["审核中", "已完成", "全部"] as const
  // 2024-02-11：调整了一下
  // const filters = ["进行中", "已完成", "已放弃", "全部"] as const
  type Filter = (typeof filters)[number]
  const [filter, setFilter] = useState<Filter>("全部")

  const { data: userTasks = [] } = api.task.listMyUserTasks.useQuery()
  const filteredUserTasks = userTasks.filter(
    (userTask) =>
      filter === "全部" ||
      (filter === "审核中" && userTask.status === "goon") ||
      (filter === "已完成" && userTask.status === "finished"),
  )

  return (
    <UniversalTabs
      title={"我的任务"}
      filters={filters}
      filter={filter}
      setFilter={setFilter}
    >
      {filteredUserTasks.length ? (
        filteredUserTasks.map((userTask, index) => (
          <TaskListView task={userTask.task} key={index} />
        ))
      ) : (
        <div>
          啥都没有！要不去
          <Link
            href={"/task"}
            className={"text-primary underline underline-offset-2 mx-1"}
          >
            {JIUGU_TASK_PAGE_TITLE}
          </Link>
          看看吧！
        </div>
      )}
    </UniversalTabs>
  )
}

/**
 * todo: based on task status
 * @param task
 */
const isExpired = (task: ITaskView) => +task.endTime < Date.now()
