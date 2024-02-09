import { toast } from "sonner"
import { IApi } from "@/schema/api"

export const uploadFilesV2 = async (files: FileList): Promise<IApi> => {
  const images = await Promise.all(
    Object.values(files).map(async (file) => {
      const resGetId = await fetch("/api/oss/upload")
      if (!resGetId.ok) return

      const dataGetId = await resGetId.json()
      const signatureUrl = dataGetId.data.signatureUrl
      const resPut = await fetch(signatureUrl, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "image/png",
        }),
        body: file,
      })
      if (!resPut.ok) return

      const url = signatureUrl.split("?")[0] ?? signatureUrl

      // todo: cleaner approach
      const isHttps = location.href.includes("https")
      return isHttps ? url.replace("http://", "https://") : url
    }),
  )

  console.log("response: ", images)
  if (images.every((s) => !!s)) {
    toast.success("上传成功！")
    return { success: true, data: images }
  } else {
    toast.error("上传失败！")
    return { success: false, data: images }
  }
}
