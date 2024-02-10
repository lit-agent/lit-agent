import { api } from "@/lib/trpc/react"
import { useRef } from "react"
import { useUser } from "@/hooks/use-user"
import { UserAvatar } from "@/components/user/user-avatar"
import { Label } from "@/components/ui/label"
import { uploadFilesV2 } from "@/lib/oss/upload/client"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DEFAULT_USERNAME, MSG_RENAME_LIMITATION } from "@/config"
import { Input } from "@/components/ui/input"
import { GrayCard } from "../_universal/cards"
import { MenuItem } from "../_universal/line"

export const BasicMutableUserInfo = () => {
  const utils = api.useUtils()
  const updateUser = api.user.safeUpdate.useMutation()

  const refName = useRef<HTMLInputElement>(null)
  const user = useUser()

  if (!user) return

  return (
    <GrayCard>
      <MenuItem name={"头像"}>
        <UserAvatar user={user} />
        <Label className={"w-full h-full absolute inset-0"}>
          <input
            id={"avatar"}
            type={"file"}
            accept={"image/*"}
            hidden
            onChange={async (event) => {
              const files = event.currentTarget.files
              if (!files?.length) return
              const { success, data } = await uploadFilesV2(files)
              if (!success || !data?.length) return

              const url = data![0]!
              updateUser
                .mutateAsync({ image: url })
                .then((res) => {
                  console.log("[UpdateUser] res: ", res)
                  toast.success("更新头像成功！")
                  utils.user.getSelf.invalidate()
                })
                .catch((err) => {
                  console.error("[UpdateUser] err: ", err)
                  toast.error("更新头像失败！")
                })
            }}
          />
        </Label>
      </MenuItem>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <MenuItem name={"昵称"}>{user.name ?? DEFAULT_USERNAME}</MenuItem>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>修改昵称</AlertDialogTitle>

            <AlertDialogDescription>
              {MSG_RENAME_LIMITATION}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Input ref={refName} />

          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const name = refName.current?.value
                if (!name) return toast.error("用户名不能为空")

                updateUser
                  .mutateAsync({ name })
                  .then((res) => {
                    console.log("[UpdateUser] res: ", res)
                    toast.success("更新昵称成功！")
                    utils.user.getSelf.invalidate()
                  })
                  .catch((err) => {
                    console.error("[UpdateUser] err: ", err)
                    toast.error(`更新昵称失败！原因：${err.message}`)
                  })
              }}
            >
              确认
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </GrayCard>
  )
}
