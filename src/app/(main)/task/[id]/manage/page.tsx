"use client"

import { api } from "@/lib/trpc/react"
import { IUserTaskView } from "@/schema/task"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeftIcon } from "lucide-react"
import { UserAvatar } from "@/components/user/user-avatar"

export default function VerifyTaskPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const { data: userTasks = [] } = api.task.listUserTasksByTask.useQuery({
    taskId: id,
  })
  console.log("[VerifyTask]: ", { id, userTasks })

  return (
    <div className={"flex flex-col gap-8 p-8"}>
      <Link
        href={`/task/${id}`}
        className={"flex items-center gap-2 underline text-sm"}
      >
        <ChevronLeftIcon className={"w-4 h-4"} />
        <span> Task @{id}</span>
      </Link>

      {userTasks.map((userTask, index) => (
        <UserTaskView userTask={userTask} key={index} />
      ))}
    </div>
  )
}

const UserTaskView = ({ userTask }: { userTask: IUserTaskView }) => {
  const utils = api.useUtils()

  const verifyUserTask = api.task.bloggerVerifyUserTask.useMutation()

  const verify = async (passed: boolean) => {
    await verifyUserTask.mutateAsync({
      taskId: userTask.taskId,
      userId: userTask.userId,
      passed,
    })
    await utils.task.invalidate()
  }

  return (
    <div
      className={
        "flex gap-2 border bg-gray-800 rounded-lg p-4 relative overflow-hidden"
      }
    >
      {userTask.passed === true && (
        <div className={"son4 bg-green-500"}>
          <span>已通过</span>
        </div>
      )}

      {userTask.passed === false && (
        <div className={"son4 bg-gray-500"}>
          <span>未通过</span>
        </div>
      )}

      <UserAvatar user={userTask.user} />

      <div className={"grow flex flex-col gap-2"}>
        <div className={"text-primary text-lg"}>{userTask.user.name}</div>

        <div>{userTask.createdAt.toLocaleString()}</div>

        <div className={"flex overflow-auto gap-2"}>
          {userTask.images.map((image, index) => (
            <div className={"w-24"} key={index}>
              <AspectRatio ratio={1}>
                <Image
                  src={image}
                  alt={`user-submitted-${index}`}
                  fill
                  className={"object-fit rounded-lg"}
                />
              </AspectRatio>
            </div>
          ))}
        </div>

        {/*{userTask.passed === null && (*/}
        <div className={"grid grid-cols-2 gap-4"}>
          <Button onClick={() => verify(true)}>通过</Button>

          <Button variant={"outline"} onClick={() => verify(false)}>
            不通过
          </Button>
        </div>
        {/*)}*/}
      </div>
    </div>
  )
}
