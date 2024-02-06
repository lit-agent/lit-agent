import { UPLOAD_FILES_FIELD } from "@/const"
import { toast } from "sonner"
import { IApi } from "@/ds/api"

export const uploadFiles = async (files: FileList) => {
  const formData = new FormData()
  Array.from(files).forEach((file) => {
    formData.append(UPLOAD_FILES_FIELD, file)
  })

  const res = await fetch("/api/oss/upload", {
    method: "POST",
    body: formData,
  })

  const data = (await res.json()) as IApi
  if (!data.success) {
    toast.error("上传失败")
    console.error("-- ❌ uploaded: ", data)
  } else {
    toast.success("上传成功！")
    console.log("-- ✅ uploaded: ", data)
  }
  return data
}
