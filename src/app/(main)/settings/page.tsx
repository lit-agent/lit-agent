"use client"

import { Button } from "@/components/ui/button"
import {
  ComponentProps,
  EventHandler,
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  PropsWithChildren,
  useRef,
} from "react"
import { cn, maskPhone } from "@/lib/utils"
import { ChevronRightIcon } from "lucide-react"
import { useUser } from "@/hooks/use-user"
import { DEFAULT_USERNAME, MSG_RENAME_LIMITATION, TODO } from "@/config"
import { signOut } from "next-auth/react"
import { Label } from "@/components/ui/label"
import { UserAvatar } from "@/components/user/user-avatar"
import { uploadFilesV2 } from "@/lib/oss/upload/client"
import { api } from "@/lib/trpc/react"
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
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  const user = useUser()

  const utils = api.useUtils()
  const updateUser = api.user.safeUpdate.useMutation()

  const refName = useRef<HTMLInputElement>(null)

  if (!user) return

  return (
    <div className={"flex flex-col gap-4"}>
      <Label className={"text-xl"}>系统设置</Label>

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

      <GrayCard>
        <MenuItem name={"微信登录"}>{TODO}</MenuItem>
        <MenuItem name={"手机绑定"}>{maskPhone(user.phone!)}</MenuItem>
      </GrayCard>

      <GrayCard>
        <MenuItem name={"私域管理中心"}>{TODO}</MenuItem>
      </GrayCard>

      <Button onClick={() => signOut()}>退出登录</Button>
    </div>
  )
}

const GrayCard = ({ children }: PropsWithChildren) => (
  <div className={"rounded-lg bg-[#3B3545] p-2 flex flex-col gap-2"}>
    {children}
  </div>
)

type ButtonProps = { name: string } & ComponentProps<typeof Button>
const MenuItem = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ name, className, children, ...props }, ref) => (
    <Button
      className={cn(
        "justify-between bg-transparent border-b border-white/10 rounded-none last:border-none h-fit relative",
        className,
      )}
      {...props}
      ref={ref}
    >
      <div className={"text-white"}>{name}</div>

      <div className={"text-muted-foreground flex items-center gap-1"}>
        {children}

        <ChevronRightIcon className={"w-5 h-5"} />
      </div>
    </Button>
  ),
)
