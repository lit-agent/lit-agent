import { useCopyToClipboard } from "@uidotdev/usehooks"
import { Label } from "@/components/ui/label"
import { ThumbsUpIcon } from "lucide-react"
import QRCode from "qrcode.react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export const PayScan = ({ url }: { url: string }) => {
  const [copiedUrl, copyUrl] = useCopyToClipboard()

  return (
    <>
      <Label className={"inline-flex items-center gap-1"}>
        <ThumbsUpIcon className={"w-4 h-4 text-primary"} />
        方法一：（微信/支付宝）扫码支付
      </Label>
      <QRCode value={url} size={192} className={"mx-auto"} />

      <Separator orientation={"horizontal"} />

      <div>方法二：复制链接到手机微信中打开</div>
      <Button
        className={"w-full"}
        onClick={() => {
          copyUrl(url)
          toast.success(`复制链接成功：${url}`)
        }}
      >
        复制
      </Button>
    </>
  )
}
