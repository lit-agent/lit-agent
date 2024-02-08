"use client"

import useClipboard from "react-use-clipboard"
import { useEffect } from "react"
import { toast } from "sonner"
import { useCopyToClipboard as useCopyToClipboardUseHooksTS } from "usehooks-ts/dist/cjs"
import { useCopyToClipboard } from "@uidotdev/usehooks"
import { useNavigatorPermissions } from "@/hooks/use-clipboard"
import { Button } from "@/components/ui/button"

export default function TestClipboard() {
  const URL = location.href

  const [isCopied, setCopied] = useClipboard(URL)

  useEffect(() => {
    if (isCopied) {
      toast.success("链接已拷贝")
    } else {
      toast.error("Failed to copy!")
    }
  }, [isCopied])

  const [copied1, copy1] = useCopyToClipboardUseHooksTS()
  const [copied2, copy2] = useCopyToClipboard()

  useNavigatorPermissions()

  return (
    <div className={"flex flex-col w-full shrink-0 space-y-4 pt-4"}>
      <Button
        className={"bg-white text-primary hover:bg-white/90"}
        onClick={async (event) => {
          const url = location.href
          navigator.clipboard
            .writeText(url)
            .then(() => toast.success("链接已拷贝：" + url))
            .catch(() => toast.error("Failed to copy!"))
        }}
      >
        🔗复制作品链接 (navigator)
      </Button>

      <Button
        className={"bg-white text-primary hover:bg-white/90"}
        onClick={setCopied}
      >
        🔗复制作品链接 (react-use-clipboard)
      </Button>

      <Button
        className={"bg-white text-primary hover:bg-white/90"}
        onClick={() => {
          copy1(location.href)
            .then(() => toast.success("链接已拷贝"))
            .catch(() => toast.error("Failed to copy!"))
        }}
      >
        🔗复制作品链接 (usehooks-ts)
      </Button>

      <Button
        className={"bg-white text-primary hover:bg-white/90"}
        onClick={() => {
          copy2(location.href)
            .then(() => toast.success("链接已拷贝"))
            .catch(() => toast.error("Failed to copy!"))
        }}
      >
        🔗复制作品链接 (@uidotdev/usehooks)
      </Button>
    </div>
  )
}
