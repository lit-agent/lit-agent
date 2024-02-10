import { toast } from "sonner"
import { IApi } from "@/schema/api"

export const uploadFilesV2 = async (
  files: FileList,
): Promise<IApi<string[]>> => {
  // todo: cleaner approach
  const isHttps = location.href.includes("https")

  const images = await Promise.all(
    Object.values(files).map(async (file) => {
      const resGetId = await fetch("/api/oss/upload")
      if (!resGetId.ok) return

      const dataGetId = await resGetId.json()
      let signatureUrl = dataGetId.data.signatureUrl
      if (isHttps) signatureUrl = signatureUrl.replace("http://", "https://")

      const resPut = await fetch(signatureUrl, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "image/png",
        }),
        body: file,
      })
      if (!resPut.ok) return

      return signatureUrl.split("?")[0] ?? signatureUrl
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
